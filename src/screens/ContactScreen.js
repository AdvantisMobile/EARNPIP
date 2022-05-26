import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Container, Header, Text, Button, Left, Item, Icon, Input, Card, CardItem, Content, Form, Toast } from 'native-base';
import strings from '../global/messages';
import { mainTheme } from '../core/theme'
import config from '../global/config';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import * as callers from '../global/call';
import {AuthService}  from '../services/AuthService';


class ContactScreen extends Component {
  state = {
    isSubmitting: false,
    // mail: "",
    // mailcolor: "gray",
    message: "",
    messagecolor: "gray"
  }
  // mailChange(text) {
  //   this.setState({ mail: text })
  //   this.setState({ mailcolor: "#3498db" })
  // }
  // mailEndEditing() {
  //   if (this.state.mail == "") {
  //     this.setState({ mailcolor: "gray" })
  //   }
  // }
  // mailFocused() {
  //   this.setState({ mailcolor: "#3498db" })

  // }
  messageChange(text) {
    this.setState({ message: text })
    this.setState({ messagecolor: "#3498db" })
  }
  messageEndEditing() {
    if (this.state.message == "") {
      this.setState({ messagecolor: "gray" })
    }
  }
  messageFocused() {
    this.setState({ messagecolor: "#3498db" })
  }

  async onSendPressed() {
    if (this.state.mail == "" || this.state.message == "") {
      Toast.show({
        text: strings.fillAllBlankAreas,
        buttonText: strings.okey,
        duration: 5000,
        type: "warning"
      })

    }
    else {
      try{
        this.setState({ isSubmitting: true });
        // let currentUser=AuthService.getCurrentUser();
        console.log(this.props.user);
         let result = await callers.signalApi.post('SendMail', {
          Sender: this.props.user.email,
          Message: this.state.message,
        });
        this.setState({ isSubmitting: false });
        if (result){
          Toast.show({
            text: strings.messageSent,
            buttonText: strings.okey,
            duration: 5000,
            type: "success"
          })
        }
        else{
          Toast.show({
            text: strings.generalErrorMessage,
            buttonText: strings.okey,
            duration: 5000,
            type: "success"
          })
        }
      }
      catch(e)
      {
        this.setState({ isSubmitting: false });
      console.log(e); 
      }


    }
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Container>
        <Spinner
          visible={this.state.isSubmitting}
          textContent={`${strings.loading}...`}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={styles.headerStyle} iosBarStyle="light-content" androidStatusBarColor={mainTheme.mainColor} >
          <Left style={styles.drawerStyle}>
            <Icon style={styles.iconStyle} onPress={() => this.props.navigation.openDrawer()} type="MaterialIcons" name="menu" />
            <Text style={styles.headerText}>{strings.contactUs}</Text>
          </Left>
        </Header>
        <Content style={styles.contentStyle}>

          <Card style={styles.cardStyle}>
            <CardItem bordered={true} style={styles.cardItemStyle}>
              <Text style={styles.cardItemTextStyle}>{strings.contactUs}</Text>
            </CardItem>
            <CardItem bordered={true} style={styles.cardItemStyle}>
              <Form style={{ marginLeft: -20, flex: 1 }}>
                {/* <Item >
                  <Input placeholder={strings.email} autoCapitalize="none" style={styles.inputStyle} onFocus={this.mailFocused.bind(this)} onEndEditing={this.mailEndEditing.bind(this)} onChangeText={this.mailChange.bind(this)} value={this.state.mail} />
                </Item> */}
                <Item style={{ minHeight: 50 }} >
                  <Input placeholder={strings.message} style={styles.inputStyle} onFocus={this.messageFocused.bind(this)} onEndEditing={this.messageEndEditing.bind(this)} onChangeText={this.messageChange.bind(this)} value={this.state.message} multiline={true} maxLength={1000} />
                </Item>
              </Form>
            </CardItem>
            <CardItem bordered={true} style={styles.cardItemStyle}>
              <Button onPress={() => this.onSendPressed()} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>{strings.sendit}</Text>
              </Button>
            </CardItem>

            <CardItem bordered={true} style={styles.cardFooterStyle}>
              <View style={styles.footerItemStyle}>
                <Icon name="mail" type="Foundation" style={styles.footerTextStyle} />
                <Text style={styles.footerTextStyle}> support@earnpip.com </Text>
              </View>
              <View style={styles.footerItemStyle}>
                <Icon name="web" type="Foundation" style={styles.footerTextStyle} />
                <Text style={styles.footerTextStyle}> {strings.website} </Text>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapState = state => ({
  // currentLanguage: state.auth.preferredLanguage,
  user:state.auth
});
export default connect(mapState)(ContactScreen);
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: mainTheme.mainColor,
    color: mainTheme.headerTextColor,
  },
  drawerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    color: mainTheme.drawerIconColor,
    paddingLeft: config.deviceWidth * 0.02,
    paddingRight: config.deviceWidth * 0.02
  },
  headerText: {
    marginLeft: config.deviceWidth * 0.02,
    fontSize: config.deviceWidth * 0.05,
    fontWeight: '500',
    color: mainTheme.tabHeading
  },
  cardItemStyle: {
    borderColor: mainTheme.mainColor,
    backgroundColor: mainTheme.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
    color: mainTheme.contactScreenTextColor
  },
  cardItemTextStyle: {
    color: mainTheme.contactScreenTextColor,
    flex: 1,
    textAlign: 'left',
    fontSize: config.deviceWidth * 0.04,
    fontWeight: '600'
  },
  inputStyle: {
    color: mainTheme.contactScreenTextColor
  },
  footerItemStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  cardFooterStyle: {
    borderColor: mainTheme.mainColor,
    backgroundColor: mainTheme.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  footerTextStyle: {
    color: mainTheme.contactScreenTextColor
  },
  buttonText: {
    color: mainTheme.contactScreenTextColor,
    fontSize: config.deviceWidth * 0.04,
    fontWeight: 'bold'
  },
  buttonStyle: {
    backgroundColor: mainTheme.contactScreenButtonColor,
    borderRadius: 5
  },
  contentStyle: {
    paddingTop: config.deviceHeight * 0.02,
    paddingLeft: config.deviceWidth * 0.02,
    paddingRight: config.deviceWidth * 0.02,
    backgroundColor: mainTheme.mainColor
  },
  cardStyle: {
    backgroundColor: mainTheme.mainColor,
    borderColor: mainTheme.mainColor,
  },
  languageLabelStyle: {
    textAlign: 'center',
    paddingVertical: config.deviceHeight * 0.02,
    color: mainTheme.contactScreenTextColor,
    fontSize: config.deviceWidth * 0.04
  },
  chevronStyle: {
    fontSize: config.deviceWidth * 0.08,
    color: mainTheme.contactScreenTextColor,

  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});