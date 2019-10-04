//import liraries
import React, { Component } from 'react';
import { Linking, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, TextInput,BackHandler  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
// Dummy Data
import Dummydata from './dummy';
// import Toast from 'react-native-simple-toast';

// create a component
class ChatPage extends Component {

    constructor(props) {
        super(props)
        this.state
        {
            name:''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentDidMount()
    {
        this.setState({name:this.props.name})
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

    // Hide Navigation Bar
    static navigationOptions = { header: null }

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
                        <Text style={{ lineSpacing: 2, alignSelf: 'center', fontSize: 25, fontFamily: Global.FontName, color: '#D13076' }}>{this.props.var_name}</Text>
                    </View>
                </LinearGradient>

                {/* Comments listing */}
                <FlatList
                    style={{ marginTop: 12 }}
                    data={[
                        { you: '1', name: 'Liza Koshy', comment: 'Nice photo kids looks superb.' },
                        { you: '1', name: 'Liza Koshy', comment: 'Nice photo kids looks superb.' },
                        { you: '1', name: 'Liza Koshy', comment: 'Nice photo kids looks superb.' },
                        { you: '0', name: 'Liza Koshy', comment: 'Nice photo kids looks superb.' },
                    ]}
                    renderItem={({ item }) => (

                        <View style={{ width: '100%', margin: 6 }}>
                            {item.you == 1 ?
                                <View style={{ borderBottomEndRadius: 5, borderBottomStartRadius: 5, borderTopRightRadius: 5, backgroundColor: '#ffff', elevation: 2,  flexDirection: 'row', width: '70%' }}>
                                    <View style={{ padding: 8, flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ lineSpacing: 2, marginTop: 2, fontSize: 12, marginLeft: 4, color: 'gray', fontFamily: Global.SnigletRegularfont }}>{item.comment}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ borderBottomEndRadius: 5, borderBottomStartRadius: 5, borderTopLeftRadius: 5, backgroundColor: '#ffff', elevation: 2, borderColor: 'pink', flexDirection: 'row', width: '70%', marginLeft: '27%' }}>
                                    <View style={{ padding: 8, flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ lineSpacing: 2, marginTop: 2, fontSize: 12, marginLeft: 4, color: 'gray', fontFamily: Global.SnigletRegularfont }}>{item.comment}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    )}
                />

                <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 10, position: 'absolute', borderRadius: 10, backgroundColor: '#ffff', borderColor: 'pink', flexDirection: 'row', bottom: 0, justifyContent: 'center' }}>
                    <TextInput style={{ width: '100%', left: 10, alignSelf: 'center', fontSize: 14, height: 35, fontFamily: Global.SnigletRegularfont, }} placeholder="Type a message" />
                    <Image style={{ position: 'absolute', right: 10, width: 16, height: 16, alignSelf: 'center' }} source={require('../images/send.png')} />
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
export default ChatPage;
