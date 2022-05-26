import initialState from '../store/auth';
import NavigationService from '../services/NavigationService'
import auth from '@react-native-firebase/auth';
import strings from '../global/messages'
import * as callers from '../global/call';

export default {
  namespace: 'auth',

  /**
   *  Initial state
   */
  state:initialState,
  /**
   * Reducers
   */
  reducers: {
    login(state, payload) {
      console.log("Login State",state);
      console.log("Payload",payload);
      return {
        ...state,
        ...payload,
      };
    },
    logout(state) {
      return {
        ...state,
        ...initialState,
        isOnBoardingScreenShowed:true
      };
    },
    setLanguage(state,payload){
    return {
      ...state,
      preferredLanguage:payload
    }
    },
    markEmailVerified(state,payload) {
      return {
        ...state,
        emailVerified: true
      };
    },
    onBoardingShowed(state,payload){
      return {
        ...state,
        isOnBoardingScreenShowed:true
      }
    }
  },
  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    async changeLanguage(payload, state) {
      strings.setLanguage(payload);
      await callers.signalApi.post('SetLanguage', {
        Email: state.auth.email,
        Language: payload,
      });
      dispatch.auth.setLanguage(payload)
    }
    // async userMailLogin(credentials, state) {
    //   try {
    //     let result = await auth().signInWithEmailAndPassword(credentials.email, credentials.password);
    //     let user = { email: credentials.email, imei: '123456' }

    //     dispatch.auth.setUserInfo(state, user);
    //     NavigationService.navigate('App');
    //   } catch (error) {
    //     throw (error);
    //   }
    // },
    // switchStack(payload = {}, state) {
    //   if (state.isLoggedIn)
    //     NavigationService.navigate('App');
    //   NavigationService.navigate('Auth');
    // },
  })
};
