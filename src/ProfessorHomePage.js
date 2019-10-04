/**
 * @flow
 * @providesModule SplashScreenView
 */

import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    StatusBar,
    Text,
    ActivityIndicator,
    AsyncStorage,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    BackHandler,
    ScrollView, FlatList
} from 'react-native';
import Media from './Media';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
// Dummy Data
import Dummydata from './dummy';
// import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    innerContainer: {
        // position: 'absolute',
        color: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%', height: '100%',
        resizeMode: 'cover',  // or 'stretch'
    },
    logoImage:
        {
            width: 120,
            height: '100%'
        },
    subheaderTitle: {
        marginLeft: 16,
        marginTop: 10,
        fontSize: 15,
        fontFamily: Global.SnigletRegularfont,
        color: Global.FirstColor
    },
    headerTitle: {
        marginLeft: 16,
        marginTop: 2,
        fontSize: 30,
        color: '#D13076',
        fontFamily: Global.FontName,
    },
    descTitle: {
        marginTop: 50,
        position: 'absolute',
        textAlign: 'center',
        fontSize: 30,
        right: 10,
        fontFamily: Global.FontName,
    },
    cardViewStyle: {
        width: 300,
        padding: 20,
        marginBottom: 40,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 10
    },
})

class ProfessorHomePage extends React.Component {

    //constructor
    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    componentDidMount()
    {
        this.getStorage();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }


    backPressed = () => {
        // BackHandler.exitApp();
        this.props.navigation.goBack();
        return true;
        
    }

    async getStorage() {
        const name = await AsyncStorage.getItem('varName');
        // const Name = JSON.parse( AsyncStorage.getItem('Name'));
        this.setState({ name: name })
        
    }

    //validate email
    validateEmail(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value))
            this.setState({ emailopacity: 1 })
        else
            this.setState({ emailopacity: 0 })
    }
    //validate password
    validatePassword(value) {

    }
    // Hide Navigation Bar
    static navigationOptions = { header: null }

    //check data validation on submit
    finalSubmit(value) {
        if (value == 1) {
            Actions.ParentPage();
        }
        else if (value == 2) {
            Actions.ApproveParentPage();
        }
        else if (value == 3) {
            Actions.AlbumListPage({ isProfessor: 'true' });
        }
        else if (value == 4) {
            Actions.MyStudentListPage();
        }
        else if (value == 5) {
            Actions.ProfessorPage();
        }
        else if (value == 6) {
            Actions.StudentListPage();
        }
    }

    clearAsyncStorage() {
        AsyncStorage.clear();
        // Actions.popTo('InitalLoginPage')
        // this.props.navigation.goBack();
        this.props.navigation.navigate('InitalLoginPage');
    }

    render() {

        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../images/homebackground.png')} />

                {/* Custom view for Toolbar Header */}
                <LinearGradient useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={[Global.FirstColor, 'white']} style={{ height: 56 }} >
                    <View style={{ height: 56, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { this.clearAsyncStorage() }}
                            style={{ justifyContent: 'center', height: 42, width: 50, position: 'absolute', paddingHorizontal: 10, right: 0 }}>
                            <Image
                                style={{ height: 26, width: 26, marginTop: 6 }}
                                source={require('../images/logout.png')}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>Home</Text>
                    </View>
                </LinearGradient>

                <ScrollView>
                    <View style={{ marginTop: 30 }}>

                     {/* <Text style={styles.subheaderTitle}>Good Morning!</Text>
                        <Text style={styles.headerTitle}>{this.state.name}</Text> */}
                        {/* Use Number of columns for grid */}
                        <FlatList
                            margin={10}
                            numColumns={2}
                            data={[
                                { position: '1', name: 'Parents', color: Global.FirstColor },
                                { position: '2', name: 'Approve \nParents', color: Global.SecondColor },
                                { position: '3', name: 'Albums', color: '#0C4C8A', },
                                { position: '4', name: 'My Students', color: '#0C8A83', },
                                { position: '5', name: 'Professors', color: '#db7a39', },
                                { position: '6', name: 'Students', color: '#570a2b', },
                            ]}
                            renderItem={({ item }) => (

                                <TouchableOpacity style={{
                                    margin: '2%', width: '47%', height: 160,
                                    justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#F8F8F8', shadowColor: '#000',
                                }}
                                    onPress={() => { this.finalSubmit(item.position) }}>

                                    <LinearGradient useAngle={true} angle={45}
                                        colors={[item.color, item.color]} style={{
                                            width: '100%', height: 158, justifyContent: 'center', position: 'absolute', shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 8,
                                            borderRadius: 8,
                                            elevation: 2,
                                        }}>
                                        <Text style={{ fontSize: 25, fontFamily: Global.SnigletRegularfont, color: '#fff', alignSelf: 'center', textAlign: 'center' }}>{item.name}</Text>
                                    </LinearGradient>


                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.auth.isFetching,
        isLogin: state.auth.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: () => { dispatch(autoLogin()); },
        loginFail: () => {
            dispatch({ type: "AUTO_LOGIN_ERROR" });
        },
    };
};

export default ProfessorHomePage;
