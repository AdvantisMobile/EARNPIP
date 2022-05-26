import React, { PureComponent} from 'react';
import {
  Alert,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {CardItem} from 'native-base';
import OpenListItem from './OpenListItem';
import config from '../global/config';
import strings from '../global/messages';
import ProgressBar from './ProgressBar';
import * as callers from '../global/call';
import { mainTheme } from '../core/theme'

export default class OpenTab extends PureComponent {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      content: [],
      loading: true,
      page: 1,
      loadingMore: false,
      refreshing: false,
      isListEnd: false,
      noData:false,
      firstAccess:true,
    };
  }
  componentDidMount() {
     this.getSignals();
    this.setState({
        firstAccess: false,
      });  
    }
    componentDidUpdate(prevProps) {
      if (prevProps.selectedKey !== 0 && !this.state.firstAccess) {
        this._handleRefresh();
        console.log("Refreshing Open Tab")
      }
     }
  componentWillUnmount() {
    // this._navListener.remove();
    console.log("Open Tab Component Unmounting ")
    // EventRegister.removeEventListener(this.listener)
}
    renderItem = item => <OpenListItem flatListItem={item} />;
    ListViewItemSeparator = () => {
      return (
        //List Item separator View
        <View style={{height: 0.5, width: '100%', backgroundColor: '#fc0000'}} />
      );
    };
    getSignals = () => {
      if ((this.state.isListEnd || this.state.loadingMore) && !this.state.refreshing) {
        return;
      }
      var self = this;
      // Get contacts
      callers.signalApi
        .get(
          `GetPagedOpenSignals?numberOfItems=20&page=${this.state.page}`
        )
        .then(function(response) {
          if (response.data.length > 0) {
            self.setState({
              content: [...self.state.content, ...response.data],
              loading: false,
              loadingMore: false,
              refreshing: false,
            });
          } else {
            self.setState({
              isListEnd: true,
              loading:false,
              refreshing: false
            });
            if(self.state.page===1){
              self.setState({
                noData: true,
              });
            }
          }
        })
        .catch(function(error) {
          self.setState({
            content: [],
            loading: false,
            loadingMore: false,
            refreshing: false,
          });
          console.error(error);
          Alert.alert(strings.error,strings.unknownError);
        });
    };
    loadMore = () => {
      if (this.state.loadingMore || this.state.isListEnd) {
        return;
      }
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getSignals();
        },
      );
      this.onEndReachedCalledDuringMomentum = true;
    };
    _handleRefresh = () => {
      this.setState(
        {
          page: 1,
          refreshing: true,
          content: [],
          isListEnd:false,
          noData:false
        },
        () => {
          this.getSignals();
        },
      );
    };
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
              {strings.price}
            </Text>
            <Text style={styles.textCommonStyle}>
              {strings.pl}
            </Text>
            <Text style={{ flex:0.3}}>
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
    render() {
      if(this.state.noData){
        return (
        <View style={[styles.container,{justifyContent:'center',alignItems:'center',backgroundColor:mainTheme.mainColor}]}>
         <Text style={{color:mainTheme.liveSignalItemColor,textAlign:'center'}}>{strings.noSignal}</Text>
        </View>
        );
      }
      return !this.state.loading ? (
        <View style={styles.container}>
          <FlatList style={styles.flatList}
            ListFooterComponent={this.renderFooter()}
            ListHeaderComponent={this.renderHeader()}
            // initialNumToRender={20}
            // ItemSeparatorComponent={this.ListViewItemSeparator}
            // showsHorizontalScrollIndicator={false}
            data={this.state.content}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={20}
            stickyHeaderIndices={[0]}
            extraData={this.props.currentLanguage}
            onRefresh={this._handleRefresh}
            refreshing={this.state.refreshing}
            // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            // removeClippedSubviews={true}
          />
        </View>
      ) : (
        <ProgressBar />
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flatList:{
      backgroundColor:mainTheme.mainColor
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
    }
  });