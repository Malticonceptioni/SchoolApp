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
  XMLHttpRequest
} from 'react-native';
import Media from './Media';
import Global from './Global';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', height: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
  headerTitle: {
    marginTop: 150,
    position: 'absolute',
    fontSize: 30,
    color: '#D13076',
    textAlign: 'center',
    fontFamily: Global.FontName,
  },
  descTitle: {
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    color: '#ffffff',
    bottom: 8,
    fontSize: 16
  }
})

class SplashPage extends React.Component {

  componentWillMount() {
    // Orientation.lockToPortrait()
    setTimeout(() => {
      this.GotoNextPage();
    }, 600);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.GotoNextPage();
    }, 600);
  }

  async GotoNextPage() {
    const value = await AsyncStorage.getItem('isLogin');
    const isProfessor = await AsyncStorage.getItem('isProfessor');
    // alert(value+"-----"+isProfessor)
    if (value) {
      if (isProfessor=='true') {
        Actions.ProfessorHomePage();
      }
      else {
        Actions.ParentHomePage();
      }
    }
    else {
      Actions.InitalLoginPage();
    }
  }
  // componentDidMount(){
  //   var xmlhttp1 = new XMLHttpRequest();
  //       xmlhttp1.open('POST', 'https://ucf6-zhfb-fa-ext.oracledemos.com/rcvProcessor/ProcessorServiceV2?WSDL', true);

  //       var body1 =
  //           "<soapenv:Envelope"
  //           +"xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'" 
  //           +"xmlns:typ='http://xmlns.oracle.com/apps/scm/receiving/receiptsInterface/transactions/processorServiceV2/types/'" 
  //           +"xmlns:proc='http://xmlns.oracle.com/apps/scm/receiving/receiptsInterface/transactions/processorServiceV2/'>"
  //           +"<soapenv:Header/>"
  //           +"<soapenv:Body>"
  //               +"<typ:processorAsync>"
  //                   +"<typ:Receipt>"
  //                       +"<proc:VendorName>Office Depot</proc:VendorName>"
  //                       +"<proc:VendorNumber>1264</proc:VendorNumber>"
  //                       +"<proc:TransactionType>NEW</proc:TransactionType>"
  //                       +"<proc:BusinessUnit>US1 Business Unit</proc:BusinessUnit>"
  //                       +"<proc:BUId>300000046987012</proc:BUId>"
  //                       +"<proc:ShipToOrganizationId>300000047274444</proc:ShipToOrganizationId>"
  //                       +"<proc:ReceiptSourceCode>VENDOR</proc:ReceiptSourceCode>"
  //                       +"<proc:VendorId>300000047507596</proc:VendorId>"
  //                       +"<proc:VendorSiteId>300000047507684</proc:VendorSiteId>"
  //                       +"<proc:EmployeeId>300000047339511</proc:EmployeeId>"
  //                       +"<proc:ASNType>STD</proc:ASNType>"
  //                       +"<proc:StagedReceivingTransaction>"
  //                           +"<proc:Quantity>1</proc:Quantity>"
  //                           +"<proc:Amount>1</proc:Amount>"
  //                           +"<proc:AmountCurrency>USD</proc:AmountCurrency>"
  //                           +"<proc:TransactionDate>2019-09-24T00:00:00.0Z</proc:TransactionDate>"
  //                           +"<proc:DocumentNumber>162541</proc:DocumentNumber>"
  //                           +"<proc:DocumentLineNumber>1</proc:DocumentLineNumber>"
  //                           +"<proc:DocumentShipmentLineNumber>1</proc:DocumentShipmentLineNumber>"
  //                           +"<proc:DocumentDistributionNumber>1</proc:DocumentDistributionNumber>"
  //                           +"<proc:ItemDescription>Porta Desk Top-Opening Wirebound Notebook, Letter, College</proc:ItemDescription>"
  //                           +"<proc:TransactionType>RECEIVE</proc:TransactionType>"
  //                           +"<proc:AutoTransactCode>DELIVER</proc:AutoTransactCode>"
  //                           +"<proc:SoldtoLeId>300000046973970</proc:SoldtoLeId>"
  //                           +"<proc:SourceDocumentCode>PO</proc:SourceDocumentCode>"
  //                           +"<proc:ToOrganizationId>300000047274444</proc:ToOrganizationId>"
  //                       +"</proc:StagedReceivingTransaction>"
  //                   +"</typ:Receipt>"
  //               +"</typ:processorAsync>"
  //           +"</soapenv:Body>"
  //       +"</soapenv:Envelope>";

  //       xmlhttp1.onreadystatechange = function () {
  //           if (xmlhttp1.readyState == 4) {
  //               if (xmlhttp1.status == 200) {
  //                   resolve(xmlhttp1.responseText)
  //               } else {
  //                   alert(xmlhttp1.status)
  //                   reject("error ")
  //               }
  //           }
  //       }

  //       // Send the POST request
  //       xmlhttp1.setRequestHeader('Content-Type', 'text/xml');
  //       xmlhttp1.setRequestHeader('CharSet', 'charset=UTF-8');
  //       xmlhttp1.setRequestHeader('Content-Length', 1991);
  //       xmlhttp1.setRequestHeader('Connection', 'Keep-Alive');
  //       xmlhttp1.setRequestHeader('Authorization', 'Basic YW15Lm1hcmxpbjpjZ3o0OTk2NA==');
  //       xmlhttp1.setRequestHeader('SOAPAction', 'http://xmlns.oracle.com/apps/scm/receiving/receiptsInterface/transactions/processorServiceV2/processorAsync');
  //       xmlhttp1.setRequestHeader('Accept-Encoding', 'gzip,deflate');
  //       xmlhttp1.send(body1);
  // }

  render() {

    return (
      <View style={styles.container}>

        <Image style={styles.backgroundImage} source={Media.SplashImage} />
        <Text style={styles.headerTitle}>{Global.appName}</Text>
        <Text style={styles.descTitle}>lorem ipsum is dummy text</Text>
        {/* <Text style={styles.subTitle}>La Super Applix !</Text>
        <Text style={styles.descTitle}>Des jeux, des cadeaux, des vidéos super jolix!</Text> */}

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

// export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
export default SplashPage;
