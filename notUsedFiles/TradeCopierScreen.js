import React, {Component} from 'react';
import {Platform, StyleSheet, View,StatusBar} from 'react-native';
import {WebView} from 'react-native-webview'

import { Container, Header,Text, Button,Switch,Left, Item, Icon, Body, Right,Label,Input, Card,CardItem,Content, Form } from 'native-base';
import strings from '../src/global/messages'

export default class TradeCopierScreen extends Component {
    state={ 
      text:{ing:""}
    }
    
    renderWebview(){
      if(Platform.OS == "ios"){
        return(
          <WebView scalesPageToFit={false} originWhitelist={['*']}  source={{ uri:"http://173.212.202.231/tradecopiertext.php" }} />

        )
      }
      return(
        <WebView originWhitelist={['*']}  source={{ uri:"http://173.212.202.231/tradecopiertext.php" }} />

      )

    }
      render() {
        StatusBar.setBarStyle('light-content', true);
      return (
        <Container>

        <Header style={{backgroundColor:'#1E252B'}} iosBarStyle="light-content" androidStatusBarColor="#191E22" >
             <Left style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                     <Icon style={{paddingLeft:5,paddingRight:5, color:'white'}} onPress={()=> this.props.navigation.openDrawer()} name="md-menu" />
                     <Text style={{marginLeft:20,fontSize:20, color:'white',fontWeight:'500'}}>{strings.tradecopier}</Text>
             </Left>
           
        </Header> 
        {this.renderWebview()}
        </Container>


      );
    }
  }