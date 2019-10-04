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
  BackHandler
} from 'react-native';
import Media from './Media';

import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux';
import { arrowFunctionExpression } from '@babel/types';


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
    resizeMode: 'cover', // or 'stretch'
  },
  // logoImage:
  // {
  // width: 110,
  // height: 110,
  // justifyContent:'flex-end',
  // alignItems:'flex-end',
  // alignContent:'flex-end'
  // },
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
    fontSize: 20,
    color: '#0C4C8A',
    right: 20,
    fontFamily: Global.FontName,
  },

})

class InitalLoginPage extends React.Component {

//constructor
constructor(props) {
  super(props)
  this.state = {
    email: '',
    password: '',
    emailopacity: 0,
    passwordopacity: 0,
    isProfessor:'true'
  }
}

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  GotoProfessorLoginPage()
  {
    Actions.LoginPage({isProfessor:'true'});
  }

  GotoParentLoginPage()
  {
    Actions.LoginPage({isProfessor:'false'});
  }


  backPressed = () => {
    BackHandler.exitApp();
    // this.props.navigation.goBack();
    return true;
  }


  render() {

    return (
      <View style={styles.container}>

        <Image style={styles.backgroundImage} source={Media.SplashImage} />

        <View style={styles.innerContainer}>

          <Text style={styles.headerTitle}>{Global.appName}</Text>

          <Text style={styles.subheaderTitle}>Logged in as</Text>

          <View >

            <View style={{
              marginTop: 16, borderRadius: 10, backgroundColor: '#ffff', flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,
            }}>
              <TouchableOpacity onPress={() => this.GotoParentLoginPage()} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={Media.ParentsImage} style={{ width: 100, height: 100 }} />
                  <Text style={{
                    textAlign: 'center',
                    marginLeft: 20,
                    fontSize: 20,
                    color: '#0C4C8A',
                    fontFamily: Global.FontName,
                  }}>Parent</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{
              marginTop: 16, borderRadius: 10, backgroundColor: '#ffff', flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,
            }}>
              <TouchableOpacity onPress={() => {this.GotoProfessorLoginPage()}} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image source={Media.TeacherImage} style={{ width: 80, height: 100 }} />
                  <Text style={{
                    textAlign: 'center',
                    marginLeft: 20,
                    marginRight: 20,
                    fontSize: 20,
                    color: '#0C4C8A',
                    fontFamily: Global.FontName,
                  }}>Professor</Text>
                </View>
              </TouchableOpacity>
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

export default InitalLoginPage;