//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, TextInput, BackHandler, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
// import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown';
import ProgressLoader from 'rn-progress-loader';

// create a component
class AddParentPage extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    constructor(props) {
        super(props);

        this.Dummydata = [
            {
                // modificationDate: '1569237686000',
                // size: 18372,
                // mime: 'image/png',
                // height: 416,
                // width: 424,
                path: require('../images/janmastami.jpg'),
            },
        ]

        this.state = {
            title: '',
            description: '',
            date: '',
            arrayHolder: [],
            value: '',
            professor_id: '',
            classlist: [],
            studentlist: [],
            drop_down_data_stundent: [],
            visibleindicator:false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        this.getStorage();
        this.CallStudentList();
        this.setState({ arrayHolder: [...this.Dummydata] })
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

    PerformAction(value) {
        if (value == 0) {
            Actions.AlbumPhotoDetailPage();
        }
        else if (value == 1) {
            //pick images
            ImagePicker.openPicker({
                multiple: true
            }).then(images => {
                console.log(images);
                this.setState({ value: images[0].path });
                this.joinData;
            });
        }
        else {
            Actions.AlbumPhotoDetailPage();
        }
    }

    joinData = () => {

        this.array.push({ path: this.state.value });

        this.setState({ arrayHolder: [...this.array] })
        console.log(this.state.arrayHolder.length + "Yesss...........");
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

    //validate email
    validateEmail(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value))
            this.setState({ emailopacity: 1 })
        else
            this.setState({ emailopacity: 0 })
    }

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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Add Parent</Text>
                    </View>
                </LinearGradient>

                {/* Comments listing */}
                <ScrollView>
                    <View style={{ marginTop: 12, marginLeft: 12, marginRight: 12, marginBottom: 160 }}>

                        {/* <Dropdown
                            label="Classe"
                            data={this.setState.classlist}
                            baseColor={Global.FirstColor}
                            style={{ marginLeft: 3 }} /> */}

                        {/* <Dropdown
                            label="Professor"
                            data={this.setState.professorlist}
                            baseColor={Global.FirstColor}
                            style={{ marginLeft: 3 }} /> */}

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
                    </View>
                </ScrollView>
                <View style={{ width: '100%', marginTop: 10, position: 'absolute', backgroundColor: Global.SecondColor, borderColor: 'pink', flexDirection: 'row', bottom: 0, justifyContent: 'center' }}>
                    <Text style={{ hright: '100%', alignSelf: 'center', fontSize: 22, height: 50, textAlignVertical: 'center', fontFamily: Global.FontName, color: '#ffff' }}>SAVE</Text>
                </View>
            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
});

//make this component available to the app
export default AddParentPage;
