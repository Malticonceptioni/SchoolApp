
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
class ApproveParentPage extends Component {

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
                        <Text style={{ alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Approve Parent</Text>
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

                        // <
                        //     <View style={{  width:'49%',margin:'1%',flex: 1, flexDirection: 'row' }}>

                        //         <Image style={{ marginLeft: 10, right: 10, width: 14, height: 14, opacity: this.state.emailopacity }}
                        //             source={require('../images/parents.png')} />
                        //         <Text style={{ fontSize: 16,textAlignVertical:'center', fontFamily: Global.SnigletRegularfont,color:'#0C4C8A' }}>Liza Koshy</Text>
                        //     </View>

                        //     <View style={{ marginTop: 6, flex: 1, flexDirection: 'row' }}>
                        //         <Text style={{ fontSize: 14,textAlignVertical:'center', fontFamily: Global.SnigletRegularfont,color:Global.SecondColor}}>Robin Koshy</Text>
                        //     </View>
                        //     <View style={{ marginTop: 2, flex: 1, flexDirection: 'row' }}>
                        //         <Text style={{ fontSize: 12,textAlignVertical:'center', fontFamily: Global.SnigletRegularfont}}>1234567890</Text>
                        //     </View>
                        //     <View style={{ marginTop: 2, flex: 1, flexDirection: 'row' }}>
                        //         <Text style={{ fontSize: 12,textAlignVertical:'center', fontFamily: Global.SnigletRegularfont}}>lizakoshy@gmail.com</Text>
                        //     </View>
                        // </View>

                        <View style={{
                            margin: '2%', height: 150, shadowColor: '#000', shadowOpacity: 0.5,
                            shadowRadius: 8,
                            borderRadius: 8,
                            elevation: 2,
                            backgroundColor: '#fff'
                        }}>

                            <View style={{ width: '100%', position: 'absolute', bottom: 0,flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 1, padding: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',backgroundColor:'#F0F0F0' ,borderBottomLeftRadius:8}}>
                                    {/* <Image
                                        style={{ height: 12, width: 12 }}
                                        source={require('../images/calendar.png')} /> */}
                                    <Text style={{ marginLeft: 10, fontSize: 16, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, padding: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',backgroundColor:Global.SecondColor ,borderBottomRightRadius:8}}>
                                    {/* <Image
                                        style={{ height: 12, width: 12 }}
                                        source={require('../images/albums.png')} /> */}
                                    <Text style={{ numberOfLines: '2', ellipsizeMode: 'end', marginLeft: 8, fontSize: 16, fontFamily: Global.SnigletRegularfont, color: '#F0F0F0' }}>Accept</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: '100%', marginLeft: 12, marginRight: 12, marginTop: 12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 14, height: 14, marginRight: 10 }}
                                        source={require('../images/parents.png')} />
                                    <Text style={{ fontSize: 16, fontFamily: Global.SnigletRegularfont, color: '#0C4C8A' }}>Liza Koshy</Text>
                                </View>

                                <Text style={{ marginTop: 10, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>Robin Koshy</Text>

                                <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont, }}>1234567890</Text>

                                <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont }}>lizakoshy@gmail.com</Text>


                            </View>

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
export default ApproveParentPage;
