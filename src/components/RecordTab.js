import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Content, Card, CardItem } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import strings from '../global/messages'
import { mainTheme } from '../core/theme'
import config from '../global/config';
import * as callers from '../global/call';
import {TextAnimationFadeIn} from 'react-native-text-effects';
import { ScrollView } from 'react-native-gesture-handler';


export default class RecordTab extends Component {


    state = {
        fill: 0,
        selectedKey: 0,
        content: [],
        records: {
            id: "0",
            total: "",
            monthly: "",
            pertrade: "",
            profitable: "",
            tradesperday: "",
            avg: ""
        }

    }

    async componentDidMount() {
        var self = this;
        // Get contacts
        try {
            let response = await callers.signalApi
                .get(
                    "GetPipRecord"
                );
            self.setState({
                records: response.data
            });
            self.setState({ fill: 100 })
        }

        catch (error) {
            console.error(error);
            Alert.alert(strings.error, strings.unknownError);
        };
    };


    progress() {
        return "5"
    }
    calculate(value) {
        temp = value * 3.4;
        return temp.toFixed(0)
    }

    render() {
        return (

            <Content style={styles.contentStyle}>
                <Card style={styles.cardStyle} transparent>

                    {/*Header*/}
                    <CardItem bordered={true} style={styles.cardItemStyle}>
                        <Text style={styles.cardItemLabelStyle} >{strings.totalpips}</Text>
                        <Text style={styles.cardItemTextStyle} >{this.state.records.total}</Text>
                    </CardItem>

                    <CardItem bordered={true} style={styles.cardItemStyle}>
                        <Text style={styles.cardItemLabelStyle} >{strings.pipspertrade}</Text>
                        <Text style={styles.cardItemTextStyle} >{this.state.records.pertrade}</Text>
                    </CardItem>
                    <CardItem bordered={true} style={styles.cardItemStyle}>
                        <Text style={styles.cardItemLabelStyle} >{strings.profitabletrades}</Text>
                        <Text style={styles.cardItemTextStyle} > {this.state.records.profitable}</Text>
                    </CardItem>
                    <CardItem bordered={true} style={styles.cardItemStyle}>
                        <Text style={styles.cardItemLabelStyle} >{strings.tradesperday}</Text>
                        <Text style={styles.cardItemTextStyle} > {this.state.records.tradesperday}</Text>
                    </CardItem>
                    {/* <CardItem bordered={true} style={styles.cardItemStyle}>
                        <Text style={styles.cardItemLabelStyle}>{strings.avgtradeduration}</Text>
                        <Text style={styles.cardItemTextStyle} > {this.state.records.avg}</Text>
                    </CardItem> */}
                </Card>

                <View style={styles.animatedCircularContainer}>
                    <View>
                        <AnimatedCircularProgress
                            size={80}
                            width={3}
                            fill={this.state.fill}
                            duration={3000}
                            tintColor={mainTheme.recordTabCircle1Color}
                            rotation={0}
                            backgroundColor="black">
                            {
                                (fill) => (
                                    <Text style={[styles.fillTextStyle, { color: mainTheme.recordTabCircle1TextColor }]} >{
                                        (fill * (this.state.records.graph1val / 100)).toFixed(0)
                                    }</Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={[styles.circularText, { color: mainTheme.recordTabCircle1TextColor }]}>{strings.months}</Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                            size={80}
                            width={3}
                            fill={this.state.fill}
                            duration={3000}
                            tintColor={mainTheme.recordTabCircle2Color}
                            rotation={0}
                            backgroundColor="black">
                            {
                                (fill) => (
                                    <Text style={[styles.fillTextStyle, { color: mainTheme.recordTabCircle2TextColor }]} >{
                                        (fill * (this.state.records.graph2val / 100)).toFixed(0)
                                    }</Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={[styles.circularText, { color: mainTheme.recordTabCircle2TextColor }]}>{strings.profit} % </Text>
                    </View>
                    <View>
                        <AnimatedCircularProgress
                            size={80}
                            width={3}
                            fill={this.state.fill}
                            duration={3000}
                            tintColor={mainTheme.recordTabCircle3Color}
                            rotation={0}
                            backgroundColor="black">
                            {
                                (fill) => (
                                    <Text style={[styles.fillTextStyle, { color: mainTheme.recordTabCircle3TextColor }]} >{
                                        (fill * (this.state.records.graph3val / 100)).toFixed(0)
                                    }</Text>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={[styles.circularText, { color: mainTheme.recordTabCircle3TextColor }]}>% {strings.maxDd}</Text>
                    </View>
                </View>
                {/* <TextAnimationFadeIn value={strings.fxBlueExplanation} delay={50} duration={100} style={styles.fxBlueExplanation} /> */}
                <ScrollView>
                <Text style={styles.fxBlueExplanation}>{strings.fxBlueExplanation}</Text>
                </ScrollView>
            </Content>
        );
    }
}
const styles = StyleSheet.create({
    contentStyle: {
        paddingTop: config.deviceHeight * 0.02,
        paddingLeft: config.deviceWidth * 0.02,
        paddingRight: config.deviceWidth * 0.02,
        backgroundColor: mainTheme.backgroundColor,
    },
    cardStyle: {
        backgroundColor: mainTheme.backgroundColor,

    },
    cardItemStyle: {
        borderColor: mainTheme.mainColor,
        backgroundColor: mainTheme.mainColor,
        flexDirection: 'row',
        // marginBottom:10
    },
    cardItemLabelStyle: {
        color: mainTheme.recordTabcardItemLabelColor,
        textAlign: 'center',
        fontSize: config.deviceWidth * 0.04,
        fontWeight: '600'
    },
    cardItemTextStyle: {
        flex: 1,
        textAlign: 'right',
        color: mainTheme.recordTabcardItemTextColor,
        fontWeight: 'bold'
    },
    animatedCircularContainer: {
        marginLeft: config.deviceWidth * 0.02,
        marginRight: config.deviceWidth * 0.02,
        marginTop: config.deviceHeight * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circularText: {
        marginTop: config.deviceHeight * 0.03,
        fontSize: config.deviceWidth * 0.05,
        textAlign: 'center'
    },
    fillTextStyle: {
        fontSize: config.deviceWidth * 0.05,
        fontWeight: 'bold'
    },
    fxBlueExplanation: {
        fontSize: config.deviceWidth * 0.04,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop:config.deviceHeight * 0.02,
        color: mainTheme.fxBlueExplanationColor,
        lineHeight:config.deviceHeight * 0.03,
    }
});