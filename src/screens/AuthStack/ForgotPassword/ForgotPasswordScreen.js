import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity,View } from 'react-native';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import { paperTheme } from '../../../core/theme';
import strings from '../../../global/messages';
import { Container,Content } from 'native-base';
import ForgotPasswordForm from './ForgotPasswordForm';
import config from '../../../global/config';

export default class ForgotPasswordScreen extends Component {
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
      <Header>{strings.restorePassword}</Header>
      <ForgotPasswordForm navigation={navigation}/>
      <View style={styles.login}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.label}>← {strings.backtoLogin}</Text>
      </TouchableOpacity>
      </View>
    </Background>
    </Content>
    </Container>
  );
  }
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: config.deviceHeight*0.03,
  },
  button: {
    marginTop: config.deviceHeight*0.03,
  },
  label: {
    color: paperTheme.colors.secondary,
    width: '100%',
  },
  login: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: config.deviceHeight*0.03,
  },
});