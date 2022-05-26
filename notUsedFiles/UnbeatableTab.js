import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview'

import { Content ,Card,CardItem, Icon, Container} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import HTMLView from 'react-native-htmlview';

 
export default class UnbeatableTab extends Component {

  state={
      text:{ing:""}
  }
       
   
    render(){
        if(Platform.OS == "ios"){
        return( 
           <WebView scalesPageToFit={false} style={{padding:5}} allo originWhitelist={['*']} source={{ uri:"http://173.212.202.231/unbeatabletext.php"}} />
        )
        }
        else {
            return(
                <WebView  style={{padding:5}} allo originWhitelist={['*']} source={{ uri:"http://173.212.202.231/unbeatabletext.php"}} />
            )

        }
    }   

}
 