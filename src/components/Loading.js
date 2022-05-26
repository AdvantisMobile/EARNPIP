import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color="#4287f5" />
  </View>
);

export default Loading;
