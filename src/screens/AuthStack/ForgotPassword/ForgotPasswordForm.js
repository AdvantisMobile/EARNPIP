import React, { Component } from 'react';
import { Formik } from "formik";
import forgotPasswordValidations from './forgotPasswordValidations';
import strings from '../../../global/messages';
import { Text } from "native-base";
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput'
import config from '../../../global/config';
import { StyleSheet, Alert } from 'react-native';
import { paperTheme } from '../../../core/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import errorMessages from '../../../global/firebaseErrorMessages';
import { AuthService } from '../../../services/AuthService';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={this._handleSubmit}
        validationSchema={forgotPasswordValidations}>
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
                label={strings.emailAddress}
                returnKeyType={'done'}
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              {(errors.email && touched.email) && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={!isValid || isSubmitting}>
                {strings.sendResetInstruction}
              </Button>
            </React.Fragment>
          )}
      </Formik>
    );
  }
  _handleSubmit = async ({ email }, bag) => {
    try {
        await AuthService.sendPasswordResetEmail(email);
        Alert.alert(strings.information,strings.passwordResetEmailSent);
    } 
    catch (e) {
      console.log(e);
      switch (e.code) {
        case errorMessages.userNotFound:
          Alert.alert(strings.error,strings.userNotFound)          
          break;
        default:
          Alert.alert(strings.error,strings.generalErrorMessage)
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
export default ForgotPasswordForm;
