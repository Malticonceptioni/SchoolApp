
//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage, BackHandler, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
// Dummy Data
import Dummydata from './dummy';
import Media from './Media';
import Global from './Global';
import CardView from 'react-native-cardview';
import { FloatingAction } from "react-native-floating-action";
// import Toast from 'react-native-simple-toast';

// create a component
class ParentPage extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //constructor
    constructor(props) {
        super(props);

        this.state = {
            parentlist: [],
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.CallParentList();
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

    CallParentList() {
        let formdata = new FormData();
        // formdata.append("album_id", this.props.albumid)

        fetch('http://athrans.be/api/login/UserList', {
            method: 'POST',
            // body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == "1") {
                    var newdata = [];
                    tempdata = [];

                    responseJson.data.map((item, index) => {
                        newdata.push(item)
                    })
                    this.setState({
                        parentlist: newdata
                    })

                } else {
                    Toast.show(responseJson.message);
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
            });
    }

    render() {
        return (
            <View style={styles.container}>

                {/* Custom view for Toolbar Header */}
                <LinearGradient useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={[Global.FirstColor, 'white']} style={{ height: 56 }} >
                    <View style={{ height: 56, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}
                            style={{ justifyContent: 'center', left: 8, height: 42, width: 50, position: 'absolute', paddingHorizontal: 4 }}>
                            <Image
                                style={{ height: 26, width: 26 }}
                                source={require('../images/back.png')}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Parents</Text>
                    </View>
                </LinearGradient>



                {/* Use Number of columns for grid */}
                <FlatList
                    marginTop={10}
                    marginLeft={10}
                    marginRight={10}
                    numColumns={2}
                    data={this.state.parentlist}
                    renderItem={({ item }) => (

                        <View style={{
                            margin: '2%', width: '47%', height: 150, shadowColor: '#000', shadowOpacity: 0.5,
                            shadowRadius: 8,
                            borderRadius: 8,
                            elevation: 2,
                            backgroundColor: '#fff'
                        }}>

                            <TouchableOpacity
                            // onPress={() => { Actions.ChatPage({var_name:item.var_username}) }}>
                            >

                                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', marginLeft: 6, marg: 6 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 8, marginRight: 8 }}>
                                        <Image style={{ width: 14, height: 14 }}
                                            source={require('../images/parents.png')} />
                                        <Text style={{ marginLeft: 8, fontSize: 16, fontFamily: Global.SnigletRegularfont, color: '#0C4C8A' }}>{item.var_username} {item.var_lname}</Text>
                                    </View>

                                    <Text style={{ marginTop: 16, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor, textAlign: 'center' }}>{item.var_children}</Text>

                                    <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont, textAlign: 'center' }}>{item.var_phone}</Text>

                                    <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont, textAlign: 'center' }}>{item.var_email}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    )} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Actions.AddParentPage()}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        source={require('../images/addbutton.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardViewStyle: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'column',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        borderRadius: 25,
        backgroundColor: '#01a7a5'

    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        //backgroundColor:'black'
    },
});

//make this component available to the app
export default ParentPage;
