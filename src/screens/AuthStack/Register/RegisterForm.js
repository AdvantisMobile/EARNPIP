import React, { Component } from 'react';
import {Formik} from "formik";
import registerValidations from './registerValidations';
import strings from '../../../global/messages';
import {Text} from "native-base";
import Button from '../../../components/Button';
import TextInputWithRef from '../../../components/TextInput'
import config from '../../../global/config';
import {StyleSheet, Alert} from 'react-native';
import { paperTheme } from '../../../core/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import errorMessages from '../../../global/firebaseErrorMessages'
import { connect } from 'react-redux'
import {AuthService}  from '../../../services/AuthService'
import crashlytics from '@react-native-firebase/crashlytics';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.passwordRef=React.createRef();
    this.passwordConfirmRef=React.createRef();
  }
  _handleSubmit = async ({ email, password }, bag) => {
    try {
      const user =await AuthService.createUserWithEmailAndPassword(email, password);
      this.props.login(user);
      this.props.navigation.navigate('EmailVerificationScreen')
    }
    catch (e) {
      console.log(e);
      switch (e.code) {
        case errorMessages.emailInUse:
        case errorMessages.emailInUse2:
          Alert.alert(strings.error,strings.mailRegisterAccountExists)          
          break;
        case errorMessages.invalidEmail:
          Alert.alert(strings.error,strings.mailRegisterAccountInValid)          
          break;
        case errorMessages.weakPassword:
          Alert.alert(strings.error,strings.mailRegisterAccountWeakPassword)          
          break;
        default:
          Alert.alert(strings.error,strings.generalErrorMessage)
          crashlytics().recordError(e);
          break;
      }
    }
  };

  render() {
    return (
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={this._handleSubmit}
          validationSchema={registerValidations}>
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
              <TextInputWithRef
                  label={strings.email}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef.current.focus()}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  />
                { (errors.email && touched.email) && <Text style={{color: 'red'}}>{errors.email}</Text>}
 
                <TextInputWithRef
                  label={strings.password}
                  ref={this.passwordRef}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordConfirmRef.current.focus()}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />
  							{ (errors.password && touched.password) && <Text style={{color: 'red'}}>{errors.password}</Text>}

                <TextInputWithRef
                  label={strings.confirmPassword}
                  ref={this.passwordConfirmRef}
                  returnKeyType={'go'}
                  onChangeText={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                /> 
                { (errors.passwordConfirm && touched.passwordConfirm) && <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>}
              <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={!isValid || isSubmitting}>
              {/* { isSubmitting && <Spinner size={'small'} color={'white'} /> } */}
              {strings.register}
               </Button>
               {/*Text içerisinde view olarak algılıyor.*/}
               </React.Fragment>
          )}
        </Formik>
    );
  }

}

const styles = StyleSheet.create({
  label: {
    color: paperTheme.colors.secondary,
  },
  button: {
    marginTop: config.deviceHeight*0.02,
    marginBottom: config.deviceHeight*0.02,
  },
  row: {
    flexDirection: 'row',
    marginTop: config.deviceHeight*0.01,
  },
  link: {
    fontWeight: 'bold',
    color: paperTheme.colors.primary,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
const mapDispatchToProps = ({ auth: { login }}) => ({
	login: (usr) => login(usr),
  });
export default connect(null,mapDispatchToProps)(RegisterForm);
