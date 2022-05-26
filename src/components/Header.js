import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { paperTheme } from '../core/theme';
import config from '../global/config'

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: config.deviceWidth*0.06,
    color: paperTheme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: config.deviceHeight*0.01,
  },
});

export default memo(Header);
