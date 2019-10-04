
//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage, BackHandler } from 'react-native';
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
class ParentChatlist extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //constructor
    constructor() {
        super();
        this.state = {
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Chat</Text>
                    </View>
                </LinearGradient>



                {/* Use Number of columns for grid */}
                <FlatList
                    marginTop={10}
                    marginLeft={10}
                    marginRight={10}
                    numColumns={1}
                    data={Dummydata}
                    renderItem={({ item }) => (

                        <View style={{
                            margin:5,padding:8, shadowColor: '#000', shadowOpacity: 0.5,
                            shadowRadius: 8,
                            borderRadius: 8,
                            elevation: 2,
                            backgroundColor: '#fff',
                            justifyContent:'center'
                        }}>

                            <TouchableOpacity 
                                onPress={() => { Actions.ChatPage() }}>

                                <View style={{  marginLeft: 6 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 8, marginRight: 8 }}>
                                        <Image style={{ width: 30, height: 35 }}
                                            source={require('../images/teacher.png')} />
                                        <View style={{ marginLeft: 8, fontSize: 16,textAlignVertical:'bottom', fontFamily: Global.SnigletRegularfont, color: '#0C4C8A' }}>
                                        <Text style={{ marginLeft: 8, fontSize: 16,textAlignVertical:'bottom', fontFamily: Global.SnigletRegularfont, color: '#0C4C8A' }}>Liza Koshy</Text>
                                        <Text style={{ marginLeft: 8,fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>English</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                    )} />
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
export default ParentChatlist;
