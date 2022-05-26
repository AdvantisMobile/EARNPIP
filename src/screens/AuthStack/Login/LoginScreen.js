import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import { paperTheme } from '../../../core/theme';
import strings from '../../../global/messages';
import LoginForm from './LoginForm';
import config from '../../../global/config';
import { Container,Content } from 'native-base';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
	}
  render(){
    const {navigation} = this.props;
    return (
      <Container>
      <Content>
      <Background>
      <Logo />
      <Header>{strings.welcomeBack}</Header>
        <LoginForm navigation={navigation}/>
        <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.label}>{strings.forgotPassword}?</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.row}>
        <Text style={styles.label}>{strings.dontHaveAccount}? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>{strings.register}</Text>
        </TouchableOpacity>
      </View>
      </Background>
      </Content>
      </Container>
    );
  }

};
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: config.deviceHeight*0.03,
  },
  row: {
    flexDirection: 'row',
    marginTop: config.deviceHeight*0.01,
    marginBottom:config.deviceHeight*0.09
  },
  label: {
    color: paperTheme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: paperTheme.colors.primary,
  },
});