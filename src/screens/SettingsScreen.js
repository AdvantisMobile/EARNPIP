import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { Container, Header, Left, Icon,Content } from 'native-base';
import strings from '../global/messages'
import { mainTheme } from '../core/theme'
import config from '../global/config';
import RNPickerSelect from 'react-native-picker-select';
import {AuthService} from '../services/AuthService';
import { connect } from 'react-redux'


 class SettingsScreen extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: this.props.currentUser.preferredLanguage,
      selectedTheme:"dr",
      languages:[
        {
          label: strings.english,
          value: 'en',

        },
        {
          label: strings.spanish,
          value: 'es',
        },
        {
          label: strings.italian,
          value: 'it',
        },        
        {
          label: strings.german,
          value: 'de',
        },        
        {
          label: strings.portuguese,
          value: 'pt',
        },        
        {
          label: strings.french,
          value: 'fr',
        },        
        {
          label: strings.finnish,
          value: 'fi',
        },        
        {
          label: strings.indonesian,
          value: 'id',
        },        
        {
          label: strings.dutch,
          value: 'nl',
        },        
        {
          label: strings.norwegian,
          value: 'no',
        },        
        {
          label: strings.polish,
          value: 'pl',
        },        
        {
          label: strings.thai,
          value: 'th',
        },        
        {
          label: strings.swedish,
          value: 'sv',
        },        
        {
          label: strings.japanese,
          value: 'ja',
        },        
        {
          label: strings.korean,
          value: 'ko',
        },        
        {
          label: strings.malay,
          value: 'ms',
        },        
        {
          label: strings.slovene,
          value: 'sl',
        },        
        {
          label: strings.serbian,
          value: 'sr',
        },        
        {
          label: strings.filipino,
          value: 'fil',
        },        
        {
          label: strings.icelandic,
          value: 'is',
        },        
        {
          label: strings.afrikaans,
          value: 'af',
        },        
        {
          label: strings.danish,
          value: 'da',
        },        
        {
          label: strings.swahili,
          value: 'sw',
        },        
        {
          label: strings.taiwanese,
          value: 'tw',
        },        
        {
          label: strings.mandarin,
          value: 'zh',
        },        
        {
          label: strings.cantonese,
          value: 'hk',
        },        
        {
          label: strings.bosnian,
          value: 'bo',
        },        
        {
          label: strings.croatian,
          value: 'hr',
        },        
        {
          label: strings.bulgarian,
          value: 'bg',
        },        
        {
          label: strings.vietnamese,
          value: 'vi',
        },        
 
      ]
    };
  }
  async onThemeChange(value){
    this.setState({
      selectedTheme: value,
    });
  }
  async onLanguageChange(value) {
        this.setState({
      selectedLanguage: value,
    });
    await this.props.changeLanguage(value);
    this.setState({
      languages:[
        {
          label: strings.english,
          value: 'en',

        },
        {
          label: strings.spanish,
          value: 'es',
        },
        {
          label: strings.italian,
          value: 'it',
        },        
        {
          label: strings.german,
          value: 'de',
        },        
        {
          label: strings.portuguese,
          value: 'pt',
        },        
        {
          label: strings.french,
          value: 'fr',
        },        
        {
          label: strings.finnish,
          value: 'fi',
        },        
        {
          label: strings.indonesian,
          value: 'id',
        },        
        {
          label: strings.dutch,
          value: 'nl',
        },        
        {
          label: strings.norwegian,
          value: 'no',
        },        
        {
          label: strings.polish,
          value: 'pl',
        },        
        {
          label: strings.thai,
          value: 'th',
        },        
        {
          label: strings.swedish,
          value: 'sv',
        },        
        {
          label: strings.japanese,
          value: 'ja',
        },        
        {
          label: strings.korean,
          value: 'ko',
        },        
        {
          label: strings.malay,
          value: 'ms',
        },        
        {
          label: strings.slovene,
          value: 'sl',
        },        
        {
          label: strings.serbian,
          value: 'sr',
        },        
        {
          label: strings.filipino,
          value: 'fil',
        },        
        {
          label: strings.icelandic,
          value: 'is',
        },        
        {
          label: strings.afrikaans,
          value: 'af',
        },        
        {
          label: strings.danish,
          value: 'da',
        },        
        {
          label: strings.swahili,
          value: 'sw',
        },        
        {
          label: strings.taiwanese,
          value: 'tw',
        },        
        {
          label: strings.mandarin,
          value: 'zh',
        },        
        {
          label: strings.cantonese,
          value: 'hk',
        },        
        {
          label: strings.bosnian,
          value: 'bo',
        },        
        {
          label: strings.croatian,
          value: 'hr',
        },        
        {
          label: strings.bulgarian,
          value: 'bg',
        },        
        {
          label: strings.vietnamese,
          value: 'vi',
        },        
 
      ]
    });
  }


  componentDidMount() {
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Container>
        <Header style={styles.headerStyle} iosBarStyle="light-content" androidStatusBarColor={mainTheme.mainColor}>
          <Left style={styles.drawerStyle}>
            <Icon style={styles.iconStyle} onPress={() => this.props.navigation.openDrawer()} type="MaterialIcons" name="menu" />
            <Text style={styles.headerText}>{strings.settings}</Text>
          </Left>
        </Header>
        <Content style={styles.contentStyle}>
          <Text style={styles.languageLabelStyle}>{strings.switchLanguage}</Text>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={(value) =>  this.onLanguageChange(value) }
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: config.deviceHeight * 0.02,
                right:config.deviceWidth * 0.02,
              },
            }}
            items={this.state.languages}
            useNativeAndroidPickerStyle={false}
            InputAccessoryView={() => null}
            value={this.state.selectedLanguage}
            Icon={() => {
              return <View><Icon type="Entypo" style={styles.chevronStyle} name="chevron-down" /></View>
            }}
          />
         {/* <Text style={styles.languageLabelStyle}>{strings.changeTheme}</Text>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => { this.onThemeChange(value) }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: config.deviceHeight * 0.02,
                right:config.deviceWidth * 0.02,
              },
            }}
            items={[{label:strings.darkTheme,value:"dr"},{label:strings.blueTheme,value:"bl"}]}
            useNativeAndroidPickerStyle={false}
            InputAccessoryView={() => null}
            value={this.state.selectedTheme}
            Icon={() => {
              return <View><Icon type="Entypo" style={styles.chevronStyle} name="chevron-down" /></View>
            }}
          /> */}
        </Content>
      </Container>


    );
  }
}
const mapDispatchToProps = ({ auth: { changeLanguage }}) => ({
  changeLanguage: (lang) => changeLanguage(lang),
  // changeTheme:(theme) => changeTheme(theme)
});
const mapState = state => ({
  currentUser: state.auth,
});
export default connect(mapState,mapDispatchToProps)(SettingsScreen);
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: mainTheme.mainColor,
    color: mainTheme.headerTextColor,
  },
  drawerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    color: mainTheme.drawerIconColor,
    paddingLeft: config.deviceWidth * 0.02,
    paddingRight: config.deviceWidth * 0.02
  },
  headerText: {
    marginLeft: config.deviceHeight * 0.02,
    fontSize: config.deviceWidth * 0.05,
    fontWeight:'500',
    color:mainTheme.tabHeading
  },
  cardItemStyle: {
    borderColor: mainTheme.mainColor,
    backgroundColor: mainTheme.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  contentStyle: {
    paddingTop: config.deviceWidth * 0.02,
    paddingLeft: config.deviceWidth * 0.02,
    paddingRight: config.deviceWidth * 0.02,
    backgroundColor: mainTheme.mainColor
  },
  cardStyle: {
    backgroundColor: mainTheme.mainColor,
    borderColor: mainTheme.mainColor,
  },
  languageLabelStyle: {
    textAlign: 'center',
    paddingVertical: config.deviceHeight * 0.02,
    color: mainTheme.settingsScreenLanguageColor,
    fontSize: config.deviceWidth * 0.04
  },
  chevronStyle: {
    fontSize: config.deviceWidth * 0.08,
    color: mainTheme.settingsScreenLanguageColor,

  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: config.deviceWidth * 0.04,
    paddingVertical: config.deviceHeight * 0.02,
    paddingHorizontal: config.deviceWidth * 0.02,
    borderWidth: 1,
    backgroundColor: mainTheme.backgroundColor,
    borderColor: mainTheme.backgroundColor,
    borderRadius: 4,
    color: mainTheme.settingsScreenLanguageColor,
    paddingRight: config.deviceWidth * 0.08, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: config.deviceWidth * 0.04,
    paddingHorizontal: config.deviceWidth * 0.02,
    paddingVertical: config.deviceHeight * 0.02,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: mainTheme.backgroundColor,
    borderColor: mainTheme.backgroundColor,
    borderRadius: 8,
    color: mainTheme.settingsScreenLanguageColor,
    paddingRight: config.deviceWidth * 0.08, // to ensure the text is never behind the icon
  },
});