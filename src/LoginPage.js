/**
 * @flow
 * @providesModule SplashScreenView
 */

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  BackHandler,
  Alert
} from 'react-native';
import Media from './Media';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux';
import ProgressLoader from 'rn-progress-loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'absolute',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', height: '100%',
    resizeMode: 'cover',  // or 'stretch'
  },
  logoImage:
    {
      width: 120,
      height: '100%'
    },
  subheaderTitle: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Global.SnigletRegularfont,
    color: Global.FirstColor
  },
  headerTitle: {
    fontSize: 30,
    color: '#D13076',
    textAlign: 'center',
    fontFamily: Global.FontName,
  },
  descTitle: {
    marginTop: 50,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 30,
    right: 10,
    fontFamily: Global.FontName,
  },
  cardViewStyle: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10
  },
})

class LoginPage extends React.Component {

  //constructor
  constructor(props) {
    super(props)
    this.state = {
      // email: 'testbyconceptioni@gmail.com',
      // password: 'Test@123',
      email: '',
      password: '',
      emailopacity: 0,
      passwordopacity: 0,
      isProfessor: 'true',
      visibleindicator:false
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isProfessor: this.props.isProfessor })
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }



  //validate email
  validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(value))
      this.setState({ emailopacity: 1 })
    else
      this.setState({ emailopacity: 0 })
  }
  //validate password
  validatePassword(value) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regex.test(value)) {
      this.setState({ passwordopacity: 1 })
    }
    else {
      this.setState({ passwordopacity: 0 })
    }
  }
  // Hide Navigation Bar
  static navigationOptions = { header: null }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  //check data validation on submit
  finalSubmit() {
    if (this.state.email.length == 0) {
      Toast.show('Enter Email');
    }
    else if (this.state.emailopacity == 0) {
      Toast.show('Enter Correct Email');
    }
    else if (this.state.password.length == 0) {
      Toast.show('Enter Password');
    }
    // else if (this.state.passwordopacity == 0) {
    //   Toast.show('Password must have one capital letter, one special character, one numeric value and length must 8 character');
    // }
    else {
      // put api call here you can use fetch for call api.
      // this.gotoHome()
      this.CallLoginAPI();

    }
  }

  CallLoginAPI() {

    this.setState({visibleindicator:true})

    let formdata = new FormData();
    formdata.append("var_email", this.state.email)
    formdata.append("var_password", this.state.password)
    formdata.append("type", this.state.isProfessor=='true'?'P':'U')

    // Alert.alert(this.state.email+"---"+this.state.password+'---'+this.state.isProfessor)

    fetch('http://athrans.be/api/login/Check_Login', {
      method: 'POST',
      body: formdata,
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.success=="1") {
          this.setState({visibleindicator:false})
          AsyncStorage.setItem('isUserid', responseJson.data.int_glcode);
          AsyncStorage.setItem('varName', responseJson.data.var_name);
          AsyncStorage.setItem('isLogin', 'true');
          AsyncStorage.setItem('isProfessor',this.state.isProfessor);
        
          // this.setState({ indicator: false })
          // Actions.home();
          this.gotoHome()
        }
        else {
          Toast.show(responseJson.message);
          this.setState({visibleindicator:false})
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({visibleindicator:false})
        Toast.show(JSON.stringify(error));
      });
  }

  gotoHome() {
    if (this.state.isProfessor == 'true') {
      Actions.ProfessorHomePage();
    }
    else {
      Actions.ParentHomePage();
    }
  }

  render() {
    { console.log('00000_construcrtor', this.state.isAddAlbum) }
    return (
      <View style={styles.container}>

        <Image style={styles.backgroundImage} source={Media.SplashImage} />

         <ProgressLoader
                visible={this.state.visibleindicator}
                isModal={true} isHUD={true}
                hudColor={Global.SecondColor}
                color={"#FFFFFF"} />

        <View style={styles.innerContainer}>

          <Text style={styles.headerTitle}>{Global.appName}</Text>

          <Text style={styles.subheaderTitle}>Log in</Text>

          <View style={{ flex: 2, flexDirection: 'column' }}>

            <View style={styles.cardViewStyle}>
              <View >
                {/* Email */}
                <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                  <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                    onChangeText={(email) => {
                      this.validateEmail(email);
                      this.setState({ email: email });
                    }}
                    returnKeyType='next'
                    placeholder='Email Id'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.email} />
                  {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.emailopacity }}
                                    source={require('../img/right.png')} /> */}
                  <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                </View>


                {/* Password */}
                <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                  <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                    onChangeText={(password) => {
                      this.validatePassword(password);
                      this.setState({ password: password });
                    }}
                    returnKeyType='next'
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={this.state.password} />
                  {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.passwordopacity }}
                                    source={require('../img/right.png')} /> */}
                  <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                </View>

                {/* Forgot Password */}
                <Text style={{
                  fontSize: 12, color: '#2c3554', marginTop: 12, alignSelf: 'flex-end', paddingRight: 8, paddingVertical: 4, fontFamily: Global.SnigletRegularfont,
                }}>Forgot password?</Text>

                {/* Submit */}
                <TouchableOpacity onPress={() => { this.finalSubmit() }} style={{
                  alignSelf: 'center', marginTop: 32, marginBottom: 8, backgroundColor: '#01a7a5',
                  borderRadius: 6, paddingHorizontal: 32, paddingVertical: 8
                }}>
                  <Text style={{
                    fontSize: 16, color: '#ffffff', fontFamily: Global.FontName,
                  }}>Login</Text>
                </TouchableOpacity>

                {/* Register here */}
                {this.state.isProfessor == 'true' ? null :
                  <TouchableOpacity onPress={() => { Actions.ParentRegistrationPage() }} >
                    <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                      <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont }}>Don't have an account? </Text>
                      <Text style={{ padding:6,fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#FFFFFF', backgroundColor:'pink'}}>S'inscrire</Text>
                    </View>
                  </TouchableOpacity>
                }

              </View>

            </View>

          </View>

        </View>

      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.auth.isFetching,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => { dispatch(autoLogin()); },
    loginFail: () => {
      dispatch({ type: "AUTO_LOGIN_ERROR" });
    },
  };
};

export default LoginPage;
