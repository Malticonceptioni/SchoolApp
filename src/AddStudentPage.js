//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, TextInput, BackHandler, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
// import Toast from 'react-native-simple-toast';

// create a component
class AddStudentPage extends Component {

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
            date: '',
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        this.setState({ arrayHolder: [...this.Dummydata] })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Add Student</Text>
                    </View>
                </LinearGradient>

                {/* Comments listing */}
                <ScrollView>
                    <View style={{ marginTop: 12, marginLeft: 12, marginRight: 12, marginBottom: 160 }}>

                        {/* First name */}
                        <Text style={{ marginLeft: 3, marginTop: 8, fontFamily: Global.SnigletRegularfont, fontSize: 12, color: Global.FirstColor }}>Nom</Text>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
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
                            <View style={{ marginLeft: 3, backgroundColor: Global.FirstColor, width: '100%', alignSelf: 'center', height: 0.5 }} />
                        </View>

                        {/* last name */}
                        <Text style={{ marginLeft: 3, marginTop: 12, fontFamily: Global.SnigletRegularfont, fontSize: 12, color: Global.FirstColor }}>Prénom</Text>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
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
                            <View style={{ marginLeft: 3, backgroundColor: Global.FirstColor, width: '100%', alignSelf: 'center', height: 0.5 }} />
                        </View>

                    
                        {/* Date of birth */}
                        <Text style={{ marginTop: 12, fontFamily: Global.SnigletRegularfont, fontSize: 16, color: Global.FirstColor }}>Date de naissance</Text>
                        <DatePicker
                            style={{ width: 200, marginTop: 4 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="Date de naissance"
                            format="DD-MM-YYYY"
                            // minDate="2016-05-01"
                            // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    backgroundColor: '#fff',
                                    fontSize: 14, fontFamily: Global.SnigletRegularfont, borderRadius: 5, elevation: 2
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
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
export default AddStudentPage;
