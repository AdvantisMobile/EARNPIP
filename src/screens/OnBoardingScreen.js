import React,{Fragment} from 'react';
import { StyleSheet, View ,Text ,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux'
import strings from '../global/messages';
import { mainTheme } from '../core/theme';
import {
  Icon
} from 'native-base';
import config from '../global/config';
import {TextAnimationFadeIn} from 'react-native-text-effects';




const slides = [
    {
      key: 1,
      backgroundColor: mainTheme.onBoardingScreen1Color,
      image: require('../../src/assets/onBoarding1.jpg'),
      title: strings.onBoardingScreen1Title,
      text: strings.onBoardingScreen1Subtitle,
    },
    {
      key: 2,
      backgroundColor: mainTheme.onBoardingScreen2Color,
      image: require('../../src/assets/onBoarding2.jpg'),
      title: strings.onBoardingScreen2Title,
      text: strings.onBoardingScreen2Subtitle,
    },
    {
      key: 3,
      backgroundColor: mainTheme.onBoardingScreen3Color,
      image: require('../../src/assets/onBoarding3.jpg'),
      title: strings.onBoardingScreen3Title,
      text: strings.onBoardingScreen3Subtitle,
    }
  ];

class OnBoardingScreen extends React.Component {
    constructor(props)
    {
        super(props);
        if(this.props.isShowed){
        this.props.navigation.navigate("HomeScreen")
        }
    }
    onDone(){
        this.props.onBoardingShowed();
        this.props.navigation.navigate("HomeScreen")
    }
  _renderItem = ({ item }) => {
    return (

        <View style={{ flex: 1 }}>
            <Image
              style={{
                resizeMode: "stretch",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.95
              }}
              source={item.image}
            ></Image>
            <View style={{
                width: config.deviceWidth,
                height: config.deviceHeight * 0.65,
                position: 'absolute',
                bottom: 0}}> 
                        {/* <TextAnimationRain sizeRain={10} value={item.title} delay={100} duration={1000} style={styles.title} /> */}
      {/* <TextAnimationFadeIn value={item.title} delay={200} duration={1000} style={styles.title} /> */}
     {strings.getLanguage() !=="en"&& (<Fragment>
     <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        </Fragment>
        )
        }


      </View>
       </View>
      
    );
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-right"
          type="FontAwesome5"          
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="check"
          type="FontAwesome5"          
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  render() {
    return (!this.props.isShowed &&
      <AppIntroSlider
        data={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderItem={this._renderItem}
        keyExtractor={item => item.key.toString()}
        onDone={()=>this.onDone()}
      />
    );
  }
}
const mapState = state => ({
    currentLanguage: state.auth.preferredLanguage,
    isShowed:state.auth.isOnBoardingScreenShowed
});
const mapDispatchToProps = ({ auth: { onBoardingShowed } }) => ({
	onBoardingShowed: () => onBoardingShowed(),
  });
  const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title:{
      fontSize: config.deviceWidth*0.06,
      // fontFamily:"Adolfine",
      paddingBottom:config.deviceHeight*0.005,
      textAlign:"center",
      color:"#43e3fb"
    },
    text:{
        fontSize: config.deviceWidth*0.04,
        // fontFamily:"arial",
        marginTop:config.deviceHeight*0.001,
        textAlign:"center",
        color:"white"

    }  ,
    backgroundImage: {
      height: '100%',
      width: '100%'
    },
  });
export default connect(mapState,mapDispatchToProps)(OnBoardingScreen);