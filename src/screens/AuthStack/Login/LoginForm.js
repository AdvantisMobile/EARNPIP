import React, { Component } from 'react';
import { Formik } from "formik";
import loginValidations from './loginValidations';
import strings from '../../../global/messages';
import { Text } from "native-base";
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput'
import config from '../../../global/config';
import { StyleSheet, Alert } from 'react-native';
import { paperTheme } from '../../../core/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import errorMessages from '../../../global/firebaseErrorMessages';
import { AuthService } from '../../../services/AuthService';
import crashlytics from '@react-native-firebase/crashlytics';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.passwordRef = React.createRef();
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={this._handleSubmit}
        validationSchema={loginValidations}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldTouched,
          isValid,
          isSubmitting
        }) => (
            <React.Fragment>
              <Spinner
                visible={isSubmitting}
                textContent={`${strings.loading}...`}
                textStyle={styles.spinnerTextStyle}
              />
              <TextInput
                label={strings.email}
                returnKeyType={'next'}
                onSubmitEditing={() => this.passwordRef.current.focus()}
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardType="email-address"
                error={errors.email && touched.email}
              />
              {(errors.email && touched.email) && <Text style={{ color: 'red' }}>{errors.email}</Text>}

              <TextInput
                label={strings.password}
                ref={this.passwordRef}
                returnKeyType={'done'}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
                autoCapitalize={'none'}
                secureTextEntry={true}
              />
              {(errors.password && touched.password) && <Text style={{ color: 'red' }}>{errors.password}</Text>}
              <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={!isValid || isSubmitting}>
                {strings.login}
              </Button>
            </React.Fragment>
          )}
      </Formik>
    );
  }
  _handleSubmit = async ({ email, password }, bag) => {
    try {
      const user = await AuthService.signInWithEmailAndPassword(email, password);
      await this.props.login(user);
      if (user.emailVerified) 
      {
        this.props.navigation.navigate("App");        
      } 
      else 
      {
        this.props.navigation.navigate("EmailVerificationScreen");
      }

    }
    catch (e) {
      console.log(e);
      switch (e.code) {
        case errorMessages.userDisabled:
          Alert.alert(strings.error,strings.userDisabled)          
          break;
        case errorMessages.invalidEmail:
          Alert.alert(strings.error,strings.mailRegisterAccountInValid)          
          break;
        case errorMessages.userNotFound:
          Alert.alert(strings.error,strings.mailLoginUsernameorWrongPasss)          
          break;
          case errorMessages.wrongPassword:
            Alert.alert(strings.error,strings.mailLoginUsernameorWrongPasss)          
            break;
        default:
          Alert.alert(strings.error,strings.generalErrorMessage)
          crashlytics().recordError(e);
          break;
      }
    }
    finally{
    }
  };

}

const styles = StyleSheet.create({
  label: {
    color: paperTheme.colors.secondary,
  },
  button: {
    marginTop: config.deviceHeight * 0.02,
    marginBottom: config.deviceHeight * 0.02,

  },
  row: {
    flexDirection: 'row',
    marginTop: config.deviceHeight * 0.01,
  },
  link: {
    fontWeight: 'bold',
    color: paperTheme.colors.primary,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
const mapDispatchToProps = ({ auth: { login } }) => ({
  login: (usr) => login(usr),
});
export default connect(null, mapDispatchToProps)(LoginForm);
