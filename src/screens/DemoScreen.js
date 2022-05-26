import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Left,
  Icon,
  CardItem,
} from 'native-base';
import strings from '../global/messages';
import moment from 'moment'
import config from '../global/config';
import AsyncStorage from '@react-native-community/async-storage';
import CacheStore from '../global/cacheStore'
import DemoListItem from '../components/DemoListItem';
import ProgressBar from '../components/ProgressBar';
import * as callers from '../global/call';
import { mainTheme } from '../core/theme';
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import {AuthService} from '../services/AuthService';
// import { EventRegister } from 'react-native-event-listeners';

class DemoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      loading: true,
      page: 1,
      loadingMore: false,
      refreshing: false,
      isListEnd: false,
      gmt: '',
      disabed: false,
      noData:false,
      startDate: "",
      endDate: "",
      currentBalance: "",
      totalPips: 0.00,
      totalProfit: 0.00,
      initialBalance: 0.00,
      pickerItems:[],
      selectedPickerItem:null,
      selectedDropdownItem:null,
      autoChangeTriggered:true,
    };
  }


  async componentDidMount() {
  //   let self=this;
  //   this.listener = EventRegister.addEventListener('closeSignalReceived', async (data) => {
  //     console.log("close signal received",self.state.selectedPickerItem.name);
  //     if(data==self.state.selectedPickerItem.name){
  //       await self.setState({
  //         isListEnd:false,
  //         loading:true,
  //       },async function() { await this.changeDemoPortfolio() });
  //     }
  // })
    // await AsyncStorage.removeItem('demoObject');
    let portfolioResponse = await callers.signalApi.get(`GetPortfolios`);
    let portfolios=portfolioResponse.data;
    this.setState({
      pickerItems: portfolios,
      selectedDropdownItem:portfolios[0].apiMethod,
      selectedPickerItem:portfolios[0]
    },async () => {
      let demoObject = await AsyncStorage.getItem('demoObject');
      demoObject = JSON.parse(demoObject);
      if (demoObject === null) {
        await this.startDemo();
      }
      else {
        try {
          await this.restoreValues(demoObject);
        } 
        catch (error) {
          // Error retrieving data
          console.log(error);
          Alert.alert(strings.error,strings.unknownError);
        }
      }
  });
  }
  componentWillUnmount() {
    console.log("Demo Component Unmounting ")
    // EventRegister.removeEventListener(this.listener)
}
  async onDropDownValueChange(value) {
    let selectedPickerItem=this.state.pickerItems.filter(item => item.apiMethod===value)[0];
    await this.setState({
      selectedDropdownItem: value,
      selectedPickerItem:selectedPickerItem,
      isListEnd:false,
      loading:true,
      noData: false
    },async function() { await this.changeDemoPortfolio() });
  }
  async changeDemoPortfolio(){
    if(this.state.autoChangeTriggered)
    return;
    await this._handleRefresh();
    await this.getDemoBalance(this.state.startDate,this.state.endDate);
  }
  async startDemo() {
    await this.setStartAndFinishDates();
  }
  async setStartAndFinishDates() {
    let tradingZoneResponse = await callers.signalApi.get(`GetTradingZone`);
    let freeTrialPeriodResponse=await callers.signalApi.get('GetFreeTrialPeriod');
    let freeTrialPeriod=freeTrialPeriodResponse.data;
    console.log("Free Trial",freeTrialPeriod);
    let tradingZone = tradingZoneResponse.data;
    var startDate = moment(new Date()).utcOffset(tradingZone * 60).format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment(startDate).add(freeTrialPeriod,'days').format('YYYY-MM-DD HH:mm:ss');
    var extendedEndDate=await this.getExtendedEndDate();
    console.log("Extended Date",extendedEndDate);
    if(extendedEndDate!=null)
    {
      endDate=extendedEndDate;
    }
    console.log("End Date",endDate);
    this.setState({
      gmt: tradingZone,
      startDate: startDate,
      endDate: endDate
    },async ()=>{
      await this.fetchValues(this.state.startDate, this.state.endDate);
      this.showCustomerInformative();
    });
  }
  async fetchValues(startDate, endDate) {
    try {
      const demoObject = {
        startDate: startDate,
      };
      console.log("Setting state EndDate",endDate)
      this.setState({
        startDate: startDate,
        endDate:endDate
      },async ()=>{
        await this.saveItemToAsyncStorage(demoObject);
        await this.getSignals();
        await this.getDemoBalance(startDate,endDate);
        this.setState({autoChangeTriggered:false});
        let tradingZoneResponse = await callers.signalApi.get(`GetTradingZone`);
        let tradingZone = tradingZoneResponse.data;
        this.setState({
          gmt: tradingZone,
        })
      });

    }
    catch (error) {
      console.log(error);
      Alert.alert(strings.error,strings.unknownError);
    }
  };

  async restoreValues(demoObject) {
    let freeTrialPeriodResponse=await callers.signalApi.get('GetFreeTrialPeriod');
    freeTrialPeriod=freeTrialPeriodResponse.data;
    console.log("Free Trial",freeTrialPeriod);
    var endDate = moment(demoObject.startDate).add(freeTrialPeriod,'days').format('YYYY-MM-DD HH:mm:ss');
    console.log("Restore End Date",endDate);

    var extendedEndDate=await this.getExtendedEndDate();
    console.log("Extended Date",extendedEndDate);
    if(extendedEndDate !=null )
    {
      endDate=moment(extendedEndDate).utc().format('YYYY-MM-DD HH:mm:ss');
    }

    await this.fetchValues(demoObject.startDate, endDate);
  }

  async saveItemToAsyncStorage(demo) {
    try {
      await AsyncStorage.setItem('demoObject', JSON.stringify(demo));
    } 
    catch (error) {
      console.log(error);
      Alert.alert(strings.error,strings.unknownError);
    }
  }
  renderItem = item => <DemoListItem flatListItem={item} />;
  getSignals = async () => {
    if (this.state.isListEnd || this.state.loadingMore) {
      return;
    }
    try {
      console.log("start",this.state.startDate);
      console.log("selectedDropdownItem",this.state.selectedDropdownItem);
      let response = await callers.signalApi.get(this.state.selectedDropdownItem, {
        params: {
          start: this.state.startDate,
          finish:this.state.endDate,
          page: this.state.page,
          numberOfItems: 100
        }
      });
      if (response.data.length > 0) {
        this.setState({
          content: [...this.state.content, ...response.data],
          loading: false,
          loadingMore: false,
          refreshing: false,
          noData: false
        });
      }
      else {
        this.setState({
          isListEnd: true,
          loading: false,
        });
        if(this.state.page===1){
          this.setState({
            noData: true
          });
        }
      }
    }
    catch (error) {
      this.setState({
        content: [],
        loading: false,
        loadingMore: false,
        refreshing: false,
      });
      console.log(error);
      Alert.alert(strings.error,strings.unknownError);
    }
  };
  loadMore = () => {
    if (this.state.loadingMore || this.state.isListEnd) {
      return;
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      async () => {
        await this.getSignals();
      },
    );
    this.onEndReachedCalledDuringMomentum = true;
  };
  _handleRefresh = async () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        content:[],
        isListEnd:false
      },
      async () => {
        await this.getSignals();
      },
    );
  };
  showCustomerInformative() {
    Alert.alert(strings.information,strings.demoScreenWarning,
      [{ text: `${strings.okey}`, onPress: () => {} }],
      { cancelable: false },
    );
  }
  renderHeader = () => {
    return (
      <View style={styles.headerViewStyle}>
          <CardItem style={styles.cardItemStyle}>
          <Text style={styles.textCommonStyle}>
            {strings.pair}
          </Text>
          <Text style={styles.textCommonStyle}>
            {strings.order}
          </Text>
          <Text style={styles.textCommonStyle}>
            {strings.pl}
          </Text>
          <Text style={styles.textCommonStyle}>
            {strings.closed}
          </Text>
        </CardItem>
      </View>
    );
  };
  renderFooter = () => {
    if (this.state.loadingMore || this.state.isListEnd) return null;
    return (
      <View
        style={styles.footerStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  getExtendedEndDate=async ()=>{
    let cr=await AuthService.getCurrentUser();
    let userBasedPeriodResponse = await callers.signalApi.get(`GetUserBasedPeriod`, {
      params: {
        email:cr.email
      }
    });
    let extendedUntil=userBasedPeriodResponse.data;
    if(!extendedUntil)
    {
      return null;
    }
    let extraTimeUtc=moment.utc(extendedUntil).format();
    endDate=extraTimeUtc;
    return endDate;
  }
  getDemoBalance = async (startDate,endDate) =>{
    let demoBalanceResponse = await callers.signalApi.get(`GetDemoBalance`, {
      params: {
        start: startDate,
        finish: endDate,
        signalType:this.state.selectedPickerItem.signalType
      }
    });

    let demoBalance = demoBalanceResponse.data;
    this.setState({
      initialBalance: demoBalance.initialBalance,
      currentBalance: demoBalance.currentBalance,
      totalPips: demoBalance.totalpips,
      totalProfit: demoBalance.totalprofit
    });
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <React.Fragment>
        <View style={styles.container}>
        <Header
          style={styles.headerStyle}
          iosBarStyle="light-content"
          androidStatusBarColor={mainTheme.mainColor}>
           <Left style={styles.drawerStyle}>
           <Icon style={styles.iconStyle} type="MaterialIcons" onPress={() => this.props.navigation.openDrawer()} name="menu" />
           <Text style={styles.headerText}>{strings.demo}</Text>
          </Left>
        </Header>
        <View
          style={styles.contentStyle}>
          <RNPickerSelect
            placeholder={{}}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: config.deviceHeight * 0.02,
                right:config.deviceWidth * 0.02,
              },
            }}
              itemStyle={{ backgroundColor: "red", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
              items={this.state.pickerItems.map((item, index) => 
                      {
                      return {value:item.apiMethod,label:item.name}
                })}
            value={this.state.selectedDropdownItem}
            useNativeAndroidPickerStyle={false}
            InputAccessoryView={() => null}
            onValueChange={this.onDropDownValueChange.bind(this)}
            Icon={() => {
              return <View><Icon type="Entypo" style={styles.chevronStyle} name="chevron-down" /></View>
            }}

            />


          <Text style={{ fontSize: config.deviceWidth * 0.04, marginLeft: config.deviceWidth * 0.01,color:mainTheme.demoScreenHeaderColor}}>
            {''}
            {strings.futureTesting}{' '}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.02 }]}>
              {' '}
              {strings.start}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.02,flex:1 }]}>
              {' '}
              {this.state.startDate}{' '}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01 }]}>
              {' '}
              {strings.finish}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01,flex:1 }]}>
              {' '}
              {this.state.endDate}{' '}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.02 }]}>
              {' '}
              {strings.initialBalance}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.02,flex:1 }]}>
              {' '}
              ${this.state.initialBalance}{' '}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01 }]}>
              {' '}
              {strings.currentBalance}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01,flex:1 }]}>
              {' '}
              ${this.state.currentBalance}{' '}
            </Text>
          </View>

          {/* <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.labelStyle,{marginTop: config.deviceWidth * 0.04 }]}>
              {' '}
              {strings.gainPips}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceWidth * 0.04,flex:1}]}>
              {' '}
              {this.state.totalPips}{' '}
            </Text>
          </View> */}
          <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01 }]}>
              {' '}
              {strings.profitRatio}:{' '}
            </Text>
            <Text style={[styles.labelStyle,{marginTop: config.deviceHeight * 0.01,flex:1}]}>
              {' '}
              {this.state.totalProfit}{' %'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: config.deviceHeight * 0.01}}>
            <Text style={{color:'white'}}>
              {' '}
              {strings.tradingTimeZone} {Math.sign(this.state.gmt)===1?'+':'-'} {this.state.gmt}
            </Text>            
          </View>
          </View>

      {!this.state.loading && !this.state.noData ? (
           <View  style={styles.flatListView}>
            <FlatList style={styles.flatList}
              ListFooterComponent={this.renderFooter()}
              ListHeaderComponent={this.renderHeader()}
              data={this.state.content}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.5}
              initialNumToRender={20}
              stickyHeaderIndices={[0]}
              extraData={this.props.currentLanguage}
            />
          </View>
          ) : (this.state.noData?
         <View style={[styles.container,{justifyContent:'center',alignItems:'center',backgroundColor:mainTheme.mainColor}]}>
         <Text style={{color:mainTheme.demoSignalItemColor,textAlign:'center'}}>{strings.noSignal}</Text>   
        </View>
          :
      <ProgressBar />
          )
          }
          </View>
      </React.Fragment>
    );
  }
}
const mapState = state => ({
	currentLanguage: state.auth.preferredLanguage,
});
export default connect(mapState)(DemoScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  flatListView:{
     flex: 1,
  },
  flatList:{
    backgroundColor:mainTheme.mainColor
  },
  baseContainer:{
    paddingBottom:0,
    marginBottom:0,
  },
  headerViewStyle:{
    backgroundColor: mainTheme.mainColor, 
    paddingLeft:0,
    paddingRight:0,
    paddingBottom:0,
    paddingTop:0
  },
  cardItemStyle:{
    backgroundColor: mainTheme.mainColor, 
    borderColor:'black', 
    flexDirection: 'row',
    padding:0,
    borderRadius:0
  },
  textCommonStyle:{
    color: mainTheme.liveSignalHeaderTextColor,
    flex: 1,
    fontSize: config.deviceWidth*0.04,
    fontWeight: '600',
  },
  footerStyle:{
    paddingVertical: config.deviceHeight*0.04,
    borderColor: mainTheme.mainColor,
    backgroundColor: mainTheme.mainColor,
  },
  headerStyle:{
    backgroundColor: mainTheme.mainColor,
    color: mainTheme.headerTextColor,
},
drawerStyle:{
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center'
},
iconStyle :{
  color: mainTheme.drawerIconColor,
  paddingLeft:config.deviceWidth *0.02,
  paddingRight:config.deviceWidth *0.02
},
headerText: {
  marginLeft: config.deviceHeight * 0.02,
  fontSize: config.deviceWidth * 0.05,
  fontWeight:'500',
  color:mainTheme.tabHeading
},
contentStyle:{
  paddingTop: 0,
  marginTop: 0,
  paddingLeft: config.deviceWidth * 0.02,
  paddingRight: config.deviceWidth * 0.02,
  backgroundColor: mainTheme.mainColor,
  flex:1,
  color:"red"
},
labelStyle:{
  marginTop: config.deviceHeight * 0.02,
  fontWeight: 'bold',
  color: mainTheme.demoLabelColor,
  textAlign:'right'
},
demoGmtLabelStyle:{
  fontSize: config.deviceHeight * 0.02,
  fontStyle: 'italic',
  marginTop: config.deviceWidth * 0.02,
  color: mainTheme.demoGmtLabelStyle, 
},
chevronStyle: {
  fontSize: config.deviceWidth * 0.08,
  color: mainTheme.settingsScreenLanguageColor,
},
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: config.deviceWidth * 0.05,
    paddingVertical: config.deviceHeight * 0.02,
    paddingHorizontal: config.deviceWidth * 0.02,
    borderWidth: 1,
    backgroundColor: mainTheme.backgroundColor,
    borderColor: mainTheme.backgroundColor,
    borderRadius: 4,
    color: mainTheme.settingsScreenLanguageColor,
    paddingRight: config.deviceWidth * 0.08, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: config.deviceWidth * 0.05,
    paddingHorizontal: config.deviceWidth * 0.02,
    paddingVertical: config.deviceHeight * 0.02,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: mainTheme.backgroundColor,
    borderColor: mainTheme.backgroundColor,
    borderRadius: 8,
    color: mainTheme.settingsScreenLanguageColor,
    paddingRight: config.deviceWidth * 0.08, // to ensure the text is never behind the icon,
    backgroundColor:'#666565'
  },
});