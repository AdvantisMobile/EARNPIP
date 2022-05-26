import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { paperTheme } from '../core/theme';

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: paperTheme.colors.primary },
      style,
      
    ]}
    labelStyle={styles.text}
    uppercase={false}
    mode={mode}
    {...props}
    color="#349eeb"
    labelStyle={{ color: "white", fontSize: 18 }}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
