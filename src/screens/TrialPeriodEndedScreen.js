import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import strings from '../global/messages'
import { mainTheme } from '../core/theme'
import { Icon } from 'native-base';
import config from '../global/config';
export default class TrialPeriodEndedScreen extends Component {

    render() {
        return (
            <View style={styles.containerStyle}>
                <Icon style={styles.iconStyle} type="MaterialIcons" name="app_blocking" />
                <Text style={styles.textStyle}>{strings.trialPeriodEnded}</Text>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:mainTheme.mainColor,
        justifyContent:'center',
        alignItems:'center'
    },
    iconStyle: {
        color: mainTheme.trialPeriodIconColor,
        paddingLeft: config.deviceWidth * 0.02,
        paddingRight: config.deviceWidth * 0.02,
        fontSize:config.deviceHeight * 0.2
    },
    textStyle: {
        marginLeft: config.deviceHeight * 0.02,
        fontSize: config.deviceHeight * 0.03,
        fontWeight: '500',
        color: mainTheme.trialPeriodTextColor
    }
});