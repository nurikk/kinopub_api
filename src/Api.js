import {AuthApi} from './AuthApi';
import {KinopubApi} from './KinopubApi';
class Api {
  constructor(onConfirm, onSuccess, info={}) {
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
    this.auth = new AuthApi(this.info, onConfirm, onSuccess);
  }
};

export {Api};