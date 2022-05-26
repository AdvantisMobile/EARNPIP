import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Router from '../src/router'
import { Root } from 'native-base';
import codePush from 'react-native-code-push';
import Loading from './components/Loading';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import Toast from 'react-native-simple-toast';

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
        //When the application is in a background or quit state


  }

  async componentDidMount() {
    this.setState({ loading: false });
    // if(Platform.OS === 'ios'){
      await this.checkandRequestApplicationPermission();
    // }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
        //listen to messages in the foreground
      this.foregroundStateListener =messaging().onMessage((payload) => {
      console.log('Message received. ', payload);
      var text=payload.data.Title+'\n'+payload.data.Body;
      Toast.showWithGravity(text, Toast.LONG, Toast.TOP);
      // if (payload.data.SignalStatus=="Closed"){
      //   EventRegister.emit('closeSignalReceived',payload.data.SignalType);
      // }
      // else{
      //   EventRegister.emit('openSignalReceived',payload.data.SignalType);
      // }
      // Toast.show({
      //   text: payload.data.Title+'\n'+payload.data.Body,
      //   buttonText: strings.okey,
      //   duration: 5000,
      //   position:'top',
      //   type: "success"
      // });
      // ...
    });
  }
  componentWillUnmount() {
    this.foregroundStateListener();
}
  async  checkandRequestApplicationPermission() {
    let enabled=await this.checkPermission();
    if(enabled)
    {
      console.log("User has already granted permissions");
    }
    else
    {
      await requestUserPermission()
    }  

  }
/*
On Android, you do not need to request user permission. 
This method can still be called on Android devices; however, and will always resolve successfully.
*/
  async requestUserPermission() {
    try
    {
      console.log('Requesting Permission');

      const authorizationStatus = await messaging().requestPermission();
      if(messaging.AuthorizationStatus.NOT_DETERMINED)
    {
        console.log('User permissions NOT_DETERMINED');

    }  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) 
    {
      console.log('User permissions AUTHORIZED');
    } 
    else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) 
    {
      console.log('User permissions PROVISIONAL.');
    } 
    else 
    {
      console.log('User has notification permissions disabled');
    }
    } 
    catch
    {
      // User has rejected permissions
      console.log('permission rejected');
    }

  }
  async checkPermission() {
    const enabled = await messaging().hasPermission();
    return enabled
    }


  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;
    if (loading) {
      return <Loading />;
    }

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading/>} persistor={persistor}>
          <Router />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
  
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};
const mapState = state => ({
	currentLanguage: state.auth.preferredLanguage,
});
const mapDispatchToProps = ({ auth: { changeLanguage }}) => ({
  changeLanguage: (lang) => changeLanguage(lang),
  // changeTheme:(theme) => changeTheme(theme)
});
App = codePush({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE })(App);
export default App;
