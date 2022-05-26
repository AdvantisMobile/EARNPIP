import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet } from 'react-native';
import { Container, Header, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import LiveTab from '../components/OpenTab';
import CloseTab from '../components/CloseTab';
import strings from '../global/messages'
import { mainTheme } from '../core/theme'
import config from '../global/config';
import { connect } from 'react-redux'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: 0
    };
  }

didSelectTab(key) {
  console.log("Selected tab : ",key);
 this.setState({
  selectedKey:key
});
}


  navigateTo(key) {
    this.props.navigation.navigate(key);
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Container curentLanguage={this.props.preferredLanguage}>

        <Header hasTabs style={styles.headerStyle} iosBarStyle="light-content" androidStatusBarColor={mainTheme.mainColor} >
          <Left style={styles.drawerStyle}>
          <Icon style={styles.iconStyle} type="MaterialIcons" onPress={() => this.props.navigation.openDrawer()} name="menu" />
            <Text style={styles.headerText}>{strings.livesignals}</Text>
          </Left>
        </Header>

        <Tabs locked={true} onChangeTab={({ i, ref, from }) => this.didSelectTab(i)}  style={styles.tabs} tabBarUnderlineStyle={{ backgroundColor: mainTheme.tabBarUnderlineStyle }} >
          <Tab heading={<TabHeading style={styles.tabs}><Text style={styles.tabHeading}>{strings.live}</Text></TabHeading>}>
            <LiveTab navigation={ this.props.navigation } selectedKey={this.state.selectedKey} curentLanguage={this.props.preferredLanguage} />
          </Tab>
          <Tab heading={<TabHeading style={styles.tabs}><Text style={styles.tabHeading}>{strings.closed}</Text></TabHeading>}>
            <CloseTab navigation={ this.props.navigation } selectedKey={this.state.selectedKey} curentLanguage={this.props.preferredLanguage} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const mapState = state => ({
	preferredLanguage: state.auth.preferredLanguage,
});
export default connect(mapState)(HomeScreen);

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
    marginLeft: config.deviceHeight * 0.02,
    fontSize: config.deviceWidth * 0.05,
    fontWeight: '500',
    color: mainTheme.tabHeading
  },
  tabs: {
    backgroundColor: mainTheme.mainColor
  },
  tabHeading: {
    fontSize: config.deviceHeight * 0.02,
    color: mainTheme.tabHeading
  },
});