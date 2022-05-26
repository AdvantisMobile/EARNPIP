import React from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet
} from 'react-native';
import { Row } from 'native-base';
const ProgressBar = () => (
	<View style={styles.progressBar}>
		<ActivityIndicator size="large" color="#EA0000" />
	</View>
);
const styles = StyleSheet.create({
	progressBar: {
        flex: 1,
        flexDirection:"row",
        alignItems: 'center',
		justifyContent: 'center'
	}
});
export default ProgressBar;