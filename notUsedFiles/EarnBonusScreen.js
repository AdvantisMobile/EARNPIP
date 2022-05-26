import React, {Component} from 'react';
import {Platform,StatusBar} from 'react-native';
import { Container, Header,Text ,Left, Icon } from 'native-base';
import strings from '../src/global/messages';
import {WebView} from 'react-native-webview'


export default class EarnBonusScreen extends Component {
    state={
      text:{ing:""}
    }
      
  renderWebView(){
    if(Platform.OS == "ios"){
      return(
        <WebView scalesPageToFit={false} originWhitelist={['*']}    source={{ uri : "http://173.212.202.231/bonustext.php"}} />

      )
    }
    return(
      <WebView originWhitelist={['*']}    source={{ uri : "http://173.212.202.231/bonustext.php"}} />

    )
  }
      render() {
        StatusBar.setBarStyle('light-content', true);
      return (
        <Container>

        <Header style={{backgroundColor:'#1E252B'}} iosBarStyle="light-content" androidStatusBarColor="#191E22" >
            <Left style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                     <Icon style={{paddingLeft:5,paddingRight:5, color:'white'}} onPress={()=> this.props.navigation.openDrawer()} name="md-menu" />
                     <Text style={{marginLeft:20,fontSize:20, color:'white',fontWeight:'500'}}>{strings.earnBonus}</Text>
             </Left>
           
        </Header> 
        {this.renderWebView()}
        </Container>


      );
    }
  }