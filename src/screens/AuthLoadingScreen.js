import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import strings from '../global/messages';
import {AuthService}  from '../services/AuthService';
// import AsyncStorage from '@react-native-community/async-storage';

//Bu component aslında switcher component ya AppStack'e yönlendiriyor ya da AuthStack'e
class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
	}
	async componentDidMount() {
		console.log("currentUser",this.props.currentUser);
		let lang=strings.getLanguage();
		if(this.props.currentUser.preferredLanguage===null){
		  await this.props.changeLanguage(lang);
		}
		else{
		 strings.setLanguage(this.props.currentUser.preferredLanguage);
		}
		  if (this.props.currentUser.isLoggedIn && (this.props.currentUser.loginType === 'EMAIL' ? this.props.currentUser.emailVerified : true)) {
			let freeTrialEnded=await AuthService.isFreeTrialEnded(this.props.currentUser.creationTime)
			console.log("Is Limited",freeTrialEnded);
			if(freeTrialEnded)
			{
				this.props.navigation.navigate("LimitedAppStack");
	
			}
			else{
				this.props.navigation.navigate("App");
			}
		}
		else 
		{
			this.props.navigation.navigate("Auth");
		}
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4287f5" />
				{/* <Text>{strings.loading}...</Text> */}
			</View>
		);
	}
}
const mapState = state => ({
	currentUser: state.auth,
});
const mapDispatchToProps = ({ auth: { changeLanguage } }) => ({
	changeLanguage: (lang) => changeLanguage(lang),
  });
export default connect(mapState,mapDispatchToProps)(AuthLoadingScreen);
