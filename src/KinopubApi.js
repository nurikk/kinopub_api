import {AuthApi} from './AuthApi';
class KinopubApi {
  constructor() {
    this.apiHostUrl = "https://api.service-kp.com/v1";
    this.info = {
      title: 'Kinopub Webos player',
      hardware: 'LG C7',
      software: 'https://github.com/nurikk/kinopub'
    };
    this.auth = new AuthApi(this.info);
    // this.auth.notify();
  }
  _api(name, callback) {
    fetch(`${this.apiHostUrl}${name}?access_token=${this.auth.getToken()}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  }

  getUnwatchedFilms(callback) {
    this._api('/watching/movies', callback);
  }
  getCategories(callback) {
    this._api('/types', callback);
  }
};