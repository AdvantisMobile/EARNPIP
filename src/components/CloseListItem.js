import React, { PureComponent } from "react";
import { Icon, Accordion,CardItem } from "native-base";
import {View, Text,StyleSheet} from 'react-native';
import config from '../global/config'
import strings from '../global/messages';
import { mainTheme } from '../core/theme'

export default class CloseListItem extends PureComponent {
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("Should Update");
    //     return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
    // }
    _renderHeader(content, expanded) {
        var buy = true;
        if (content.signal_order == "SELL") {
            buy = false;
        }
        return (
            <CardItem activeOpacity={1}  bordered={true} style={styles.cardItemStyle}>
                <View style={styles.headerViewStyle}>
                    <Text style={styles.contentPairStyle} >{content.pair}</Text>
                    {buy ? <Text style={styles.buyStyle} >{strings.buy}</Text> : <Text style={styles.sellStyle} >{strings.sell}</Text>}
                    <Text style={styles.contentStyle} >{content.pl}</Text>
                        <Text style={styles.priceStyle}>{content.cprice}</Text>
                        {expanded ? <Icon type="Entypo" style={styles.chevronStyle} name="chevron-down" /> : <Icon type="Entypo" style={styles.chevronStyle} name="chevron-right" />}
                </View>
            </CardItem>
        )
    }
    _renderContent(content) {
        return (
            <CardItem bordered={true} style={styles.cardItemStyle}>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.signalType}</Text>
                    <Text style={styles.contentTextStyle}>{content.signalType}</Text>
                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.openedtime}</Text>
                    <Text style={styles.contentTextStyle}>{content.posted_on}</Text>
                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.closedtime}</Text>
                    <Text style={styles.contentTextStyle}>{content.closed_time}</Text>
                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.openprice}</Text>
                    <Text style={styles.contentTextStyle}>{content.open_price}</Text>
                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.tradeSizeLot}</Text>
                    <Text style={styles.contentTextStyle}>{content.lots}</Text>
                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.takeprofit}</Text>
                    {
                        content.cprice === content.take_profit ?
                            <View style={[styles.stopLossProfitStyle,{ backgroundColor: mainTheme.takeProfitColor }]}>
                                <Text style={styles.contentTextStyle}>{content.take_profit}</Text>
                            </View>
                            :
                            <View style={[styles.stopLossProfitStyle]}>
                                <Text style={styles.contentTextStyle}>{content.take_profit}</Text>
                            </View>
                    }

                </View>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentLabelStyle}>{strings.stoploss}</Text>
                    {
                        content.cprice === content.stop_loss ?
                        <View style={[styles.stopLossProfitStyle,{ backgroundColor: mainTheme.stopLossColor }]}>
                                <Text style={styles.contentTextStyle}>{content.stop_loss}</Text>
                            </View>
                            :
                            <View style={[styles.stopLossProfitStyle]}>
                                <Text style={styles.contentTextStyle}>{content.stop_loss}</Text>
                            </View>
                    }
                </View>
            </CardItem>
        );
    }
    render() {
        const { flatListItem: { item } } = this.props;
        return (
            <Accordion style={{ opacity: 1 }}
                dataArray={[item]}
                animation={false}
                expanded={false}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />
        );
    }
}
const styles = StyleSheet.create({
    cardItemStyle: {
        flexDirection: 'column',
        borderColor: mainTheme.mainColor,
        backgroundColor: mainTheme.mainColor,
        borderColor:mainTheme.closedSignalBorderColor,
    },
    headerViewStyle: {
        flexDirection: 'row',
        flex:1,
        borderColor:"blue",

    },
    contentPairStyle: {
        flex: 1,
        color: mainTheme.closedSignalItemColor,
        fontWeight: 'bold',
    },
    buyStyle: {
        flex: 1,
        color: mainTheme.buyColor
    },
    sellStyle: {
        flex: 1,
        color: mainTheme.sellColor
    },
    contentStyle: {
        flex: 1,
        color: mainTheme.closedSignalItemColor,
        fontWeight: 'bold',
    },
    priceStyle: {
        color: mainTheme.closedSignalItemColor,
        flex: 1,
    },
    chevronStyle: {
        fontSize: config.deviceWidth * 0.04,
        color: mainTheme.closedSignalItemColor,
        flex:0.3
    },
    contentViewStyle: {
        flexDirection: 'row',
        marginTop: config.deviceHeight * 0.01
    },
    contentLabelStyle: {
        color: mainTheme.closedSignalItemColor,
        flex: 1,
        fontSize: config.deviceWidth * 0.04,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    contentTextStyle: {
        color: mainTheme.closedSignalItemColor,
        flex: 1,
        fontSize: config.deviceWidth * 0.04,
        textAlign: 'right',
        marginLeft: config.deviceWidth * 0.02
    },
    stopLossProfitStyle:{
        borderRadius: 5 
    }
});