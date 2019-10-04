/**
* @flow
* @providesModule Global
*/

import React from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native';

import media from './Media';

const fontName = Platform.OS === 'ios' ? 'Sniglet-ExtraBold' : 'Sniglet-ExtraBold';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
      return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
      ios: ifIphoneX(safe ? 44 : 30, 20),
      android: StatusBar.currentHeight
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

//const base_url = 'https://app.rikikx.sandbox.shiini.com/';//'https://app.rikikx.sandbox.shiini.com/';//'http://conceptioni.in/rikikix/';
const base_url = 'http://athrans.be/api/';
export const AlbumList = 'media/AlbumList';

export default Global = {
  appName:"Athénée Royale d'Alleur",
  FirstColor :  '#97D5E0',
  SecondColor : '#D13076',
  GreenColor:'#57B80F',
  RedColor:'#BFFF0000',
  RedColor : '#FC5130',
  OrangeColor : '#e9a12e',
  BackgroundColor : '#ecf0f1',
  ScreenWidth : Dimensions.get('window').width,
  ScreenHeight : Dimensions.get('window').height,
  FontName : fontName,
  SnigletRegularfont : 'Sniglet-Regular',
  LatoFont : 'Lato-Regular',
  LucidaFont : 'LucidaGrande',
  apiUrl : base_url,
  user_id : '',
  userPassword : '',
  userEmail : '',
  mainNavKey : null,
  sessionToken : '',
  validateEmail : (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  },
  token : '',
  HeaderColor : '#FC5130',
  categories : [],
  faceUrl : '',
  overlayView : null,
  getAvatar : (url) => {
    try {
      if(url.indexOf('http://') == 0 || url.indexOf('https://') == 0)
        return encodeURI(url);

      return encodeURI(base_url + '/public/assets/img/profile/' + url);
    } catch (error) {
      return encodeURI(url);
    }
  },
}

export const Media = media;

export const Styles = StyleSheet.create({
  searchBar: {
    height: 44,
    width: '100%',
  },
  material: {
    shadowColor: '#7f7f7f',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  headerButton : {
    fontSize : 14,
    fontWeight : '400',
    fontFamily : fontName,
    color : 'white',
    width : 50
  },
  headerImageButtonContainer : {
    width : 22,
    height : 42,
  },
  headerImageButton : {
    tintColor : 'white',
    width : 22,
    height : 22,
    resizeMode : 'contain'
  },
  headerTitle : {
    fontSize : 18,
    fontWeight : '500',
    fontFamily : fontName,
    alignItems : 'center',
    textAlign : 'center',
    textAlignVertical : 'center',
    color : 'white',
    position : 'absolute',
    left : 50, right : 50,
    bottom : 10
  },
  headerView : {
    width : Dimensions.get('window').width,
    height : 64 ,
    paddingTop : 20 ,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
  },
});