import React, { useState, memo } from 'react';
import { StyleSheet, Alert} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import strings from '../../global/messages'
import { AuthService } from '../../services/AuthService';
import { Container, Content, Button as NativeBaseButton,Icon,Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../global/config'
import errorMessages from '../../global/firebaseErrorMessages'
import crashlytics from '@react-native-firebase/crashlytics';

import { connect } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin';

const HomeScreen = ({ navigation, login }) => {
  const [isBusy, setIsBusy] = useState(false);

  const performLogin = async (loginType) => {
    let result;
    switch (loginType) {
      case 'GOOGLE':
        console.log("Google login started");
        result = await AuthService.loginGoogle();
        break;
      default:
        console.log("Facebook login started");
        result = await AuthService.loginFacebook();
        break;
    }
    if (!result.isSuccessful) {
      if (result.errorMessage) {
        Alert.alert(strings.error,result.errorMessage);
      }
      return;
    }
    console.log("Login Result",result.user);
    login(result.user);
    navigation.navigate("App");
  };
  const loginFacebook = async () => {
    try {
      setIsBusy(true);
      await performLogin('FACEBOOK');
    }
    catch(e){
      console.log(e);
      switch (e.code) {
        case errorMessages.accountExistsWithDifferentCredentials:
          Alert.alert(strings.error,strings.pleaseTryAnotherLoginMethod)          
          break;
        default:
          Alert.alert(strings.error,strings.generalErrorMessage)
          crashlytics().recordError(e);
          break;

      }
    }
    finally {
      setIsBusy(false);
    }
  };
  const loginGoogle = async () => {
    try {
      setIsBusy(true);
      GoogleSignin.configure({
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '707762468417-f6mdqj6bv8em6oeurnrnnt17aa4vueh6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '707762468417-6s9s06he2peunfav0dqcdtv2fg82svcm.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist),
      });
      await performLogin('GOOGLE');
    }
    catch(e){
      console.log(e);
      switch (e.code) {
        case errorMessages.accountExistsWithDifferentCredentials:
          Alert.alert(strings.error,strings.pleaseTryAnotherLoginMethod)          
          break;
        default:
          Alert.alert(strings.error,strings.generalErrorMessage);
          crashlytics().recordError(e);
          break;
      }
    }
    finally {
      setIsBusy(false);
    }
  };
  return (
    <Container>
      <Spinner
        visible={isBusy}
        textContent={`${strings.loading}...`}
        textStyle={styles.spinnerTextStyle}
      />
      <Content> 
        <Background>
          <Logo />
          <Header>{strings.earnpip}</Header>
          <Paragraph>
            {strings.accreditedPerformance}
          </Paragraph>
          <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            {strings.login}
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {strings.register}
          </Button>
          <NativeBaseButton iconLeft disabled={isBusy} style={styles.socialButton}  onPress={() => loginGoogle()}>
            <Icon name='google' type="FontAwesome" />
            <Text>{strings.loginWithGoogle}</Text>
          </NativeBaseButton>
          <NativeBaseButton iconLeft disabled={isBusy} style={styles.socialButton} onPress={() => loginFacebook()}>
            <Icon name='facebook' type="FontAwesome" />
            <Text>{strings.loginWithFacebook}</Text>
          </NativeBaseButton>
        </Background>
      </Content>
    </Container>
  )
};


const styles = StyleSheet.create({
socialButton:{
  marginBottom:config.deviceHeight*0.01,
  marginTop:config.deviceHeight*0.01,
  alignSelf:'center'

},
  label: {
    fontSize: 14,
    fontWeight: '600',
  }
});
const mapDispatchToProps = ({ auth: { login } }) => ({
  login: (usr) => login(usr),
});
export default connect(null, mapDispatchToProps)(memo(HomeScreen));
