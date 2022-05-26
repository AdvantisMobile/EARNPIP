import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import DemoScreen from '../screens/DemoScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import SideBar from '../components/SideBar';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthHome from '../screens/AuthStack/HomeScreen';
import AuthLogin from '../screens/AuthStack/Login/LoginScreen';
import AuthRegister from '../screens/AuthStack/Register/RegisterScreen';
import EmailVerificationScreen from '../screens/AuthStack/EmailVerificationScreen';
import {mainTheme} from '../core/theme'
import AuthForgotPassword from '../screens/AuthStack/ForgotPassword/ForgotPasswordScreen';
import TrialPeriodEndedScreen from '../screens/TrialPeriodEndedScreen';
import strings from '../global/messages';
import config from '../global/config';

const AuthStack = createStackNavigator(
    {
        HomeScreen: {
            screen: AuthHome,
            navigationOptions: ({ navigation }) => ({
                title: strings.homeScreen,
            }),
        },
        LoginScreen: {
            screen: AuthLogin,
            navigationOptions: ({ navigation }) => ({
                title: strings.loginScreen,
            })
        },
        RegisterScreen: {
            screen: AuthRegister,
            navigationOptions: ({ navigation }) => ({
                title: strings.registerScreen,
            })
        },
        ForgotPasswordScreen: {
            screen: AuthForgotPassword,
            navigationOptions: ({ navigation }) => ({
                title: strings.forgotPasswordScreen,
            })
        },
        EmailVerificationScreen: {
            screen: EmailVerificationScreen,
            navigationOptions: ({ navigation }) => ({
                title: strings.emailVerificationScreen,
            })
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: mainTheme.mainColor,
            },
            initialRouteName: "AuthHome"
        }
        )
    });

const AppStack = createStackNavigator({
    OnBoardingScreen: { screen: OnBoardingScreen },
    HomeScreen: { screen: HomeScreen },
    SettingsScreen: { screen: SettingsScreen },
    ContactScreen: { screen: ContactScreen },
    PerformanceScreen: { screen: PerformanceScreen },
    DemoScreen: { screen: DemoScreen }
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            header: () => null
        })
    });
const LimitedAppStack = createStackNavigator({
    TrialPeriodEnded: { screen: TrialPeriodEndedScreen }},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            header: () => null
        })
    });
const AppDrawerNavigator = new createDrawerNavigator({
    AppStack
}, {
    drawerPosition: 'left',
    contentComponent: SideBar,
    drawerWidth: config.deviceWidth * .75,
    drawerOpenRoute: 'drawerOpen',
    drawerCloseRoute: 'drawerClose',
    drawerToggleRoute: 'drawerToggle',
});
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: {
                screen: AuthLoadingScreen
            },
            App: AppDrawerNavigator,
            LimitedAppStack:LimitedAppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);