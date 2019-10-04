//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, TextInput, BackHandler, Share, Alert, PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import OptionsMenu from "react-native-options-menu";
// Dummy Data
import Dummydata from './dummy';
import Toast from 'react-native-simple-toast';
// import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot'
import RNFetchBlob from 'rn-fetch-blob';
import ProgressLoader from 'rn-progress-loader';

const MoreIcon = require("../images/settings.png");

// create a component
class AlbumPhotoDetailPage extends Component {

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            // // entries: [require('../images/janmastami.jpg'), require('../images/slideImage.jpg'), require('../images/janmastami.jpg')],
            // entries: [{ uri: 'http://athrans.be/public/assets/images/media/1563432072WhatsAppImage20190715at4.42.39PM.jpeg' }],
            album: '',
            activeSlide: 0,
            visibility: false,
            isAddAlbum: 'true',
            new_likestateus: '',
            base64image: '',
            entries_like:[],
            entries_like_option: [{ image: require('../images/like.png'), index: '1' }, { image: require('../images/heart.png'), index: '2' }],
            entries_unlike: [{ image: require('../images/like_gray.png'), index: '0' }, { image: require('../images/heart.png'), index: '2' }],
            visibleindicator: false
        }
        { console.log('00000_construcrtor', this.state.isAddAlbum) }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.setState({ entries: this.props.albumIamge })
        this.setState({ isAddAlbum: this.props.isAddAlbum })
        this.setState({ album: this.props.albumDetail })
        // Orientation.lockToPortrait()
        //  setTimeout(() => {
        //   
        //   this.state.entries[this.state.activeSlide].like_status = '0';
        // }, 600);

        // await request_storage_runtime_permission()
    }

    async permisson() {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'ReactNativeCode Storage Permission',
                    'message': 'ReactNativeCode App needs access to your storage to download Photos.',
                    // 'buttonNeutral': 'Ask Me Later',
                    // 'buttonNegative': 'Cancel',
                    'buttonPositive': 'OK',
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                var date = new Date();
                var image_URL = this.state.entries[this.state.activeSlide].var_image;
                // var ext = this.getExtention(image_URL);
                var ext = '.jpg';
                ext = "." + ext[0];
                const { config, fs } = RNFetchBlob;
                let PictureDir = fs.dirs.PictureDir
                let options = {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: PictureDir + "/image_" + Math.floor(date.getTime()
                            + date.getSeconds() / 2) + ext,
                        description: 'Image'
                    }
                }
                config(options).fetch('GET', image_URL).then((res) => {
                    Toast.show("Image Downloaded Successfully.");
                });
            }
            else {

                Alert.alert("Storage Permission Not Granted");

            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition
            this.setState({
                visibility: true
            })
        }, 500);

        // AdMobInterstitial.setAdUnitID(InterstialId8);
        // AdMobInterstitial.setTestDevices(["0510B173BF90962D7F088598D0597363","30DB83DF8E2AFB1FAF76593771E10C90"]);
        // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    onShare = async () => {
        let image;
        try {
            RNFetchBlob.fetch('GET', this.state.entries[this.state.activeSlide].var_image)
                .then(resp => {
                    this.setState({ base64image: resp.data });
                })
                .catch(err => errorHandler(err));

            console.log('response : state', this.state.base64image);

            const result = await Share.share({
                // message: this.props.albumIamge[this.state.activeSlide].txt_description,
                message: this.props.albumDetail.var_title,
                title: Global.appName,
                // url: 'data:image/jpeg;base64,'+this.state.base64image,
                url: this.state.base64image,
                subject: 'Subject'
            }, {
                    // Android only:
                    dialogTitle: 'Share',
                    // iOS only:
                    excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToTwitter'
                    ]
                });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    likeAction(index, value) {
        if (value == 'true') {
            if (this.state.entries[this.state.activeSlide].like_status == '0') {
                this.setState({ entries_like: this.state.entries_like_option });
            }
            else if (this.state.entries[this.state.activeSlide].like_status == '1') {
                this.setState({ entries_like: this.state.entries_unlike });
            }
            else if (this.state.entries[this.state.activeSlide].like_status == '2') {
                this.setState({ entries_like: this.state.entries_like_option });
            }
        }

        const newArray = [...this.state.entries];
        newArray[this.state.activeSlide].isVisiable = value;
        this.setState({ entries: newArray });
    }

    EmotionAPICall(index, indexinner) {

        this.likeAction(index, 'false')
        this.setState({ visibleindicator: true })
        let formdata = new FormData();
        formdata.append("fk_user", this.state.isUserid)
        formdata.append("fk_image", this.state.entries[this.state.activeSlide].int_glcode)
        formdata.append("chr_type", this.state.isProfessor == 'true' ? 'P' : 'U')
        if (indexinner == '0') {
            this.setState({ new_likestateus: '0' });
            formdata.append("emoji_type", indexinner)
        }
        else if (indexinner == '1') {
            this.setState({ new_likestateus: '1' });
            formdata.append("emoji_type", indexinner)
        }
        else if (indexinner == '2') {
            this.setState({ new_likestateus: '2' });
            formdata.append("emoji_type", indexinner)
        }

        fetch('http://athrans.be/api/media/ImageLikes', {
            method: 'POST',
            body: formdata,
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.success == "1") {
                    //alert(JSON.stringify(newdata))
                    // const newArray = [...this.state.entries];
                    // newArray[this.state.activeSlide].like_status = new_likestateus;
                    // this.setState({ entries: newArray });

                    // //remove value from new_likestateus
                    // this.setState({ new_likestateus: '' })
                    this.setState({ visibleindicator: false })

                    this.state.entries[this.state.activeSlide].like_status = this.state.new_likestateus;
                    this.setState({ new_likestateus: '' })
                    this.forceUpdate()

                    // Toast.show(responseJson.message, Toast.LONG);
                   
                } else {
                    // if (responseJson.error.code == 398) {
                    //     // Toast.show("Token invalide", Toast.LONG);
                    //     AsyncStorage.setItem("sessionid", "");
                    //     AsyncStorage.setItem("isLogin", "false");
                    //     this.props.navigation.navigate('Login');
                    // }
                    // else
                    // Alert.alert(error.stringify());
                    this.setState({ visibleindicator: false })
                    Toast.show(responseJson.message, Toast.LONG);
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(error.stringify());
                this.setState({ visibleindicator: false })
            });
    }

    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //Slider Item
    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>

                {/* <ViewShot ref="viewShot" options={{ result: 'base64', format: "jpg", quality: 0.9 }} style={[styles.itemImage, { width: '100%', height: this.state.height, }]}> */}
                <Image
                    style={{ width: '100%', resizeMode: 'contain', alignSelf: 'center', height: 300 }}
                    source={{ uri: item.var_image }}
                    resizeMode={'cover'} />
                {/* </ViewShot> */}


            </View>
        )
    }

    // For showing pagination dots
    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
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

                {/* Slider view */}
                <View style={{
                    height: '100%',
                    backgroundColor: 'black'
                }}>
                    {this.state.visibility && <Carousel
                        layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    />}
                </View>

                <View
                    style={{ width: '100%', justifyContent: 'center', left: 8, top: 14, height: 42, width: 56, position: 'absolute', paddingHorizontal: 4, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <Image
                            style={{ height: 26, width: 26 }}
                            source={require('../images/back.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                </View>

                {this.state.isAddAlbum == 'true' ? null :
                    <View style={{ position: 'absolute', width: '90%', alignSelf: 'center', flexDirection: 'column', bottom: 10 }}>
                        <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#fff' }}>{this.props.albumDetail.var_title}</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#F1F3F4' }} />
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>

                            <TouchableOpacity style={{ paddingBottom: 5, paddingTop: 5 }} onPress={() => this.likeAction(this.state.activeSlide, 'true')}>
                                {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 15, width: 15 }}
                                        source={require('../images/like.png')} />
                                    <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#EEBCD0' }}>{this.state.entries[this.state.activeSlide].like_count}  like</Text>
                                </View> */}
                                {this.state.entries[this.state.activeSlide].like_status == 2 ?
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 15, width: 15 }}
                                            source={require('../images/heart.png')} />
                                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#E04F5F' }}>Love</Text>
                                    </View>
                                    : <View />}
                                {this.state.entries[this.state.activeSlide].like_status == 1 ?
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 15, width: 15 }}
                                            source={require('../images/like.png')} />
                                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: Global.SecondColor }}>Like</Text>
                                    </View>
                                    : <View />
                                }
                                {this.state.entries[this.state.activeSlide].like_status == 0 ?
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 15, width: 15 }}
                                            source={require('../images/like_gray.png')} />
                                        <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: 'gray' }}>Like</Text>
                                    </View>
                                    : <View />
                                }
                            </TouchableOpacity>

                            {this.state.entries[this.state.activeSlide].isVisiable == 'true' ?
                                <FlatList
                                    style={{
                                        position: 'absolute', flexDirection: 'row', bottom: 0, padding: 8, width: 70, left: 0, shadowColor: '#000', backgroundColor: '#000',
                                    }}
                                    marginTop={10}
                                    numColumns={2}
                                    data={this.state.entries_like}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.EmotionAPICall(this.state.activeSlide, item.index)}>
                                            <Image style={{ width: 20, height: 20, marginLeft: 4, marginRight: 4 }}
                                                source={item.image} />
                                        </TouchableOpacity>
                                    )} />
                                :
                                <View />}

                            <View style={{ paddingBottom: 5, paddingTop: 5, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {/* <Image
                                    style={{ height: 15, width: 15 }}
                                    source={require('../images/albums.png')} /> */}
                                {/* <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#EEBCD0' }}>{index+1} / {this.state.entries.length}</Text> */}
                                <Text style={{ marginLeft: 8, fontSize: 14, fontFamily: Global.SnigletRegularfont, color: '#EEBCD0' }}>{this.state.entries[this.state.activeSlide].like_count} Likes</Text>
                            </View>
                        </View>
                    </View>
                }

                {this.state.isAddAlbum == 'true' ? null :
                    <View style={{ justifyContent: 'center', position: 'absoulte', right: 0, top: 8, height: 42, width: 40, position: 'absolute', paddingHorizontal: 4 }}>
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{ width: 20, height: 20, padding: 4, resizeMode: "contain" }}
                            destructiveIndex={1}
                            options={["Share", "Download"]}
                            actions={[this.onShare, this.permisson.bind(this)]} />
                    </View>
                }

            </View>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default AlbumPhotoDetailPage;
