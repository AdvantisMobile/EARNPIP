import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { paperTheme } from '../core/theme';
import config from '../global/config'

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: config.deviceHeight*0.025,
    lineHeight: config.deviceHeight*0.05,
    color: paperTheme.colors.secondary,
    textAlign: 'center',
    marginBottom: config.deviceHeight*0.03,
  },
});

export default memo(Paragraph);
