import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import config from './config';
import moment from 'moment'
import crashlytics from '@react-native-firebase/crashlytics';

let handlerEnabled = true
const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
      false : true
  }
// let baseUrl=__DEV__?"http://10.0.3.2:5000/api/forexsignal/":"http://161.97.66.113/api/forexsignal/";
let baseUrl="http://161.97.66.113/api/forexsignal/";
const signalApi=axios.create({
 baseURL:baseUrl
});
signalApi.interceptors.request.use(
    async request => await requestHandler(request),
    // async config => { console.log("Base Url",config.baseURL) return config; }
  );
  signalApi.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)  
    );

  const requestHandler = async (request) => {
    // await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("token_exp");

    try{
      if (isHandlerEnabled(request)) {
        let token=await AsyncStorage.getItem("token");
  
        if(token===null)
        {
          token=await fetchTokenAndWrite();        
        }
        let isExpired=await checkIfExpired();
        if(isExpired){
          token=await fetchTokenAndWrite()
        }
        request.headers['Authorization'] = `Bearer ${token}`

      }
      return request
    }
    catch(error){
      console.log(error);
      crashlytics().recordError(error);
      throw(error);
    }
  }
  const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        console.log(error);
        crashlytics().recordError(error);
    }
    return Promise.reject({ ...error })
  }
  const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
    }
    return response
  }
  const getExpirationTime=(token)=>{
    let decodedToken=jwt_decode(token);
    return decodedToken.exp.toString();
  }

  const fetchTokenAndWrite=async (token)=>{
        var resp=await axios.post(config.tokenAdress, {
          username: config.u,
          password: config.p
        });
        token=resp.data;
        await AsyncStorage.setItem("token_exp",getExpirationTime(token));
        await AsyncStorage.setItem("token",token);
        return token;
}
const checkIfExpired=async ()=>{
  let expTime=await AsyncStorage.getItem("token_exp");
  if ((parseFloat(expTime)) >  (moment.utc(new Date()).valueOf()/1000)+300)
    return false;
    return true;
}
export {
  signalApi,
};