'use strict';

import AsyncStorage from '@react-native-community/async-storage';

// Inspired by lscache https://github.com/pamelafox/lscache

const CACHE_PREFIX = 'cachestore-';
const CACHE_EXPIRATION_PREFIX = 'cacheexpiration-';
const EXPIRY_UNITS = 60 * 1000; // Time resolution in minutes

function currentTime(){
  return Math.floor((new Date().getTime())/EXPIRY_UNITS);
};

const CacheStore = {
   async getAndSetIfNotExists(key,time,getFunc) {
    const theKey = CACHE_PREFIX + key;
    const exprKey = CACHE_EXPIRATION_PREFIX + key;
    await AsyncStorage.multiRemove([exprKey, theKey]);
     let expiry=await AsyncStorage.getItem(exprKey);
     if (expiry == null || currentTime() >= parseInt(expiry, 10)){
        await AsyncStorage.multiRemove([exprKey, theKey]);
        try        
        {
            let resp=await getFunc();
            await this.set(key,resp,time);
            return Promise.resolve(JSON.parse(resp));         
        }
        catch(e){
console.log(e);
throw(e);
        }

      }
  },

  async setAsync(key, value, time){

    const theKey = CACHE_PREFIX + key;
    const exprKey = CACHE_EXPIRATION_PREFIX + key;
    if (time){
    await AsyncStorage.setItem(exprKey, (currentTime() + time).toString());
       await  AsyncStorage.setItem(theKey, JSON.stringify(value));

    } else {
      await AsyncStorage.removeItem(exprKey);
      await  AsyncStorage.setItem(theKey, JSON.stringify(value));
    }
  },
  get(key){
    const theKey = CACHE_PREFIX + key;
    const exprKey = CACHE_EXPIRATION_PREFIX + key;
    return AsyncStorage.getItem(exprKey).then((expiry) => {
      if (expiry && currentTime() >= parseInt(expiry, 10)){
        AsyncStorage.multiRemove([exprKey, theKey]);
        return Promise.reject(null);
      }
      return AsyncStorage.getItem(theKey).then((item) => {
        return Promise.resolve(JSON.parse(item));
      }).catch(() => {
        return Promise.reject(null);
      });
    }).catch(() => {
      return Promise.reject(null);
    });
  },

  set(key, value, time){
    const theKey = CACHE_PREFIX + key;
    const exprKey = CACHE_EXPIRATION_PREFIX + key;
    if (time){
      return AsyncStorage.setItem(exprKey, (currentTime() + time).toString()).then(() => {
        return AsyncStorage.setItem(theKey, JSON.stringify(value));
      }).catch(() => {
        return Promise.reject(null);
      });
    } else {
      AsyncStorage.removeItem(exprKey);
      return AsyncStorage.setItem(theKey, JSON.stringify(value));
    }
  },
  remove(key){
    return AsyncStorage.multiRemove([CACHE_EXPIRATION_PREFIX + key, CACHE_PREFIX + key]);
  },

  isExpired(key){
    const exprKey = CACHE_EXPIRATION_PREFIX + key;
    return AsyncStorage.getItem(exprKey).then((expiry) => {
      var expired = expiry && currentTime() >= parseInt(expiry, 10);
      return expired ? Promise.resolve() : new Promise.reject(null);
    });
  },

  flush(){
    return AsyncStorage.getAllKeys().then((keys) => {
      var theKeys = keys.filter((key) => {
        return key.indexOf(CACHE_PREFIX) == 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) == 0;
      });
      return AsyncStorage.multiRemove(theKeys);
    });
  },

  flushExpired(){
    return AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach((key) => {
        if (key.indexOf(CACHE_EXPIRATION_PREFIX) == 0){
          var exprKey = key;
          return AsyncStorage.getItem(exprKey).then((expiry) => {
            if (expiry && currentTime() >= parseInt(expiry, 10)){
              var theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '');
              return AsyncStorage.multiRemove([exprKey, theKey]);
            }
            return Promise.resolve();
          });
        }
        return Promise.resolve();
      });
    });
  }
};

// Always flush expired items on start time
CacheStore.flushExpired();

export default CacheStore;