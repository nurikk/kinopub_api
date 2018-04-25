import {AuthApi} from './AuthApi';
const toUrl = (params) => {
  return Object.keys(params).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(params[k]));
    return a;
  }, []).join('&')
};

export class KinopubApi {
  _api(name, params={}, callback) {
    let _params = Object.assign({
      access_token: this.auth.getAccessToken()
    }, params);
    const url = `${this.apiHostUrl}${name}`;
    fetch([url, toUrl(_params)].join(url.indexOf('?') ===-1 ? '?' : '&'))
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        callback(myJson);
      });
  }

  getUnwatchedFilms(callback) {
    this._api('/watching/movies', {}, callback);
  }
  getCategories(callback) {
    this._api('/types', {}, callback);
  }
  /**
   * Shortcut - популярные видео
   * @param {object} params
   * @param {string} params.type - Типы видео контента
   * @param {string} params.page=0 - Текущая страница
   * @param {string} params.perpage=25 - Количество на страницу
   */
  getPopularVideos(callback, params = {}){
    this._api('/items/popular', params, callback);
  }

  getVideo(callback, params = {}){
    this._api(`/items/${params.id}`, {}, callback);
  }

  getVideos(callback, params = {}) {
    this._api(`/items?${toUrl(params)}`, {}, callback);
  }
};