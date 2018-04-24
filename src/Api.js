import {AuthApi} from './AuthApi';
import {KinopubApi} from './KinopubApi';
class ApiClass extends KinopubApi {

  on(event, callback){
    if(typeof this.events[event] === 'undefined'){
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  constructor(onConfirm, onSuccess) {
    super();
    this.events = {};
    this.apiHostUrl = "https://api.service-kp.com/v1";
    this.info = {
      client: {
        id: 'xbmc',
        secret: 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
      },
      appInfo: {
        title: 'Kinopub Webos player',
        hardware: 'LG C7',
        software: 'https://github.com/nurikk/kinopub'
      }
    };
    this.auth = new AuthApi(this.info, ((user_code, verification_uri) => {
      (this.events['pair'] || []).forEach((cb) =>cb(user_code, verification_uri));
    }).bind(this), ((token) => {
      (this.events['loaded'] || []).forEach((cb) =>cb(token));
    }).bind(this), this);
    return this;
  }
};

export const Api = new ApiClass();