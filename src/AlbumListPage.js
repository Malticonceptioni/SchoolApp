//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage, BackHandler, Alert, Toast, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
// Dummy Data
import Dummydata from './dummy';
import Media from './Media';
import Global, { AlbumList } from './Global';
import CardView from 'react-native-cardview';
import { FloatingAction } from "react-native-floating-action";
import ProgressLoader from 'rn-progress-loader';

// import Toast from 'react-native-simple-toast';

// create a component
class AlbumListPage extends Component {

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //constructor
    constructor(props) {
        super(props)

        this.state = {
            isProfessor: 'false',
            isUserid: '',
            new_likestateus: '',
            album_data: [],
            entries: [],
            entries_like: [{ image: require('../images/like.png'), index: '1' }, { image: require('../images/heart.png'), index: '2' }],
            entries_unlike: [{ image: require('../images/like_gray.png'), index: '0' }, { image: require('../images/heart.png'), index: '2' }],
            visibleindicator: false
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.CallAlbumList();
        this.getStorage();
        this.setState({ isProfessor: this.props.isProfessor })
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
        const isUserid = await AsyncStorage.getItem('isUserid');
        this.setState({ isUserid: isUserid })

    }

    // api'S
    CallAlbumList() {
        this.setState({ visibleindicator: true });
        let formdata = new FormData();
        formdata.append("fk_user", this.state.isUserid)
        formdata.append("chr_type", this.state.isProfessor == 'true' ? 'P' : 'U')

        fetch('http://athrans.be/api/media/AlbumList', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.success == "1") {
                    //alert(JSON.stringify(newdata))
                    var newdata = [];
                    tempdata = [];
                    responseJson.album_data.map((item, index) => {
                        item.isVisiable = 'false',
                            newdata.push(item)
                    })
                    this.setState({
                        album_data: newdata
                    })
                    this.setState({ visibleindicator: false });
                } else {
                    // if (responseJson.error.code == 398) {
                    //     // Toast.show("Token invalide", Toast.LONG);
                    //     AsyncStorage.setItem("sessionid", "");
                    //     AsyncStorage.setItem("isLogin", "false");
                    //     this.props.navigation.navigate('Login');
                    // }
                    // else
                    // Alert.alert(error.stringify());
                    Toast.show(responseJson.message, Toast.LONG);
                    this.setState({ visibleindicator: false });
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
                this.setState({ visibleindicator: false });
            });
    }


    likeAction(index, value) {
        if (this.state.album_data[index].like_status == '0') {
            this.setState({ entries: this.state.entries_like });
        }
        else if (this.state.album_data[index].like_status == '1') {
            this.setState({ entries: this.state.entries_unlike });
        }
        else if (this.state.album_data[index].like_status == '2') {
            this.setState({ entries: this.state.entries_like });
        }

        
        const newArray = [...this.state.album_data];
        newArray[index].isVisiable = value;
        this.setState({ album_data: newArray });
    }


    EmotionAPICall(index, indexinner) {

        this.setState({ visibleindicator: true });

        this.likeAction(index, 'false')
        let formdata = new FormData();
        formdata.append("fk_user", this.state.isUserid)
        formdata.append("fk_album", this.state.album_data[index].int_glcode)
        formdata.append("chr_type", this.state.isProfessor == 'true' ? 'P' : 'U')
        if (indexinner == '0') {
            new_likestateus = '0'
            formdata.append("emoji_type", new_likestateus)
        }
        if (indexinner == '1') {
            new_likestateus = '1'
            formdata.append("emoji_type", new_likestateus)
        }
        else if (indexinner == '2') {
            new_likestateus = '2'
            formdata.append("emoji_type", new_likestateus)
        }

        fetch('http://athrans.be/api/media/AlbumLikes', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == "1") {

                    // const newArray = [...this.state.album_data];
                    // newArray[index].like_status = new_likestateus;
                    // this.setState({ album_data: newArray });
                    // Toast.show(responseJson.message, Toast.LONG);


                    // this.setState({new_likestateus:''})
                    this.setState({ visibleindicator: false });
                    this.CallAlbumList();
                } else {
                    // if (responseJson.error.code == 398) {
                    //     // Toast.show("Token invalide", Toast.LONG);
                    //     AsyncStorage.setItem("sessionid", "");
                    //     AsyncStorage.setItem("isLogin", "false");
                    //     this.props.navigation.navigate('Login');
                    // }
                    // else
                    // Alert.alert(error.stringify());
                    Toast.show(responseJson.message, Toast.LONG);
                    this.setState({ visibleindicator: false });
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
                this.setState({ visibleindicator: false });
            });

    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>

                <ProgressLoader
                    visible={this.state.visibleindicator}
                    isModal={true} isHUD={true}
                    hudColor={Global.SecondColor}
                    color={"#FFFFFF"} />

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
                            <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Albums</Text>
                        </View>
                    </LinearGradient>



                    {/* Use Number of columns for grid */}
                    <FlatList
                        marginTop={10}
                        numColumns={1}
                        data={this.state.album_data}
                        renderItem={({ item, index }) => (

                            <View style={styles.cardViewStyle}>
                                <View>
                                    <TouchableOpacity onPress={() => { Actions.AlbumsPhotoPage({ albumid: item.int_glcode, album: item }) }}>
                                        <View style={{
                                            justifyContent: 'center', alignItems: 'center',
                                        }}>
                                            <View style={{ width: '100%' }}>
                                                <Image
                                                    style={{ width: '100%', height: 150, borderRadius: 3 }}
                                                    source={{ uri: item.var_image }}
                                                    resizeMode={'cover'}
                                                />
                                                <View style={{ padding: 10, marginTop: 10, flex: 1, flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 16, marginLeft: 8, fontFamily: Global.SnigletRegularfont }}>{item.var_title}</Text>
                                                    <Text style={{ marginTop: 10, height: 50, fontSize: 12, marginLeft: 8, color: 'gray', fontFamily: Global.SnigletRegularfont }}>{item.txt_description}</Text>
                                                </View>
                                            </View>

                                            <View style={{ width: '80%', position: 'absolute', }}>
                                                <View style={{ borderRadius: 10, backgroundColor: '#D13076', flexDirection: 'row', marginTop: 25 }}>
                                                    <View style={{ flex: 1, padding: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <Image
                                                            style={{ height: 12, width: 12 }}
                                                            source={require('../images/calendar.png')} />
                                                        <Text style={{ marginLeft: 10, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#EEBCD0' }}>{item.dt_albumdate}</Text>
                                                    </View>
                                                    <View style={{ width: 1, height: '100%', backgroundColor: '#E27FAA', }} />
                                                    <View style={{ flex: 1, padding: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <Image
                                                            style={{ height: 12, width: 12 }}
                                                            source={require('../images/albums.png')} />
                                                        <Text style={{ numberOfLines: '2', ellipsizeMode: 'end', marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#EEBCD0' }}>{item.image_count}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* {item.isVisiable == 'true' ?
                                            <FlatList
                                                style={{
                                                    position: 'absolute', borderRadius: 20, flexDirection: 'row', bottom: 0, padding: 8, borderColor: 'gray', width: 70, borderWidth: 0.5, left: 0, shadowColor: '#000', backgroundColor: '#fff',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: 0.5,
                                                    shadowRadius: 5
                                                }}
                                                marginTop={10}
                                                marginLeft={10}
                                                marginRight={10}
                                                numColumns={2}
                                                data={this.state.entries}
                                                renderItem={({ item }) => (
                                                    <Image style={{ width: 20, height: 20, marginLeft: 4, marginRight: 4 }}
                                                        source={item} />
                                                )} />
                                            :
                                            <View />} */}
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#F1F3F4' }} />


                                    <View style={{ width: '90%', marginTop: 5, marginBottom: 5, flexDirection: 'row' }}>

                                        <TouchableOpacity style={{ paddingBottom: 2, paddingTop: 2 }} onPress={() => this.likeAction(index, 'true')}>
                                            {item.like_status == 2 ?
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        source={require('../images/heart.png')} />
                                                    <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#E04F5F' }}>Love</Text>
                                                </View>
                                                : <View />}
                                            {item.like_status == 1 ?
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        source={require('../images/like.png')} />
                                                    <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>Like</Text>
                                                </View>
                                                : <View />
                                            }
                                            {item.like_status == 0 ?
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        source={require('../images/like_gray.png')} />
                                                    <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: 'gray' }}>Like</Text>
                                                </View>
                                                : <View />
                                            }
                                        </TouchableOpacity>

                                        {/* <TouchableOpacity style={{ paddingBottom: 2, paddingTop: 2, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} onPress={()=>Actions.CommentPage() }> */}
                                        <TouchableOpacity style={{ paddingBottom: 2, paddingTop: 2, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                                            <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>{item.like_count} Likes</Text>
                                        </TouchableOpacity>
                                    </View>

                                  

                                    {item.isVisiable == 'true' ?
                                        <FlatList
                                            style={{
                                                position: 'absolute', flexDirection: 'row', bottom: 0, padding: 8, width: 70, left: 0, shadowColor: '#000', backgroundColor: '#fff'
                                            }}
                                            marginTop={10}
                                            marginLeft={10}
                                            marginRight={10}
                                            numColumns={2}
                                            data={this.state.entries}
                                            renderItem={({ item }) => (

                                                <TouchableOpacity onPress={() => this.EmotionAPICall(index, item.index)}>
                                                    <Image style={{ width: 20, height: 20, marginLeft: 4, marginRight: 4 }}
                                                        source={item.image} />
                                                </TouchableOpacity>
                                            )} />
                                        :
                                        <View />}
                                </View>
                            </View>
                        )}
                    />

                    {this.state.isProfessor == 'false' ? null :
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => Actions.AddAlbumPage()}
                            style={styles.TouchableOpacityStyle}>
                            <Image
                                source={require('../images/addbutton.png')}
                                style={styles.FloatingButtonStyle}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    cardViewStyle: {
        marginBottom: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        marginLeft: 16,
        marginRight: 16
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
export default AlbumListPage;
