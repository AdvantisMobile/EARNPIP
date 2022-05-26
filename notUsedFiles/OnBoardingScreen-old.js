// import React, { Component } from 'react'
// import {ScrollView ,Image ,View} from 'react-native'
// import Onboarding from 'react-native-onboarding-swiper';
// import { connect } from 'react-redux'
// import strings from '../src/global/messages';
// import { mainTheme } from '../src/core/theme';
//  class OnBoardingScreen extends Component {
//     constructor(props)
//     {
//         super(props);
//         if(this.props.isShowed){
//         this.props.navigation.navigate("HomeScreen")
//         }
//     }
//      componentDidMount() {
//     //    this.props.navigation.navigate("HomeScreen")
//     }
//     onDone(){
//         this.props.onBoardingShowed();
//         this.props.navigation.navigate("HomeScreen")
//     }
//     render() {
//         return (
//             !this.props.isShowed && <ScrollView  style={{flex:1}}>
//                 <Onboarding
//                 showSkip={false}
//                 nextLabel={strings.next}
//                 onDone={()=> this.onDone()}
//                 titleStyles={{ fontSize: 54, fontWeight: "700",paddingTop:0,marginTop:0,marginBottom:0,paddingBottom:0 }}
//                 subTitleStyles={{ fontSize: 24,paddingTop:0,marginTop:0,marginBottom:0,paddingBottom:0 }}
//                 controlStatusBar ={true}
//                 containerStyles={{paddingTop:0,marginTop:0,marginBottom:0,paddingBottom:0}}
//                 imageContainerStyles={{marginHorizontal :0,paddingHorizontal:0,paddingTop:0,marginTop:0}}
//                 pages={[
//                     {
//                     backgroundColor: mainTheme.onBoardingScreen1Color,
//                     image: <Image  source={require('../../src/assets/onBoarding1.jpg')} />,
//                     title: strings.onBoardingScreen1Title,
//                     subtitle: strings.onBoardingScreen1Subtitle,

//                     },
//                     {
//                         backgroundColor: mainTheme.onBoardingScreen2Color,
//                         image: <Image source={require('../../src/assets/onBoarding2.jpg')} />,
//                         title: strings.onBoardingScreen2Title,
//                         subtitle: strings.onBoardingScreen2Subtitle,
//                     },
//                     {
//                         backgroundColor: mainTheme.onBoardingScreen3Color,
//                         image: <Image source={require('../../src/assets/onBoarding3.jpg')} />,
//                         title: strings.onBoardingScreen3Title,
//                         subtitle: strings.onBoardingScreen3Subtitle,
//                     },
//                 ]}
//                 />
//             </ScrollView >
//         )
//     }
// }
// const mapState = state => ({
//     currentLanguage: state.auth.preferredLanguage,
//     isShowed:state.auth.isOnBoardingScreenShowed
// });
// const mapDispatchToProps = ({ auth: { onBoardingShowed } }) => ({
// 	onBoardingShowed: () => onBoardingShowed(),
//   });
// export default connect(mapState,mapDispatchToProps)(OnBoardingScreen);