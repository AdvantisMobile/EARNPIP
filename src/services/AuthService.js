import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
const FACEBOOK_PROVIDER_ID = 'facebook.com';
const GOOGLE_PROVIDER_ID = 'google.com';
const PHONE_PROVIDER_ID = 'phone';
import * as callers from '../global/call';
import moment from 'moment';
import strings from '../global/messages';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

const getUser = (user) => {
    const avatarUrl = user.photoURL && user.photoURL.indexOf('facebook') > -1 ? `${user.photoURL}?height=500` : user.photoURL;
    let loginType = 'EMAIL';
    if (user.providerData[0].providerId === FACEBOOK_PROVIDER_ID) {
        loginType = 'FACEBOOK';
    }
    else if (user.providerData[0].providerId === GOOGLE_PROVIDER_ID) {
        loginType = 'GOOGLE';
    }
    else if (user.providerData[0].providerId === PHONE_PROVIDER_ID) {
        loginType = 'PHONE_NO';
    }
    else {
        loginType = 'EMAIL';
    }
    let displayName = user.displayName || undefined;
    if (!displayName) {
        if (loginType === 'PHONE_NO') {
            displayName = user.phoneNumber;
        }
        else if (loginType === 'EMAIL') {
            displayName = user.email;
        }
    }
    return {
        id: user.uid,
        displayName,
        avatarUrl: avatarUrl || undefined,
        isLoggedIn: true,
        email: user.email || undefined,
        emailVerified: user.emailVerified,
        loginType,
        creationTime:user.metadata.creationTime
    };
};
const loginFacebook = async () => {
    try{
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
        return {
            isSuccessful: false,
            isCancelled: true,
            errorMessage: '',
        };
    }
    // alert(JSON.stringify(result));
    if (result.declinedPermissions&&result.declinedPermissions.includes("email")) {
        return {
            isSuccessful: false,
            isCancelled: true,
            errorMessage: strings.emailMandatory,
        };
      }
    // get the access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
    }
    const credential = await auth.FacebookAuthProvider.credential(data.accessToken);
    const { user } = await auth().signInWithCredential(credential);
    let userDetails=getUser(user);
    await checkAndRegisterCustomerExternalAuth(userDetails);
    return {
        user: userDetails,
        isSuccessful: true,
    };
}
catch(error){
    alert(error);
    console.log(error);
    crashlytics().recordError(error);
    return {
        isSuccessful: false,
        errorMessage:strings.generalErrorMessage
    };
}
};
const loginGoogle = async () => {
    try {
        await GoogleSignin.signIn();
        const { idToken, accessToken } = await GoogleSignin.getTokens();
        const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        const { user } = await auth().signInWithCredential(credential);
        let userDetails=getUser(user);
        await checkAndRegisterCustomerExternalAuth(userDetails);
        return {
            user: userDetails,
            isSuccessful: true,
        };
    }
    catch (error) {
        if (error.message.indexOf('The user canceled the sign in request') > -1 ||
            error.message.indexOf('Sign in action cancelled') > -1) {
            return {
                isSuccessful: false,
                isCancelled: true,
                errorMessage: '',
            };
        }
        throw error;
    }
};
const createUserWithEmailAndPassword = async (email, password) => {
    auth().languageCode = strings.getLanguage();
    const { user } = await auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({
        displayName: email,
    });
    await user.reload();
    await user.sendEmailVerification();
    let userDetials=getUser(user);
    try
    {
        await registerCustomerToEarnpip(userDetials);
    }
    catch(e){
        console.log(e);
        crashlytics().recordError(e);
    }

    return userDetials;
};
const signInWithEmailAndPassword = async (email, password) => {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    return getUser(user);

};
const isEmailRegistered = async (email) => {
    try {
        await auth().signInWithEmailAndPassword(email, ' ');
    }
    catch (error) {
        if (!error.code) {
            throw error;
        }
        if (error.code !== 'auth/user-not-found') {
            return true;
        }
    }
    return false;
};
const isEmailVerified = async () => {
    const currentUser = await auth().currentUser;
    if (!currentUser) {
        return false;
    }
    await currentUser.reload();
    console.log("currentUSer",currentUser.emailVerified);
    return currentUser.emailVerified;
};
const getCurrentUser = async () => {
    const { currentUser } = auth();
    await currentUser.reload();
    console.log("getCurrent",currentUser);
    return currentUser ? getUser(currentUser) : undefined;
};
const logout = async () => {
    const user = auth().currentUser;
    if (!user) {
        return;
    }
    if (user.providerData &&
        user.providerData.length > 0 &&
        user.providerData[0].providerId === 'google.com' &&
        (await GoogleSignin.isSignedIn())) {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    }
    await auth().signOut();
};
const resendVerificationEmail = async () => {
    const user = auth().currentUser;
    if (user) {
        auth().languageCode = strings.getLanguage();
        user && (await user.sendEmailVerification());
    }
};
const changePassword = async (newPassword) => {
    const user = auth().currentUser;
    user && (await user.updatePassword(newPassword));
};
const sendSmsVerification = async (phoneNo) => {
    auth().languageCode = strings.getLanguage();
    return auth().signInWithPhoneNumber(phoneNo, true);
};
const verifySmsCode = async (confirmationResult, code) => {
    const user = await confirmationResult.confirm(code);
    return user ? getUser(user) : undefined;
};
const sendPasswordResetEmail = async (email) => {
    auth().languageCode = strings.getLanguage();
    await auth().sendPasswordResetEmail(email);
};
const isFreeTrialEnded=async(creationUnixTime)=>{
    let freeTrialPeriodResponse = await callers.signalApi.get(`GetFreeTrialPeriod`);
    let freeTrialPeriod = freeTrialPeriodResponse.data;
    // let currentUser=await getCurrentUser();
    // console.log("currentUserIsFree",currentUser);
    // let creationTime=moment.utc(moment(currentUser.creationTime)).format();
    // -4 Gmt olarak data geldiğinden utc ye çeviriyoruz.
    let creationTime=moment.utc(moment(creationUnixTime)).format();

    let now=moment.utc(new Date()).format();
    let exceedAt=moment(creationTime).add(freeTrialPeriod, 'days').utc().format();
    let isPeriodExceed=moment(now).isAfter(exceedAt);
    console.log("creationTime",creationTime);
    console.log("creationUnixTime",creationUnixTime);

    console.log("freeTrialPeriod",freeTrialPeriod);
    console.log("now",now);
    console.log("exceedAt",exceedAt);

    console.log("isPeriodExceed",isPeriodExceed);
      
    if(isPeriodExceed){
        let cr=await getCurrentUser();
        let userBasedPeriodResponse = await callers.signalApi.get(`GetUserBasedPeriod`, {
            params: {
              email: cr.email
            }
          });
          let extraTime=userBasedPeriodResponse.data;
          console.log("extraTime",extraTime)
          if(extraTime==null || extraTime=='')
          {
              
              return true;
          }
          else
          {

            let extraTimeUtc=moment.utc(extraTime).format();
            let isExtraPeriodExceed=moment(now).isAfter(extraTimeUtc);
            return isExtraPeriodExceed;
          }
    }
    return isPeriodExceed;

}
const isCustomerRegisteredToEarnpip = async (email) => {
    let response = await callers.signalApi.get(`IsCustomerRegistered`, {
        params: {
          Email: email,
        }
      });
      let isRegistered=response.data;
      if(isRegistered)
      {
        return true;
      }
      else
      {
        return false;
      }
};
const registerCustomerToEarnpip=async(userDetails)=>{
    let fcmToken = await messaging().getToken()

    await callers.signalApi.post('RegisterCustomer', {
        Email: userDetails.email,
        Language: strings.getLanguage(),
        RegistrationDate:moment.utc(moment(userDetails.creationTime)).format(),
        FcmToken:fcmToken
      });
}
const checkAndRegisterCustomerExternalAuth=async(userDetails)=>{
    let isAlreadyRegistered=await isCustomerRegisteredToEarnpip(userDetails.email);
    if(!isAlreadyRegistered){
        await registerCustomerToEarnpip(userDetails);
    }
}
// const  updateFirebaseToken=async(userDetails)=> {
//     let fcmToken = await AsyncStorage.getItem(`${userDetails.email}fcmToken`);
//     if (!fcmToken) {
//         fcmToken = await messaging().getToken();
//         if (fcmToken) {
//             // user has a device token
//             console.log("getFirebaseToken fcmToken",fcmToken);

//             await callers.signalApi.post('UpdateFcmToken', {
//                 Email: userDetails.email,
//                 Token: fcmToken,
//               });
//             await AsyncStorage.setItem(`${userDetails.email}fcmToken`, fcmToken);
//         }
//     }
//   }
export const AuthService = {
    loginFacebook,
    loginGoogle,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    isEmailRegistered,
    isEmailVerified,
    getCurrentUser,
    logout,
    resendVerificationEmail,
    changePassword,
    sendSmsVerification,
    verifySmsCode,
    sendPasswordResetEmail,
    getUser,
    isFreeTrialEnded,
};
