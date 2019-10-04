//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, BackHandler, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Media from './Media';
import Global from './Global';
import CardView from 'react-native-cardview';
// Dummy Data
import Dummydata from './dummy';
import ProgressLoader from 'rn-progress-loader';
import Toast from 'react-native-simple-toast';

// create a component
class AlbumsPhotoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            album_data: [],
            album: '',
            isVisiable: 'false',
            entries: [],
            entries_like: [{ image: require('../images/like.png'), index: '1' }, { image: require('../images/heart.png'), index: '2' }],
            entries_unlike: [{ image: require('../images/like_gray.png'), index: '0' }, { image: require('../images/heart.png'), index: '2' }],
            visibleindicator: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {

        // this.state.album[0]=this.props.album
        this.setState({ album: this.props.album })

        //bind option for like
        if (this.props.album.like_status == '0') {
            this.setState({ entries: this.state.entries_like });

        }
        else if (this.props.album.like_status == '1') {
            this.setState({ entries: this.state.entries_unlike });
        }
        else if (this.props.album.like_status == '2') {
            this.setState({ entries: this.state.entries_like });
        }
        this.CallPhotoAPI();

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

    LikeOptionUpdateList() {
        if (this.state.album.like_status == '0') {
            this.setState({ entries: this.state.entries_like });
        }
        else if (this.state.album.like_status == '1') {
            this.setState({ entries: this.state.entries_unlike });
        }
        else if (this.state.album.like_status == '2') {
            this.setState({ entries: this.state.entries_like });
        }
    }

    CallPhotoAPI() {
        this.setState({ visibleindicator: true });
        let formdata = new FormData();
        formdata.append("album_id", this.props.albumid)
        formdata.append("fk_user", this.state.isUserid)
        formdata.append("chr_type", this.state.isProfessor == 'true' ? 'P' : 'U')

        fetch('http://athrans.be/api/media/ImageList', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == "1") {
                    var newdata = [];
                    tempdata = [];

                    responseJson.media_data.map((item, index) => {
                        newdata.push(item)
                    })
                    this.setState({
                        album_data: newdata
                    })
                    this.setState({ visibleindicator: false });
                } else {
                    Toast.show(responseJson.message);
                    this.setState({ visibleindicator: false });
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
                this.setState({ visibleindicator: false });
            });
    }

    likeAction(value) {
        if(value=='true')
        {
        this.LikeOptionUpdateList();
        }
        // const newArray = [...this.state.album];
        // newArray.isVisiable = value;
        // this.setState({ album: newArray });
        this.setState({ isVisiable: value });
        this.forceUpdate()
    }

    EmotionAPICall(index, indexinner) {
        
        this.setState({ visibleindicator: true });
        this.likeAction('false')

        let formdata = new FormData();
        formdata.append("fk_user", this.state.isUserid)
        formdata.append("fk_album", this.props.albumid)
        formdata.append("chr_type", this.state.isProfessor == 'true' ? 'P' : 'U')
        if (indexinner == '0') {
            this.setState({new_likestateus : '0'});
            formdata.append("emoji_type", indexinner)
        }
        if (indexinner == '1') {
            this.setState({new_likestateus :'1'});
            formdata.append("emoji_type", indexinner)
        }
        else if (indexinner == '2') {
            this.setState({new_likestateus : '2'});
            formdata.append("emoji_type",indexinner)
        }


        fetch('http://athrans.be/api/media/AlbumLikes', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == "1") {

                    // const newArray = [...this.state.album];
                    // newArray.like_status = new_likestateus;
                    // this.setState({ album: newArray });
                    this.setState({ visibleindicator: false });

                    // if (new_likestateus == 1) {
                    //     this.state.album.like_count = this.state.album.like_count + 1;
                    // }
                    // else if (new_likestateus == 0) {
                    //     this.state.album.like_count = this.state.album.like_count - 1;
                    // }
                    this.state.album.like_status = this.state.new_likestateus;
                    this.setState({ new_likestateus: '' })
                    this.forceUpdate()

                } else {
                    // if (responseJson.error.code == 398) {
                    //     // Toast.show("Token invalide", Toast.LONG);
                    //     AsyncStorage.setItem("sessionid", "");
                    //     AsyncStorage.setItem("isLogin", "false");
                    //     this.props.navigation.navigate('Login');
                    // }
                    // else
                    // Alert.alert(error.stringify());
                    this.setState({ visibleindicator: false });
                    Toast.show(responseJson.message, Toast.LONG);

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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Album</Text>
                    </View>
                </LinearGradient>
                <ScrollView>
                    <View style={{ marginTop: 12, marginLeft: 12, marginBottom: 160 }}>
                        <FlatList
                            numColumns={3}
                            data={this.state.album_data}
                            renderItem={({ item }) => (

                                <View style={{ width: '31%', margin: '1%' }}>
                                    <TouchableOpacity style={{ width: '100%' }} onPress={() => { Actions.AlbumPhotoDetailPage({ isAddAlbum: 'false', albumIamge: this.state.album_data, albumDetail: this.props.album }) }}>
                                        <Image
                                            style={{
                                                width: '100%', height: 120, borderRadius: 5, backgroundColor: '#ffff', elevation: 2,
                                                justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#F8F8F8'
                                            }}
                                            source={{ uri: item.var_image }}
                                            resizeMode={'cover'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>

                <View style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 2, borderTopEndRadius: 10, borderTopStartRadius: 10, position: 'absolute', backgroundColor: '#ffff', elevation: 4, borderColor: 'pink', flexDirection: 'row', bottom: 0
                }}>
                    <View style={{ padding: 10, flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16, marginLeft: 8, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>{this.props.album.var_title}</Text>
                        <Text style={{ lineSpacing: 2, marginTop: 10, marginBottom: 10, fontSize: 12, marginLeft: 8, color: 'gray', fontFamily: Global.SnigletRegularfont }}>{this.props.album.txt_description}</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#F1F3F4' }} />
                            <View style={{ width: '90%', marginTop: 5, marginBottom: 5, flexDirection: 'row' }}>

                                <TouchableOpacity style={{ paddingBottom: 2, paddingTop: 2 }} onPress={() => this.likeAction('true')}>
                                    {this.state.album.like_status == 2 ?
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ height: 15, width: 15 }}
                                                source={require('../images/heart.png')} />
                                            <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#E04F5F' }}>Love</Text>
                                        </View>
                                        : <View />}
                                    {this.state.album.like_status == 1 ?
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                style={{ height: 15, width: 15 }}
                                                source={require('../images/like.png')} />
                                            <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>Like</Text>
                                        </View>
                                        : <View />
                                    }
                                    {this.state.album.like_status == 0 ?
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
                                    {/* <Image
                                            style={{ height: 15, width: 15 }}
                                            source={require('../images/albums.png')} /> */}
                                    <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>{this.props.album.like_count} Likes</Text>
                                </TouchableOpacity>

                                {this.state.isVisiable == 'true' ?
                                    <FlatList
                                        style={{
                                            position: 'absolute', flexDirection: 'row', bottom: 0, padding: 8, borderColor: 'gray', width: 70, left: 0, shadowColor: '#000', backgroundColor: '#fff'
                                        }}
                                        marginTop={10}

                                        numColumns={2}
                                        data={this.state.entries}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => this.EmotionAPICall(0, item.index)}>
                                                <Image style={{ width: 20, height: 20, marginLeft: 4, marginRight: 4 }}
                                                    source={item.image} />
                                            </TouchableOpacity>
                                        )} />
                                    :
                                    <View />}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
export default AlbumsPhotoPage;
