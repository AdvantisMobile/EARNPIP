import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import config from '../global/config'

const Logo = () => (
  <Image source={require('../assets/pip.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    marginBottom: config.deviceHeight*0.01,
    marginTop: config.deviceHeight*0.05,
    width:128,
    height:128
  },
});

export default memo(Logo);
