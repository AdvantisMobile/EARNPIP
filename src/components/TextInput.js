
import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { paperTheme } from '../core/theme';
import config from '../global/config'
// const TextInputWithRef = React.forwardRef((props, ref) => <TextInput ref={ref} {...props} />);
// You can now get a ref directly to the DOM button:
const TextInputWithRef = React.forwardRef((props,ref)=>
{
  // const innerRef = React.useRef(ref)// set ref as an initial value
  let {errorText,...otherProps}=props;
  return (
  <View style={styles.container}>
    <Input
      ref={ref}
      style={styles.input}
      selectionColor={paperTheme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...otherProps}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>)
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: config.deviceHeight*0.01
  },
  input: {
    backgroundColor: paperTheme.colors.surface,
  },
  error: {
    color: paperTheme.colors.error,
  },
});

export default memo(TextInputWithRef);
