import React, {Component} from 'react';
import {Platform, StyleSheet, View,StatusBar} from 'react-native';
import { Container, Header,Text, Button,Switch,Left, Item, Icon, Body, Right,Label,Input, Card,CardItem,Content, Form,Toast } from 'native-base';
import strings from '../src/global/messages'

export default class MemberShipScreen extends Component {
    state={
      mail:"",
      mailcolor:"gray",
      name:"",
      namecolor:"gray",
      surname:"",
      surnamecolor:"gray",
      country:"",
      countrycolor:"gray",
      broker:"",
      brokercolor:'gray',
      text:{ing:""}
     }
       
    componentDidMount(){
          
      fetch('http://173.212.202.231/getmembershiptext.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          text:responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    mailChange(text){
      this.setState({mail:text}) 
      this.setState({mailcolor:"#3498db"})
    }
    mailEndEditing(){
      if(this.state.mail==""){
        this.setState({mailcolor:"gray"})
      }
    }
    mailFocuesed(){
      this.setState({mailcolor:"#3498db"})

    }

    nameChange(text){
      this.setState({name:text}) 
      this.setState({namecolor:"#3498db"})
    }
    nameEndEditing(){
      if(this.state.name==""){
        this.setState({namecolor:"gray"})
      }
    }
    nameFocuesed(){
      this.setState({namecolor:"#3498db"})
    }

    surnameChange(text){
        this.setState({surname:text}) 
        this.setState({surnamecolor:"#3498db"})
      }
    surnameEndEditing(){
        if(this.state.surname==""){
          this.setState({surnamecolor:"gray"})
        }
      }
      surnameFocuesed(){
        this.setState({surnamecolor:"#3498db"})
      }
  
      countryChange(text){
        this.setState({country:text}) 
        this.setState({countrycolor:"#3498db"})
      }
      countryEndEditing(){
        if(this.state.country==""){
          this.setState({countrycolor:"gray"})
        }
      }
      countryFocuesed(){
        this.setState({countrycolor:"#3498db"})
      }
      
      brokerChange(text){
        this.setState({broker:text}) 
        this.setState({brokercolor:"#3498db"})
      }
      brokerEndEditing(){
        if(this.state.broker==""){
          this.setState({brokercolor:"gray"})
        }
      }
      brokerFocuesed(){
        this.setState({brokercolor:"#3498db"})
      }
      
      onRegisterPress(){
      console.log("üyeli");
      if(this.state.mail == "" || this.state.broker == "" || this.state.name == "" || this.state.country == "") { 
        Toast.show({
          text: "Please fill all blank areas!",
          buttonText: "Okay",
          duration:5000,
          type: "warning"
        })
      }
      else{
     
        Toast.show({
          text: "Registration Completed.Please confirm your mail adress",
          buttonText: "Okay",
          duration:5000,
          type: "success"
        })
    
        fetch('http://173.212.202.231/register.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: this.state.mail,
            name: this.state.name,
            country: this.state.country,
            exbroker: this.state.broker
          }),
        }) 
        .then((response) => response.text())
        .then((responseJson) => {
          console.log(responseJson)
        });
      }
    }


      render() {
        StatusBar.setBarStyle('light-content', true);
      return (
        <Container>

        <Header style={{backgroundColor:'#1E252B'}} iosBarStyle="light-content" androidStatusBarColor="#191E22" >
             <Left style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                     <Icon style={{paddingLeft:5,paddingRight:5, color:'white'}} onPress={()=> this.props.navigation.openDrawer()} name="md-menu" />
                     <Text style={{marginLeft:20,fontSize:20, color:'white',fontWeight:'500'}}>{strings.freemembership}</Text>
             </Left>
           
        </Header> 
        <Content style={{paddingTop:10,paddingLeft:10,paddingRight:10, backgroundColor:'#1c2127'}}>

           <Card style={{backgroundColor:'#1E252B',borderColor:'#1c2127'}}>
          <CardItem  bordered={true}  style={{flexDirection:'row', borderColor:'black',  backgroundColor:'#2a3139'}}>
                  <Text style={{color:'#FFF',flex:1,textAlign:'left',fontSize:16,fontWeight:'600'}} >{strings.becomeMemberForFree}</Text>
          </CardItem>
          <CardItem    style={{ flexDirection:'row',  backgroundColor:'#1E252B'}}>
                  <Form style={{marginLeft:-20,flex:1}}>
                      <Item >
                      <Input placeholder={strings.nameSurname}  style={{color:'white'}} onFocus={this.nameFocuesed.bind(this)} onEndEditing={this.nameEndEditing.bind(this)} onChangeText={this.nameChange.bind(this)} value={this.state.name} />
                       </Item >                
                       <Item  >
                      <Input placeholder={strings.email} autoCapitalize="none" style={{color:'white'}} onFocus={this.mailFocuesed.bind(this)} onEndEditing={this.mailEndEditing.bind(this)} onChangeText={this.mailChange.bind(this)} value={this.state.mail} />
                       </Item>
                       <Item  >

                      <Input placeholder={strings.country} style={{color:'white'}} onFocus={this.countryFocuesed.bind(this)} onEndEditing={this.countryEndEditing.bind(this)} onChangeText={this.countryChange.bind(this)} value={this.state.country} />
                       </Item>
                       <Item >
                      <Input  placeholder={strings.exbroker} style={{color:'white'}} onFocus={this.brokerFocuesed.bind(this)} onEndEditing={this.brokerEndEditing.bind(this)} onChangeText={this.brokerChange.bind(this)} value={this.state.broker} />
                       </Item>

                </Form>
             
          </CardItem>
          <CardItem   bordered={true}   style={{ borderColor:'black', flexDirection:'row',  backgroundColor:'#1E252B'}}>

          <Button  onPress={()=> this.onRegisterPress()} style={{backgroundColor:'#3498db',borderRadius:5}}>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{strings.register}</Text>
                  </Button>
          </CardItem>
        
          </Card>

          <Card style={{backgroundColor:'#1E252B',borderColor:'#1c2127',marginBottom:30}}>
            <CardItem   bordered={true}   style={{ borderColor:'black', flexDirection:'row',  backgroundColor:'#1E252B'}}>
            <Text style={{color:'white',fontSize:14}}>{this.state.text.ing}
                        </Text>
            </CardItem>
        </Card>             

 
        </Content>
        </Container>


      );
    }
  }