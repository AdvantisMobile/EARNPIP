import React from "react";
import { View } from "react-native";

 

export default class BlankScreen extends React.Component {

    componentDidMount(){
        this.props.navigation.goBack();
    }
 
   
    render(){  
       
     return(
      <View>
         
      </View>
    )
    }
}
  