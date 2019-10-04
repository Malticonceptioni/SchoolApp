
//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage, BackHandler, Alert, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
// Dummy Data
import Dummydata from './dummy';
import Media from './Media';
import Global from './Global';
import CardView from 'react-native-cardview';
import { FloatingAction } from "react-native-floating-action";
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';

// create a component
class StudentListPage extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //constructor
    constructor(props) {
        super(props);

        this.state = {
            studentlist: [],
            professor_id: '',
            searchtext: '',
            visibleindicator:false
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.getStorage();
        this.CallStudentList();
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

    async getStorage() {
        const professor_id = await AsyncStorage.getItem('isUserid');
        // const Name = JSON.parse( AsyncStorage.getItem('Name'));
        this.setState({ professor_id: professor_id })
    }

    CallStudentList() {
        this.setState({visibleindicator:true})
        let formdata = new FormData();
        formdata.append("search", this.state.searchtext)
        formdata.append("fk_professor", this.props.albumid)
        formdata.append("fk_class", this.props.albumid)

        fetch('http://athrans.be/api/login/StudentList', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == "1") {
                    var newdata = [];
                    tempdata = [];

                    responseJson.data.map((item, index) => {
                        newdata.push(item)
                    })
                    this.setState({
                        studentlist: newdata
                    })
                    this.setState({visibleindicator:false})
                } else {
                    Toast.show('' + responseJson.message);
                    this.setState({
                        studentlist: []
                    })
                    this.setState({visibleindicator:false})
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
                this.setState({visibleindicator:false})
            });
    }

    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={styles.MainContainer}>
                <Text style={{ textAlign: 'center' }}>No Data Found</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>

                <ProgressLoader
                    visible={this.state.visibleindicator}
                    isModal={true} isHUD={true}
                    hudColor={Global.SecondColor}
                    color={"#FFFFFF"} />

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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Students</Text>
                    </View>
                </LinearGradient>


                <View style={{
                    margin: 10, paddingLeft: 8, paddingBottom: 4, paddingTop: 4, paddingRight: 8, shadowColor: '#000', shadowOpacity: 0.5,
                    shadowRadius: 8,
                    borderRadius: 8,
                    elevation: 2,
                    backgroundColor: '#fff'
                }}>
                    <TextInput style={{ width: '100%', alignSelf: 'center', fontSize: 14, fontFamily: Global.SnigletRegularfont, }}
                        onChangeText={(searchtext) => {

                            this.setState({ searchtext: searchtext });
                            this.CallStudentList();
                        }}
                        returnKeyType='next'
                        placeholder='Student name here...'
                        keyboardType='text'
                        autoCapitalize='none'
                        value={this.state.searchtext} />
                </View>

                {/* Use Number of columns for grid */}
                <FlatList
                    marginTop={10}
                    marginLeft={10}
                    marginRight={10}
                    numColumns={2}
                    data={this.state.studentlist}
                    ListEmptyComponent={this.ListEmpty}
                    renderItem={({ item }) => (

                        <View style={{
                            margin: '2%', width: '47%', height: 150, shadowColor: '#000', shadowOpacity: 0.5,
                            shadowRadius: 8,
                            borderRadius: 8,
                            elevation: 2,
                            backgroundColor: '#fff'
                        }}>

                            <TouchableOpacity
                                onPress={() => { Actions.ParentDetailPage({ var_name: item.var_username }) }}>

                                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', marginLeft: 6, marg: 6 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 8, marginRight: 8 }}>
                                        <Image style={{ width: 15, height: 15 }}
                                            source={require('../images/stundent.png')} />
                                        <Text style={{ marginLeft: 8, fontSize: 16, fontFamily: Global.SnigletRegularfont, color: '#0C4C8A' }}>{item.var_fname} {item.var_lname}</Text>
                                    </View>

                                    <Text style={{ marginTop: 16, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor, textAlign: 'center' }}>Classe {item.fk_class}</Text>

                                    <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont, textAlign: 'center' }}>{item.dt_bdate}</Text>

                                    <Text style={{ fontSize: 12, fontFamily: Global.SnigletRegularfont, textAlign: 'center' }}>Parent name</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    )} />

                {/* <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Actions.AddStudentPage()}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        source={require('../images/addbutton.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity> */}
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
export default StudentListPage;
