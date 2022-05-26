import React, { memo } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform
} from 'react-native';
import config from '../global/config'
//props.children
const Background = ({ children }) => (
  <View style={styles.background}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      {children}
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: config.deviceHeight*0.01,
    width: '100%',
    maxWidth: config.deviceWidth*0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default memo(Background);
