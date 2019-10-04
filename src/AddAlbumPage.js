//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, TextInput, BackHandler, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker'
// import Toast from 'react-native-simple-toast';

// create a component
class AddAlbumPage extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    constructor(props) {
        super(props)

        this.Dummydata = [
            {
                // modificationDate: '1569237686000',
                // size: 18372,
                // mime: 'image/png',
                // height: 416,
                // width: 424,
                path: require('../images/big_plus.png'),
                value: 0,
            },
        ]

        this.state = {
            title: '',
            description: '',
            date: '',
            arrayHolder: [],
            // value: '',
            // path: '',
            images: [],
            date: ""
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
        if (value == 1) {
            Actions.AlbumPhotoDetailPage({ isAddAlbum: 'true' })
        }
        else if (value == 0) {
            //pick images
            ImagePicker.openPicker({
                multiple: true
            }).then(images => {

                console.log('+++++', images.length);

                //add items in generic arraylist
                for (let i = 0; i < images.length; i++) {
                    const obj = { 'path': images[i].path, 'value': '1' };
                    this.setState({
                        arrayHolder: [...this.state.arrayHolder, obj]
                    });
                }
            });
        }
        else {
            Actions.AlbumPhotoDetailPage({ isAddAlbum: 'true' })
            // this.props.navigation.navigate('AlbumPhotoDetailPage',{isAddAlbum: 'true'});
        }
    }

    removeIamge(e) {
        //remove item from array
        var array = [...this.state.arrayHolder]; // make a separate copy of the array
        var index = e;
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ arrayHolder: array });
        }
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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Add Album</Text>
                    </View>
                </LinearGradient>

                {/* Comments listing */}
                <ScrollView>
                    <View style={{ marginTop: 12, marginLeft: 12, marginRight: 12, marginBottom: 60 }}>


                        {/* Event date */}
                        <Text style={{fontFamily: Global.SnigletRegularfont, fontSize: 16, color: Global.FirstColor }}>Event Date</Text>
                        <DatePicker
                            style={{ width: 200,marginTop:4 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="Select event date"
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
                        {/* Album Title */}
                        <Text style={{ marginTop:12,fontFamily: Global.SnigletRegularfont, fontSize: 16, color: Global.FirstColor }}>Title</Text>
                        <TextInput style={{ marginTop: 4, width: '100%', fontSize: 14, textAlignVertical: "center", height: 40, fontFamily: Global.SnigletRegularfont, borderRadius: 5, backgroundColor: '#ffff', elevation: 2, paddingTop:4,paddingLeft:12,paddingRight:12,paddingBottom:4}}
                            onChangeText={(title) => {
                                this.setState({ title: title });
                            }}
                            returnKeyType='next'
                            placeholder='Enter album title here...'
                            autoCapitalize='none'
                            value={this.state.title} />



                        {/* Album Decription */}
                        <Text style={{ marginTop: 12, fontFamily: Global.SnigletRegularfont, fontSize: 16, color: Global.FirstColor }}>Description</Text>
                        <TextInput style={{ marginTop: 4, width: '100%', height: 120, textAlignVertical: "top", fontSize: 14, fontFamily: Global.SnigletRegularfont, borderRadius: 5, backgroundColor: '#ffff', elevation: 2, padding:12 }}
                            onChangeText={(description) => {
                                this.setState({ description: description });
                            }}
                            returnKeyType='next'
                            placeholder='Enter album description here...'
                            autoCapitalize='none'
                            value={this.state.description} />

                        {/* Album photos */}
                        <Text style={{ marginTop: 12, fontFamily: Global.SnigletRegularfont, fontSize: 16, color: Global.FirstColor }}>Album Photo's</Text>

                        <FlatList
                            numColumns={3}
                            data={this.state.arrayHolder}
                            renderItem={({ item, index }) => (
                                <View style={{ width: '31%', margin: '1%' }}>

                                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.PerformAction(item.value) }}>
                                        <Image
                                            style={{
                                                marginTop: 8, marginRight: 4,
                                                width: '90%', height: 110, borderRadius: 5, backgroundColor: '#ffff', elevation: 2,
                                                justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#F8F8F8'
                                            }}
                                            source={item.value == 0 ?
                                                item.path : { uri: item.path }
                                            }
                                            resizeMode={'cover'}
                                        />
                                    </TouchableOpacity>
                                    {item.value == 0 ? null :
                                        <TouchableOpacity style={{ right: 0, position: 'absolute', width: 20, height: 20 }} onPress={() => this.removeIamge(index)}>
                                            <Image source={require('../images/cancel.png')} style={{ width: 20, height: 20 }} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            )}
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
        flexDirection: 'column'
    },
});

//make this component available to the app
export default AddAlbumPage;
