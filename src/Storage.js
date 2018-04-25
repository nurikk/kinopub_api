export class Storage {
  removeItem(key) {
    window.localStorage.removeItem(key);
  }
  getItem(key) {
    const storageValue = window.localStorage.getItem(key) || '{}';
    const storageItem = JSON.parse(storageValue);
    if(storageItem){
      if(storageItem.expire && Date.now() < storageItem.expire){
        return storageItem.value;
      } else {
        return storageItem.value;
      }
    } else {
      return false;
    }
  }
  setItem(key, val, expire_s) {
    let storageItem = {
      value: val
    };
    if(expire_s) {
      storageItem.expire = Date.now() + expire_s * 1000;
    }
    window.localStorage.setItem(key, JSON.stringify(storageItem));
  }
}