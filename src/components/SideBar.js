import React from "react";
import { Text, Image, TouchableOpacity, View, Share, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Container, Content } from "native-base";
import strings from '../global/messages';
import { connect } from 'react-redux';
import { mainTheme } from '../core/theme'
import config from '../global/config';
import * as callers from '../global/call';

class SideBar extends React.Component {

    state = {
        activeItem: 0,

    }
    sharethisapp() {
        this.setState({
            activeItem: 5,
        });
        Share.share({
            message: strings.formatString(strings.downloadApp, this.state.GoogleLink, this.state.AppleLink),
            title: strings.shareEarnpipWithFriends
        }, {
            // Android only:
            dialogTitle: strings.shareEarnpip,
            // iOS only:
            excludedActivityTypes: [
            ]
        })
    }

    componentDidMount() {
        var self = this;
        callers.signalApi
            .get(
                "GetShareUrl"
            )
            .then(function (response) {
                self.setState({
                    AppleLink: response.data.appleLink,
                    GoogleLink: response.data.googleLink,
                });
            })
            .catch(function (error) {
                console.error(error);
                Alert.alert(strings.error,strings.unknownError);
            });
    };

    navigation(key) {
        if (key == 0) {
            this.setState({
                activeItem: 0,
            });
            this.props.navigation.navigate("HomeScreen")
        }
        else if (key == 1) {
            this.setState({
                activeItem: 1,
            });
            this.props.navigation.navigate("PerformanceScreen")

        }
        else if (key == 2) {
            this.setState({
                activeItem: 2,
            });
            this.props.navigation.navigate("DemoScreen")
        }
        else if (key == 3) {
            this.setState({
                activeItem: 3,
            });
            this.props.navigation.navigate("SettingsScreen")
        }

        else if (key == 4) {
            this.setState({
                activeItem: 4,
            });
            this.props.logout();
            this.props.navigation.navigate("Auth")
        }
        else if (key == 6) {
            this.setState({
                activeItem: 6,
            });
            this.props.navigation.navigate("ContactScreen")
        }
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>

                <Container style={styles.sideBarContainer}>
                    <View style={styles.logoTopView}>
                        <View style={styles.logoChildView}>
                            <Image style={styles.logoImage} source={require('../assets/pip.png')} />
                            <Text style={styles.logoText}>Earnpip ®</Text>
                        </View>
                    </View>
                    <Content>
                        <View style={styles.navigationsContainer}>


                            <TouchableOpacity onPress={this.navigation.bind(this, 0)} style={[styles.sideBarItemContainer, (this.state.activeItem == 0) ? styles.activeBackgroundColor : null]}>

                                <Image style={styles.sideBarImage} source={require('../assets/live-a.png')} />
                                <Text style={styles.sideBarText}>{strings.livesignals}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.navigation.bind(this, 1)} style={[styles.sideBarItemContainer, (this.state.activeItem == 1) ? styles.activeBackgroundColor : null]}>

                                <Image style={styles.sideBarImage} source={require('../assets/graph-a.png')} />
                                <Text style={styles.sideBarText}>{strings.proofofperformance}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.navigation.bind(this, 2)} style={[styles.sideBarItemContainer, (this.state.activeItem == 2) ? styles.activeBackgroundColor : null]}>

                                <Image style={styles.sideBarImage} source={require('../assets/demo-a.png')} />
                                <Text style={styles.sideBarText}>{strings.demo}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.navigation.bind(this, 3)} style={[styles.sideBarItemContainer, (this.state.activeItem == 3) ? styles.activeBackgroundColor : null]}>

                                <Image style={styles.sideBarImage} source={require('../assets/gear-a.png')} />
                                <Text style={styles.sideBarText}>{strings.settings}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.sharethisapp()} style={[styles.sideBarItemContainer, (this.state.activeItem == 5) ? styles.activeBackgroundColor : null]}>
                                <Image style={styles.sideBarImage} source={require('../assets/share-a.png')} />
                                <Text style={styles.sideBarText}>{strings.sharethisapp}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.navigation.bind(this, 6)} style={[styles.sideBarItemContainer, (this.state.activeItem == 6) ? styles.activeBackgroundColor : null]}>
                                <Image style={styles.sideBarImage} source={require('../assets/mail-a.png')} />
                                <Text style={styles.sideBarText}>{strings.contactUs}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={this.navigation.bind(this, 4)} style={[styles.sideBarItemContainer, (this.state.activeItem == 4) ? styles.activeBackgroundColor : null]}>

                                <Image style={styles.sideBarImage} source={require('../assets/logout.png')} />
                                <Text style={styles.sideBarText}>{strings.logout}</Text>

                            </TouchableOpacity> */}
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sideBarItemContainer: {
        marginBottom: config.deviceHeight * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        flex:1
    },
    sideBarText: {
        color: mainTheme.sideBarLogoTextColor,
        // height: config.deviceHeight * 0.06,
        // lineHeight: config.deviceHeight * 0.06,
        // fontSize: config.sideBarWidth * 0.06
    },
    sideBarImage: {
        height: config.deviceHeight * 0.06,
        width: config.sideBarWidth * 0.14,
        marginTop: config.deviceHeight * 0.02,
        marginBottom: config.deviceHeight * 0.01,
        marginLeft: config.sideBarWidth * 0.04,
        marginRight: config.sideBarWidth * 0.03
    },
    logoImage: {
        height: config.deviceHeight * 0.12,
        width: config.deviceHeight * 0.12
    },
    logoText: {
        marginTop: config.deviceHeight * 0.03,
        marginBottom: config.deviceHeight * 0.03,

        fontSize: config.deviceHeight * 0.04,
        fontWeight: 'bold',
        color: mainTheme.sideBarLogoTextColor
    },
    navigationsContainer: {
        marginTop: config.deviceHeight * 0.01
    },
    sideBarContainer: {
        backgroundColor: mainTheme.mainColor
    },
    logoTopView: {
        flexDirection: 'column',
        borderBottomColor: mainTheme.mainColor,
        borderBottomWidth: config.sideBarWidth * 0.05,
        height: config.deviceHeight * 0.2,
        backgroundColor: mainTheme.mainColor,
        marginTop: config.deviceHeight * 0.04

    },
    logoChildView: {
        flex: 1,
        marginTop: config.deviceHeight * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeBackgroundColor: {
        backgroundColor: mainTheme.activeSideBarItemColor
    }
});
const mapDispatchToProps = ({ auth: { logout } }) => ({
    logout: () => logout(),
});
export default connect(null, mapDispatchToProps)(SideBar);