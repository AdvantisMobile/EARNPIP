import { Dimensions } from 'react-native';
// let baseApiAddress=__DEV__?"http://10.0.3.2:5000/api/forexsignal":"http://161.97.66.113/api/forexsignal/";
let baseApiAddress="http://161.97.66.113/api/forexsignal/";

// let tokenAdress=__DEV__?"http://10.0.3.2:5000/api/Token":"http://161.97.66.113/api/Token";
let tokenAdress="http://161.97.66.113/api/Token";

const config = {
    deviceWidth: Dimensions.get('window').width,
    sideBarWidth: Dimensions.get('window').width * .75,
    deviceHeight: Dimensions.get('window').height,
    baseApiAddress:baseApiAddress,
    tokenAdress:tokenAdress,
    s:"earnpip2020webapi",
    u:"earnpip2020",
    p:"fx2020eP",
    currentDisplayedLanguage:"en-US",
    // currentDisplayedLanguage:LocalizedString.getLanguage(),

    currentDeviceInterfaceLanguage:"en-US"
    //  currentDeviceInterfaceLanguage:LocalizedString.getInterfaceLanguage()
}

export default config