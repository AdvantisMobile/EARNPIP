import React, {Component} from 'react';
import {WebView} from 'react-native-webview'
import {Alert } from "react-native";

import { Spinner} from 'native-base';
import * as callers from '../global/call';
import strings from '../global/messages';

export default class VerificationTab extends Component {
   loadFinished() {
    this.setState({loaded:true});  
  } 
  state={
    loaded:false
  }
  async componentDidMount(){
    try{
      let response = await callers.signalApi.get(`GetForexAccountUrl`);
      this.setState({
        records:response.data,
        loaded:true
      });
    }
    catch(error){
      console.error(error);
      Alert.alert(strings.error,strings.unknownError);
    };
    
    }    
    render() {

      if(this.state.loaded== false){
        return(
          <Spinner />
        )
      }
         return ( 
            <WebView  originWhitelist={['*']} scalesPageToFit={false
            } source={{uri:this.state.records}} style={{flex:1}} />           
      );
    }

  }