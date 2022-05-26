import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../../components/Background';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import { paperTheme } from '../../../core/theme';
import strings from '../../../global/messages';
import RegisterForm from './RegisterForm';
import config from '../../../global/config';
import { Container,Content } from 'native-base';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
	}
  render(){
    const {navigation} = this.props;
    return (
      <Container>
      <Content>
      <Background style={styles.background}>
        <Logo />
        <Header>{strings.createAccount}</Header>
        <RegisterForm navigation={navigation}/>
        <View style={styles.row}>
          <Text style={styles.label}>{strings.alreadyHaveAccount}? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>{strings.login}</Text>
          </TouchableOpacity>
        </View>
      </Background>
      </Content>
      </Container>
    );
  }

};

const styles = StyleSheet.create({
  label: {
    color: paperTheme.colors.secondary,
  },
  button: {
    marginTop: config.deviceHeight*0.02,
  },
  row: {
    flexDirection: 'row',
    marginTop: config.deviceHeight*0.01,
    // marginBottom:config.deviceHeight*0.01
  },
  link: {
    fontWeight: 'bold',
    color: paperTheme.colors.primary,
  },
  background:{
    overflow:"hidden",
    flex: -1,
    justifyContent:"center",
    alignItems:"center",
    overflow:'visible'
  }
});