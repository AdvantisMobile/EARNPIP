import React, {Component} from 'react';
import {Modal, Alert,DatePickerIOS, DatePickerAndroid,AsyncStorage,Platform, StyleSheet, Text, View,StatusBar} from 'react-native';
import { Container,Accordion, Header, Button,Left, Item, Icon, Body, Right, Card,CardItem,Content } from 'native-base';

import strings from '../src/global/messages'

export default class DemoScreen extends Component {
    state={
      alert:false,
      gmt:"",
      disabled:true,
      choosingStartDate:false,
      choosingFinishdate:false,
      chosenDate: new Date(),
      chosenFinishDate: new Date() 
    }
      renderHeader(content,expanded){
          buy = true;
          if(content.signal_order =="SELL"){
            buy = false;
          }
        return( 
          <CardItem activeOpacity={1}  bordered={true} style={{flexDirection:'column', borderColor:'black',  backgroundColor:'#1E252B',}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{flex:1 ,color:'gray',fontWeight:'bold'}} >{content.pair}</Text>
          { buy ? <Text style={{flex:1,fontWeight:'500',textAlign:'center',color:'#4cd137'}} >{strings.buy}</Text> : <Text style={{flex:1,fontWeight:'500',textAlign:'center',color:'#d63031'}} >{strings.sell}</Text> }
          <Text style={{flex:1,color:'gray',fontWeight:'bold',textAlign:'center'}} >{content.pl}</Text>
          <View style={{ flex:2,flexDirection:'row'}}>
            <Text style={{color:'gray',flex:1,textAlign:'right',marginRight:-15}}>{content.cprice}</Text>
            {expanded ? <Icon type="Entypo" style={{fontSize:16,color:'white',textAlign:'right'}} name="chevron-down" /> : <Icon type="Entypo" style={{fontSize:16,color:'gray',textAlign:'right'}} name="chevron-right" /> }
              </View>
          </View>
        </CardItem>
        )
      }
  
      renderContent(content,expanded){
        console.log(content)
        return(
          <CardItem bordered={true} style={{flexDirection:'column',borderColor:'black',  backgroundColor:'#1E252B'}}> 
     
          <View style={{flexDirection:'row',marginTop:10}}>  
              <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>{strings.openedtime}</Text>
              <Text style={{color:'white',flex:1,fontSize:16,textAlign:'right'}}>{content.posted_on}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
              <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>{strings.closedtime}</Text>
              <Text style={{color:'white',flex:1,fontSize:16,textAlign:'right'}}>{content.closed_time}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
              <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>{strings.openprice}</Text>
              <Text style={{color:'white',flex:1,fontSize:16,textAlign:'right'}}>{content.open_price}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
              <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>{strings.takeprofit}</Text>
              { 
                content.cprice === content.take_profit ? 
                <View style={{borderRadius:5,backgroundColor:'#1AACEB'}}>
                <Text style={{color:'white',flex:1,fontSize:16,textAlign:'center',marginLeft:3,marginRight:3}}>{content.take_profit}</Text>
               </View>
                 :
               <View style={{borderRadius:5}}>
               <Text style={{color:'white',flex:1,fontSize:16,textAlign:'center',marginLeft:3,marginRight:3}}>{content.take_profit}</Text>
              </View>
              }
          
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
             <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>{strings.stoploss}</Text>
              { 
                content.cprice === content.stop_loss ? 
                <View style={{borderRadius:5,backgroundColor:'#e74c3c'}}>
                <Text style={{color:'white',flex:1,fontSize:16,textAlign:'center',marginLeft:3,marginRight:3}}>{content.stop_loss}</Text>
               </View>
                 :
               <View style={{borderRadius:5}}>
               <Text style={{color:'white',flex:1,fontSize:16,textAlign:'center',marginLeft:3,marginRight:3}}>{content.stop_loss}</Text>
              </View>
              }
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
            <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>Trade size (lot)</Text>
              <Text style={{color:'white',flex:1,fontSize:16,textAlign:'right'}}>{content.lots}</Text>          
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>  
            <Text style={{color:'white',flex:1,fontSize:16,fontWeight:'bold',textAlign:'left'}}>Profit/Loss ($)</Text>
              <Text style={{color:'white',flex:1,fontSize:16,textAlign:'right'}}>{content.profit}</Text>          
          </View>
         
  
      </CardItem>
        )
      }


    async componentDidMount(){


          fetch('http://173.212.202.231/getgmt.php')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              gmt:responseJson.gmt,
            });
          })
          .catch((error) => {
            console.error(error);
          });
          console.log("did mount");
          try {
            const value = await AsyncStorage.getItem('demo');
            if (value !== null) {
              // We have data!!
              console.log(value);
              demoObject =JSON.parse(value);
              initalDep = "$" + demoObject.initialDep
              this.setState({
                startDate:demoObject.startDate,
                finishDate:demoObject.finishDate,
                initalDep,
                expand:demoObject.expand,
                startDateForSever:demoObject.startForServer,
                servertime:demoObject.serverTime,
              })

              var today = new Date();     
              dayNow = ("0" + today.getDate()).slice(-2);
              monthNow = ("0" + (today.getMonth() + 1)).slice(-2);
              yearNow = today.getFullYear();

              today = yearNow.toString() + monthNow.toString() + dayNow.toString()
              day =  ("0" + demoObject.day).slice(-2); 
              month = ("0" + (demoObject.month + 1)).slice(-2); 
              year = demoObject.year

              finishDate = year.toString() + month.toString() + day.toString()
              if(parseInt(today) > parseInt(finishDate)){
                this.setState({disabled:false})
                console.log("false");
                console.log("start demo aktif")
                console.log(today)
                console.log(finishDate)
              }
              else{
                this.setState({disabled:true})
                console.log("kapali olması lazim")
                console.log("true");

              }
              console.log(demoObject)

              this.restoreValues(demoObject.startForServer +demoObject.serverTime ,demoObject.finishDateForSever+demoObject.serverTime,parseFloat(demoObject.initialDep),demoObject.serverTime)
            }
            else{
              console.log("value bulunamadı")
              this.setState({disabled:false})
            }
            console.log("null")
           } catch (error) {
             // Error retrieving data
             console.log("error while retrieving data")
           }
    }

    restoreValues(start,finish,initalDep,expand){
        console.log("restoring values");
        console.log(start)
        console.log(finish)
        console.log(initalDep)
          fetch('http://173.212.202.231/getdemosignals.php',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              start: start,
              finish:finish,
              expand
            }),
          }) 
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            closedSignals = responseJson
            totalpips = 0;
            totalprofit = 0;
            for (item in closedSignals) {
                totalpips +=  parseFloat(closedSignals[item].pl)
                totalprofit +=  parseFloat(closedSignals[item].profit)
                console.log(totalpips)
                console.log(totalprofit)

            }
            totalpips =  (totalpips/10),
            currentBalance = (totalprofit + initalDep);
            console.log(currentBalance)
            currentBalance = currentBalance.toFixed(2);
            totalprofit = (totalprofit / initalDep ) * 100

            totalprofit =  totalprofit.toFixed(2) + " %"
            this.setState({
            content:responseJson,
            totalpips,
            totalprofit,
            currentBalance
            });
            this.setState({
              currentBal: "$" + this.state.currentBalance,
              sTotalPips:this.state.totalpips,
              sTotalProfit:this.state.totalprofit,
            })
        })
        .catch((error) => {
          console.error(error);
        });

    }

    async saveItemToAsyncStorage(demo){
      console.log("saving");
        try {
          await AsyncStorage.setItem("demo", JSON.stringify(demo));
          } 
        catch (error) {
          console.log("error while retrieving data")
        }
    }
        
   
  async fetchValues(start,finish){
        that = this;
        console.log("fetch values")
        console.log( this.state.startDateForSever + this.state.servertime)
        console.log(this.state.finishDateForSever +this.state.servertime)
        fetch('http://173.212.202.231/getcurrentbalance.php')
        .then((responsex) => responsex.json())
        .then((responseJsonx) => {
          
          this.setState({
            fetchedInitialDep:parseFloat(responseJsonx.balance).toFixed(2),
            initalDep: "$" +parseFloat(responseJsonx.balance).toFixed(2),
          });

          fetch('http://173.212.202.231/getdemosignals.php',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              start: this.state.startDateForSever + this.state.servertime,
              finish:this.state.finishDateForSever +this.state.servertime ,
            }),
          }) 
        .then((response) => response.json())
        .then((responseJson) => {
            closedSignals = responseJson
            totalpips = 0;
            totalprofit = 0;
            for (item in closedSignals) {
                totalpips +=  parseFloat(closedSignals[item].pl)
                totalprofit +=  parseFloat(closedSignals[item].profit)
                console.log(totalpips)
                console.log(totalprofit)

            }
            totalpips =  (totalpips/10),

            currentBalance = (totalprofit + parseFloat(responseJsonx.balance));
            currentBalance = currentBalance.toFixed(2);
            totalprofit = (totalprofit / parseFloat(responseJsonx.balance) ) * 100

            totalprofit =  totalprofit.toFixed(2) + " %"
            this.setState({
            content:responseJson,
            totalpips,
            totalprofit,
            currentBalance
            });
            this.setState({
              initalDep: "$" +this.state.fetchedInitialDep,
              currentBal: "$" + this.state.currentBalance,
              sTotalPips:this.state.totalpips,
              sTotalProfit:this.state.totalprofit,
            })
            const demo = { 
              "initialDep" : this.state.fetchedInitialDep,
              "startDate": start,
              "finishDate":finish,
              "expand":this.state.expand,
              "month":this.state.month,
              "day":this.state.day,
              "year":this.state.year,
              "serverTime":this.state.servertime,
              "startForServer":this.state.startDateForSever,
              "finishDateForSever":this.state.finishDateForSever,
            }
            this.saveItemToAsyncStorage(demo)

        })
        .catch((error) => {
          console.error(error);
        });
          

        })
        .catch((error) => {
          console.error(error);
        });

  }
  
   async startDemo(){

   
        Alert.alert(
            'Demo Configuration',
            'Please select a start date',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.chooseStartDate()},
            ],
            { cancelable: false }
        ) 
    }

    showAlert(){
      
        Alert.alert(
            'Info',
            'There may be open positions currently on the real trading account.They will be booked in the list below once they are closed.',
            [
              {text: 'OK', onPress: () => console.log("alert dismiss")},
            ],
            { cancelable: false }
        ) 
    }

    alertForFinishDate(){
        
        Alert.alert(
            'Demo Configuration',
            'Please select a finish date',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.chooseFinishDate()},
            ],
            { cancelable: false }
          )

        
    }

    async chooseStartDate(){
      if(Platform.OS == "ios"){
        this.setState({choosingStartDate:true})
        return
      }
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
              this.applyStartDate(day,month,year)
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    fetchServerDate(){
      fetch('http://173.212.202.231/getcurrenttime.php')
      .then((responsex) => responsex.json())
      .then((responseJsonx) => {
        this.setState({
          servertime:responseJsonx.time
        });
      });
    }

    applyStartDate(day,month,year){
      var today = new Date();
      var dateFormat = require('dateformat');

      let formatedDate = dateFormat(today, "yyyy.mm.dd HH:MM:ss");
      console.log(formatedDate)
      
      dayNow = today.getDate();
      monthNow = today.getMonth();
      yearNow = today.getFullYear();
      expand = " 00:00:00";
      //if selected date is today
      if(dayNow == day && monthNow == month && yearNow == year){
        //Get time portion of now
        expand = formatedDate.substr(10,9);
        //Set servertime state to time of server
        this.fetchServerDate()
      }
      //add one month to selected month because months 0-11
      monthF = month + 1;
      //if month =5 make it 05 and get last two character
      monthF = ("0" + monthF.toString()).slice(-2);
      dayF = ("0" + day.toString()).slice(-2);
      //Selected year selected month selected day and server time
      startDate= (year) + "." + monthF + "." +dayF + expand
      //Selected year next month  selected day
      startDateForSever = (year) + "." + monthF + "." +dayF
      this.setState({
          startDate,
          expand,
          startDateForSever
      })
      this.alertForFinishDate()
    }

    configureDemo(){
      Alert.alert(
        'Demo Configuration',
        'If you want to change finish date please click ok',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.chooseFinishDate()},
        ],
        { cancelable: false }
    ) 
    }

    renderConfigureButton(){
      if(this.state.disabled){
        return(
          <Button onPress={()=> this.configureDemo()} iconLeft style={{ height:50,marginTop:20,marginLeft:20, backgroundColor:'white'}} >
             <Icon style={{ color:'black'}}  type="FontAwesome" name="gear" />
             <Text style={{fontWeight:'bold', color:'black'}}>  Configure    </Text>
          </Button> 
        )
      }
    }
    
    renderStartButton(){
      if(!this.state.disabled){
        return(
          <Button disabled={this.state.disabled} onPress={()=> this.startDemo()} iconLeft style={{height:50,marginTop:20,marginLeft:20, backgroundColor:this.state.disabled ? "gray" : "white"}} >
                 <Icon style={{ color:'black'}}  type="Entypo" name="controller-play" />
                <Text style={{ fontWeight:'bold', color:'black'}}>  Start DEMO    </Text>
            </Button>
        )
      }
    }
    async chooseFinishDate(){
      if(Platform.OS == "ios"){
        this.setState({choosingFinishdate:true})
        return
      }
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
              monthF = month + 1;
              monthF = ("0" + monthF.toString()).slice(-2);
              dayF = ("0" + day.toString()).slice(-2);
              finishDate= (year) + "." + monthF + "." +dayF +  this.state.expand
              finishDateForSever = (year) + "." + monthF + "." +dayF 
              this.setState({
                finishDate,
                month,
                finishDateForSever,
                day,
                year,
                disabled:true
                })
              this.fetchValues(this.state.startDate,this.state.finishDate)
        
        
              this.showAlert()           
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    applyFinishDate(day,month,year){ 
      monthF = month + 1;
      monthF = ("0" + monthF.toString()).slice(-2);
      dayF = ("0" + day.toString()).slice(-2);
      finishDate= (year) + "." + monthF + "." +dayF +  this.state.expand
      finishDateForSever = (year) + "." + monthF + "." +dayF
      this.setState({
        finishDate,
        month,
        finishDateForSever,
        day,
        year,
        disabled:true
        })
      this.fetchValues(this.state.startDate,this.state.finishDate)


      this.showAlert()
    }

    filterStartDateIos(){
      this.setState({choosingStartDate:false}) 
      setTimeout(() => this.applyStartDate(this.state.chosenDate.getDate(),this.state.chosenDate.getMonth(),this.state.chosenDate.getFullYear())      , 1000)
 
    }

    openStartDatePicker(){
         return(
          <Modal visible={this.state.choosingStartDate}  transparent={false} >
          <View style={{ justifyContent:'center',flex:1,alignContent:'center'}}>
            <DatePickerIOS
            mode="date"
            style={{color:'white'}}
            date={this.state.chosenDate}
            onDateChange={this.setDate.bind(this)}
            />
            <View style={{justifyContent:'center', flexDirection:'row'}}>
              <Button onPress={ this.filterStartDateIos.bind(this) } style={{marginRight:20, height:50,width:100,backgroundColor:'#2ecc71'}}>
                <Text style={{color:'white',fontSize:16,textAlign:'center',flex:1,fontWeight:'bold'}} >Select</Text>
              </Button>
              <Button onPress={() => this.setState({choosingStartDate:false}) } style={{marginLeft:20, height:50,width:100,backgroundColor:'#e74c3c'}}>
                <Text style={{color:'white',fontSize:16, textAlign:'center',flex:1,fontWeight:'bold'}} >Cancel</Text>
              </Button>
            </View>
            </View>
          </Modal>
        )
      
    }
    setDate(newDate) {
      this.setState({chosenDate: newDate})
    }
    setFinishDate(newDate) {
      this.setState({chosenFinishDate: newDate})
    }


    filterFinishDateIos(){
      this.setState({choosingFinishdate:false}) 
      setTimeout(() => this.applyFinishDate(this.state.chosenFinishDate.getDate(),this.state.chosenFinishDate.getMonth(),this.state.chosenFinishDate.getFullYear()), 1000)
 
    }

    openFinishDatePicker(){
      return(
        <Modal visible={this.state.choosingFinishdate}  transparent={false} >
        <View style={{ justifyContent:'center',flex:1,alignContent:'center'}}>
          <DatePickerIOS
          mode="date"
          style={{color:'white'}}
          date={this.state.chosenFinishDate}
          onDateChange={this.setFinishDate.bind(this)}
          />
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <Button onPress={ this.filterFinishDateIos.bind(this) } style={{marginRight:20, height:50,width:100,backgroundColor:'#2ecc71'}}>
              <Text style={{color:'white',fontSize:16,textAlign:'center',flex:1,fontWeight:'bold'}} >Select</Text>
            </Button>
            <Button onPress={() => this.setState({choosingFinishdate:false}) } style={{marginLeft:20, height:50,width:100,backgroundColor:'#e74c3c'}}>
              <Text style={{color:'white',fontSize:16, textAlign:'center',flex:1,fontWeight:'bold'}} >Cancel</Text>
            </Button>
          </View>
          </View>
        </Modal>
      )
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
      return (
        <Container>

        <Header style={{backgroundColor:'#1E252B'}} iosBarStyle="light-content" androidStatusBarColor="#191E22" >
            <Left style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                     <Icon style={{paddingLeft:5,paddingRight:5, color:'white'}} onPress={()=> this.props.navigation.openDrawer()} name="md-menu" />
                     <Text style={{marginLeft:20,fontSize:20, color:'white',fontWeight:'500'}}>Demo</Text>
             </Left>
           
        </Header> 
        <Content style={{paddingTop:10,paddingLeft:10,paddingRight:10, backgroundColor:'#1c2127'}}>
        <Text style={{fontSize:16, color:'white'}}> Future Testing of Real Earnpip Account </Text>
        {this.openStartDatePicker()}
        {this.openFinishDatePicker()}
        <View style={{flexDirection:'row'}}>
            {
              this.renderStartButton()
            }
            {
              this.renderConfigureButton()
            }
            <Button onPress={()=> this.showAlert()} iconLeft style={{ height:50,marginTop:20,marginLeft:20, backgroundColor:'white'}} >
                <Icon style={{ color:'black'}}  type="MaterialCommunityIcons" name="information-variant" />
                <Text style={{fontWeight:'bold', color:'black'}}>  INFO    </Text>
            </Button> 
        </View>

        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> Start: </Text>
            <Text style={{flex:1,textAlign:"right", fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> {this.state.startDate} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}> Finish: </Text>
            <Text style={{flex:1,textAlign:"right",fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}> {this.state.finishDate} </Text>
        </View>


        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> Initial Balance: </Text>
            <Text style={{flex:1,textAlign:"right",fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> {this.state.initalDep} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}> Current Balance: </Text>
            <Text style={{flex:1,textAlign:"right",fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}> {this.state.currentBal} </Text>
        </View>

          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> Gain (pips): </Text>
            <Text style={{flex:1,textAlign:"right",fontSize:16,fontWeight:'bold',marginTop:20, color:'white'}}> {this.state.sTotalPips} </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}> Profit Ratio: </Text>
            <Text style={{flex:1,textAlign:"right",fontSize:16,fontWeight:'bold',marginTop:10, color:'white'}}>  {this.state.sTotalProfit} </Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10}}>

            <Text style={{fontSize:14,fontStyle:'italic',marginTop:10, color:'#bdc3c7'}}> {this.state.gmt} </Text>
        </View>


        <Card style={{backgroundColor:'#1E252B',marginTop:20,marginBottom:50,borderColor:'black'}}>

                {/*Header*/}
                <CardItem  bordered={true} style={{borderColor:'black',  backgroundColor:'#1E252B',flexDirection:'row'}}>
                    <Text style={{color:'#EC9A14',flex:1,textAlign:'left',fontSize:16,fontWeight:'600'}} >{strings.pair}</Text>
                <Text style={{color:'#EC9A14',flex:1,textAlign:'center',fontSize:16,fontWeight:'600',flex:1}} >{strings.order}</Text>
                <Text style={{color:'#EC9A14',flex:1,textAlign:'center',fontSize:16,fontWeight:'600',flex:1}} >{strings.pl}</Text>
                <Text style={{color:'#EC9A14',flex:1,textAlign:'right',fontSize:16,fontWeight:'600',flex:2}}>{strings.closed}</Text> 
                </CardItem>

                <Accordion  style={{opacity:1}}
                dataArray={this.state.content}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                />
        </Card>



        </Content>
        </Container>


      );
    }
  }