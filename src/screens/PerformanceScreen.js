import React, { Component } from 'react';
import { Text, StatusBar ,StyleSheet } from 'react-native';
import { Container, Header, Left, Icon, Tab, Tabs, TabHeading } from 'native-base';
import VerificationTab from '../components/VerificationTab';
import RecordTab from '../components/RecordTab';
import strings from '../global/messages'
import {mainTheme} from '../core/theme'
import config from '../global/config';
import { connect } from 'react-redux'

class PerformanceScreen extends Component {


    didSelectTab(key) {

    }

    navigateTo(key) {
        this.props.navigation.navigate(key);
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
        return (
            <Container>
                <Header hasTabs style={styles.headerStyle} iosBarStyle="light-content" androidStatusBarColor={mainTheme.mainColor} >
                    <Left style={styles.drawerStyle}>
                        <Icon style={styles.iconStyle} onPress={() => this.props.navigation.openDrawer()} type="MaterialIcons" name="menu" />
                        <Text style={styles.headerText}>{strings.proofofperformance}</Text>
                    </Left>
                </Header>
                <Tabs locked={true} onChangeTab={({ i, ref, from }) => this.didSelectTab(i)} style={styles.tabs} tabBarUnderlineStyle={{ backgroundColor: mainTheme.tabBarUnderlineStyle }} >
                    <Tab heading={<TabHeading style={styles.tabs}><Text style={styles.tabHeading}>{strings.verificationFx}</Text></TabHeading>}>
                        <VerificationTab />
                    </Tab>
                    <Tab heading={<TabHeading style={styles.tabs}><Text style={styles.tabHeading}>{strings.trackRecord}</Text></TabHeading>}>
                        <RecordTab />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const mapState = state => ({
	currentLanguage: state.auth.preferredLanguage,
});
export default connect(mapState)(PerformanceScreen);
const styles = StyleSheet.create({
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
    tabs:{
        backgroundColor: mainTheme.mainColor
    },
    tabHeading: {
        fontSize: config.deviceWidth * 0.04,
        color:mainTheme.tabHeading
    },
  });