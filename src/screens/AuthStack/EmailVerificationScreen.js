import React, { useState, useEffect,useRef, memo } from 'react';
import { Linking, Platform, StyleSheet, Alert } from 'react-native';
import {AuthService} from '../../services/AuthService';
import strings from '../../global/messages';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import Button from '../../components/Button';
import { Text, Container, Content } from "native-base";
import config from '../../global/config';
import crashlytics from '@react-native-firebase/crashlytics';

export const EmailVerificationScreen = ({ markEmailVerified, currentUser,navigation }) => {
    let resendInterval;
    const [isBusy, setIsBusy] = useState(false);
    const [isVerificationEmailSent, setMailSent] = useState(false);
    const [waitingTimeToResend, setWaitingTime] = useState(0);
    const isVerificationEmailSentRef = useRef(isVerificationEmailSent)
    isVerificationEmailSentRef.current = isVerificationEmailSent
    const waitingTimeToResendRef = useRef(waitingTimeToResend)
    waitingTimeToResendRef.current = waitingTimeToResend
    //That will ensure the useEffect only runs once. Second parameter []
    useEffect(() => {
        return () => {
            if (resendInterval) {
                clearInterval(resendInterval);
            }
        };
    }, []);
    const checkStatus = async () => {
        try {
            setIsBusy(true);
            let emailVerified=await AuthService.isEmailVerified();
            //Try again
            if (emailVerified===false){
                emailVerified=await AuthService.isEmailVerified();
            }
            if (emailVerified) {
                markEmailVerified();
                navigation.navigate("App");
            }
            else {
                Alert.alert(strings.alert,strings.emailNotVerified);
            }
        }
        finally {
            setIsBusy(false);
        }
    };
    const resendVerificationEmail = async () => {
        try {
            setIsBusy(true);
            // await new Promise((resolve) => setTimeout(resolve,1000));

            await AuthService.resendVerificationEmail();
            setMailSent(true);
            setWaitingTime(30);
            Alert.alert(strings.information,strings.resendEmailNotification);
            resendInterval = setInterval(() => {
                if (!isVerificationEmailSentRef) {
                    setWaitingTime(w => 30);
                    setMailSent(m=>true);


                }
                if (waitingTimeToResendRef.current > 1) {
                    setWaitingTime(w => waitingTimeToResendRef.current-1);
                    setMailSent(m=>true);
                }
                else if (waitingTimeToResendRef.current === 1) {
                    setWaitingTime(w => 0);
                    setMailSent(m=>false);
                }
            }, 1000);
        }
        catch(e){
            console.log(e)
            crashlytics().recordError(e);
        }
        finally {
            setIsBusy(false);
        }
    };
    const openMailbox = async () => {
        try {
            setIsBusy(true);
            if (Platform.OS === `ios`) {
                await Linking.openURL(`message:`);
            }
        }
        finally {
            setIsBusy(false);
        }
    };
    const waitForResend = isVerificationEmailSent && waitingTimeToResend > 0;
    return (
        <Container style={styles.container}>
            <Content>
                <Spinner
                    visible={isBusy}
                    textContent={`${strings.loading}...`}
                    textStyle={styles.spinnerTextStyle}
                />
                <Text style={styles.text}>
                    {strings.formatString(strings.emailVerificationNotice, currentUser.email)}
                </Text>
                <Button mode="contained" onPress={checkStatus} disabled={isBusy} style={styles.button}>
                    {strings.check}
                </Button>
                <Button mode="contained" onPress={resendVerificationEmail} disabled={isBusy || waitForResend} style={styles.button}>
                    {strings.resendVerification}
                    {waitForResend ? ` (${waitingTimeToResend})` : ''}
                    {/* {waitForResend? waitingTimeToResend:''} */}

                </Button>
                {/* {Platform.OS === 'ios' && (
                    <Button mode="contained" onPress={openMailbox} disabled={isBusy} style={styles.button}>
                        {strings.openMailbox}
                    </Button>
                )} */}
            </Content>
        </Container>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: config.deviceHeight * 0.01,
        width: '100%',
        alignSelf: 'center',

    },
    button: {
        marginTop: config.deviceHeight * 0.02,
        marginBottom: config.deviceHeight * 0.02,

    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    text: {
        marginTop: config.deviceHeight * 0.02,
        marginBottom: config.deviceHeight * 0.02,
    }
});
const mapStateToProps = (state) => ({
    currentUser: state.auth,
});

const mapDispatchToProps = ({ auth: { markEmailVerified } }) => ({
    markEmailVerified: () => markEmailVerified(),
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(EmailVerificationScreen));
