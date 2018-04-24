import {Storage} from './Storage';
import {Base} from './Base';
import {post} from './Ajax';

export class AuthApi extends Base {
  clearTokens(){
    ['access_token', 'refresh_token'].forEach(this.storage.removeItem);
  }
  /**
   * Обработка ответа с токенами и сохрание их в случае если все ок
   * @param {object} response
   */
  saveTokens (response) {
    this.clearTokens();
    switch (response.error) {
      case 'authorization_pending':
        this.log('authorization_pending');
        break;

      case undefined:
        const {access_token, expires_in, refresh_token} = response;
        this.storage.setItem('access_token', access_token, expires_in);
        this.storage.setItem('refresh_token', refresh_token, 30 * 24 * 3600);
        this.clearTimers();
        this.onSuccess(access_token);
        this.notify();
      break;

      default:
        this.log('Critical error', response);
        this.clearTimers();
      break;
    }
  }
  /**
   * Ожидание подтверждения - http://kinoapi.com/authentication.html#id10
   *
   * @param {string} code
   * @param {integer} expires_in
   */
  checkDeviceCode(code, expires_in) {
    post(`${this.apiEndpoint}/oauth2/device`, {
      grant_type: 'device_token',
      client_id: this.appInfo.client.id,
      client_secret: this.appInfo.client.secret,
      code: code
    }).then(this.saveTokens.bind(this));
  }
  /**
   * Получение device_code - http://kinoapi.com/authentication.html#id9
   */
  getDeviceCode() {
    post(`${this.apiEndpoint}/oauth2/device`, {
      grant_type: 'device_code',
      client_id: this.appInfo.client.id,
      client_secret: this.appInfo.client.secret
    }).then(((response) => {
      const {code, expires_in, interval, user_code, verification_uri} = response;
      this.onConfirm(user_code, verification_uri);
      this.checkDeviceCodeIntervaId = setInterval(this.checkDeviceCode.bind(this, code), interval * 1000);
      this.clearTokenTimeoutId = setTimeout(this.init.bind(this, this.onConfirm), expires_in * 1000);
    }).bind(this));
  }
  /**
   * Изменение информации о текущем устройстве - http://kinoapi.com/api_device.html#id14
   */
  notify() {
    const token = this.getAccessToken();
    post(`${this.apiEndpoint}/v1/device/notify?access_token=${token}`, this.appInfo.appInfo);
  }
  /**
   * Получение текущего access_token
   */
  getAccessToken() {
    return this.storage.getItem('access_token');
  }
  /**
   * Получение текущего refresh_token
   */
  getRefreshToken(){
    return this.storage.getItem('refresh_token');
  }

  /**
   * Очистка всех таймеров
   */
  clearTimers(){
    clearInterval(this.checkDeviceCodeIntervaId);
    clearTimeout(this.clearTokenTimeoutId);
    this.checkDeviceCodeIntervaId = 0;
    this.clearTokenTimeoutId = 0;
  }
  /**
   * @constructor
   * @param {object} appInfo
   * @param {function (user_code, validation_url) {

   }} onConfirm - функция которая будет вызванна если необходимо добавление устройства на странице кинопаба
   * @param {function (token) {

   }} onSuccess - если сопряжение прошло успешно или есть готовый access_token будет вызванна данная функция
   */
  constructor(appInfo, onConfirm, onSuccess) {
    super();
    const notImplemented = () => this.log('onConfirm or onSuccess not implemented')

    this.onConfirm = onConfirm ? onConfirm : notImplemented;
    this.onSuccess = onSuccess ? onSuccess : notImplemented;

    this.clearTimers();
    this.appInfo = appInfo;
    this.storage = new Storage();
    this.apiEndpoint = 'https://api.service-kp.com';
    return this;
  }
  /**
   * Обновление access_token - http://kinoapi.com/authentication.html#id12
   */
  refreshToken(){
    post(`${this.apiEndpoint}/oauth2/token`, {
      grant_type: 'refresh_token',
      client_id: this.appInfo.client.id,
      client_secret: this.appInfo.client.secret,
      refresh_token: this.getRefreshToken()
    }).then(this.saveTokens.bind(this));
  }
  /**
   * Инициализация модуля auth
   */
  init(){
    const token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    this.clearTimers();

    if(token) {
      this.notify();
      this.onSuccess(token);
    } else if(refreshToken) {
      this.refreshToken();
    } else {
      this.getDeviceCode();
    }
  }
};
