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
  ScrollView,
  CheckBox,
  Alert
} from 'react-native';
import Media from './Media';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import ProgressLoader from 'rn-progress-loader';

// import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  innerContainer: {
    // position: 'absolute',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
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
    marginTop: 70,
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
    marginBottom: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 10
  },
})

class ParentRegistrationPage extends React.Component {

  //constructor
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      childfirstname: '',
      childlastname: '',
      phonenumber: '',
      email: '',
      password: '',
      confrmpassowrd: '',
      emailopacity: 0,
      passwordopacity: 0,
      studentlist: [],
      drop_down_data_stundent: [],
      classlist: [],
      drop_down_data_class: [],
      professorlist: [],
      visibleindicator: false,
      isAccept:false
    }
  }

  componentDidMount() {
    this.CallStudentList();
    this.CallClassList();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }


  backPressed = () => {
    // BackHandler.exitApp();
    this.props.navigation.goBack();
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

  //check data validation on submit
  finalSubmit() {
    if (this.state.firstname.length == 0) {
      Toast.show('Enter Nom');
    }
    else  if (this.state.lastname.length == 0) {
      Toast.show('Enter Prenom');
    }
    else if (this.state.phonenumber.length == 0) {
      Toast.show('Enter Téléphone');
    }
    else if (this.state.email.length == 0) {
      Toast.show('Enter Email');
    }
    else if (this.state.emailopacity == 0) {
        Toast.show('Enter Correct Email');
    }
    else if (this.state.password.length == 0) {
      Toast.show('Enter Mot de passe');
    }
    else if (this.state.confrmpassowrd.length == 0) {
      Toast.show('Enter Confirmation du mot de passe');
    }
    else if(this.state.password!=this.state.confrmpassowrd)
    {
      Toast.show('Enter Confirmation du mot de passe same as mot de passe');
    }
    else if(this.state.isAccept)
    {
      Toast.show('Please accept terms and condition');
    }
    // else if (this.state.passwordopacity == 0) {
    //     Toast.show('Password must have one capital letter, one special character, one numeric value and length must 8 character');
    // }
    else {
    this.props.navigation.goBack();
    // put api call here you can use fetch for call api.
    }
  }

  CallClassList() {
    this.setState({ visibleindicator: true })
    let formdata = new FormData();
    formdata.append("search", '')
    formdata.append("fk_professor", '1')
    formdata.append("fk_class", '1')

    fetch('http://athrans.be/api/login/ClassList', {
      method: 'POST',
      body: formdata,
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == "1") {
          var newdata = [];
          var newdata_drop_down = [];

          //whole item array
          responseJson.data.map((item, index) => {
            newdata.push(item)
            newdata_drop_down.push({ value: item.var_classname })
          })

          this.setState({
            studentlist: newdata,
            drop_down_data_class: newdata_drop_down
          })

          this.setState({ visibleindicator: false })

        } else {
          this.setState({ visibleindicator: false })
          Toast.show('' + responseJson.message);
          this.setState({
            studentlist: []
          })


        }
      })
      .catch((error) => {
        this.setState({ visibleindicator: false })
        console.error(error);
        Alert.alert(error.stringify());
      });
  }

  CallStudentList() {
    let formdata = new FormData();
    formdata.append("search", '')
    formdata.append("fk_professor", '1')
    formdata.append("fk_class", '1')

    fetch('http://athrans.be/api/login/StudentList', {
      method: 'POST',
      body: formdata,
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == "1") {
          var newdata = [];
          var newdata_drop_down = [];

          //whole item array
          responseJson.data.map((item, index) => {
            newdata.push(item)
            newdata_drop_down.push({ value: item.var_lname })
          })

          this.setState({
            studentlist: newdata,
            drop_down_data_stundent: newdata_drop_down
          })

        } else {
          Toast.show('' + responseJson.message);
          this.setState({
            studentlist: []
          })

        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error.stringify());
      });
  }

  render() {

    return (
      <View>

        <ProgressLoader
          visible={this.state.visibleindicator}
          isModal={true} isHUD={true}
          hudColor={Global.SecondColor}
          color={"#FFFFFF"} />
        <Image style={styles.backgroundImage} source={Media.SplashImage} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.headerTitle}>{Global.appName}</Text>
              <Text style={styles.subheaderTitle}>Sign Up</Text>
              <View>
                <View style={styles.cardViewStyle}>
                  <View>

                    <Dropdown
                      label="Classe"
                      data={this.state.drop_down_data_class}
                      baseColor={Global.FirstColor}
                      style={{ marginLeft: 3 }} />

                    <Dropdown
                      label="l'enfant"
                      data={this.state.drop_down_data_stundent}
                      baseColor={Global.FirstColor}
                      style={{ marginLeft: 3 }} />


                    {/* First name */}
                    <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                      <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont }}
                        onChangeText={(firstname) => {
                          this.setState({ firstname: firstname });
                        }}
                        returnKeyType='next'
                        placeholder='Nom'
                        keyboardType='text'
                        autoCapitalize='none'
                        value={this.state.firstname} />
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.emailopacity }}
                                    source={require('../img/right.png')} /> */}
                      <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                    </View>

                    {/* last name */}
                    <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                      <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                        onChangeText={(lastname) => {
                          this.setState({ lastname: lastname });
                        }}
                        returnKeyType='next'
                        placeholder='Prénom'
                        keyboardType='ascii-capable'
                        autoCapitalize='none'
                        value={this.state.lastname} />
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.emailopacity }}
                                    source={require('../img/right.png')} /> */}
                      <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                    </View>



                    {/* Phone number */}
                    <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                      <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                        onChangeText={(phonenumber) => {
                          // this.validateEmail(phonenumber);
                          this.setState({ phonenumber: phonenumber });
                        }}
                        returnKeyType='next'
                        placeholder='Téléphone'
                        keyboardType='phone-pad'
                        maxLength={10}
                        autoCapitalize='none'
                        value={this.state.phonenumber} />
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.emailopacity }}
                                    source={require('../img/right.png')} /> */}
                      <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                    </View>

                    {/* Email */}
                    <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                      <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                        onChangeText={(email) => {
                          this.validateEmail(email);
                          this.setState({ email: email });
                        }}
                        returnKeyType='next'
                        placeholder='Email'
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
                        placeholder='Mot de passe'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={this.state.password} />
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.passwordopacity }}
                                    source={require('../img/right.png')} /> */}
                      <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                    </View>

                    {/*Confirm Password */}
                    <View style={{ marginTop: 12, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                      <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }}
                        onChangeText={(confrmpassowrd) => {
                          this.validatePassword(confrmpassowrd);
                          this.setState({ confrmpassowrd: confrmpassowrd });
                        }}
                        returnKeyType='next'
                        placeholder='Confirmation du mot de passe'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={this.state.confrmpassowrd} />
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.passwordopacity }}
                                    source={require('../img/right.png')} /> */}
                      <View style={{ backgroundColor: '#8db9d8', width: '100%', alignSelf: 'center', height: 0.5 }} />
                    </View>

                    {/*Checkbox for condition */}
                    <View style={{ padding: 12, alignSelf: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                      <CheckBox
                        value={this.state.isAccept}
                        onValueChange={() => this.setState({ isAccept: !this.state.isAccept })}
                      />
                      <Text style={{ marginTop: 5 }}>J'accepte que les photos de mon enfants soit partagée entre parent et tous membre de l'institue}</Text>
                      {/* <Image style={{ position: 'absolute', right: 20, width: 24, height: 24, opacity: this.state.passwordopacity }}
                                    source={require('../img/right.png')} /> */}
                    </View>

                    {/* Submit */}
                    <TouchableOpacity onPress={() => { this.finalSubmit() }} style={{
                      alignSelf: 'center', marginTop: 32, marginBottom: 8, backgroundColor: '#01a7a5',
                      borderRadius: 6, paddingHorizontal: 32, paddingVertical: 8
                    }}>
                      <Text style={{
                        fontSize: 16, color: '#ffffff', fontFamily: Global.FontName,
                      }}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

      </View>
    );
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

export default ParentRegistrationPage;
