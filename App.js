import SplashPage from './src/SplashPage';
import InitalLoginPage from './src/InitalLoginPage';
import LoginPage from './src/LoginPage';
import AlbumListPage from './src/AlbumListPage';
import AlbumsPhotoPage from './src/AlbumsPhotoPage';
import CommentPage from './src/CommentPage';
import AlbumPhotoDetailPage from './src/AlbumPhotoDetailPage';
import ChatPage from './src/ChatPage';
import ParentRegistrationPage from './src/ParentRegistrationPage';
import ProfessorHomePage from './src/ProfessorHomePage';
import AddAlbumPage from './src/AddAlbumPage';
import AddParentPage from './src/AddParentPage';
import ParentPage from './src/ParentPage';
import ApproveParentPage from './src/ApproveParentPage';
import ParentHomePage from './src/ParentHomePage';
import ProfessorPage from './src/ProfessorPage';
import ParentChatlist from './src/ParentChatlist';
// import ProfessorChatPage from'./src/ProfessorChatPage';
import StudentListPage from './src/StudentListPage';
import AddStudentPage from './src/AddStudentPage';
import MyStudentListPage from './src/MyStudentListPage';
import ParentDetailPage from './src/ParentDetailPage';
import StudentProfessorPage from './src/StudentProfessorPage';

import { Router, Scene } from 'react-native-router-flux';
import React, { Fragment, Component, View } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

console.disableYellowBox = true;//Disable warnings in react native
console.reportErrorsAsExceptions = false; //Disable light weighted exceptions

export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Router>
                    <Scene key="root" backgroundColor='transperent'>
                        <Scene key="SplashPage" component={SplashPage} initial={true} hideNavBar={true} />
                        <Scene key="InitalLoginPage" component={InitalLoginPage} hideNavBar={true} />
                        <Scene key="LoginPage" component={LoginPage} hideNavBar={true} />
                        <Scene key="AlbumListPage" component={AlbumListPage} title='Albums' hideNavBar={true} />
                        <Scene key="AlbumsPhotoPage" component={AlbumsPhotoPage} title='Albums' hideNavBar={true} />
                        <Scene key="AlbumPhotoDetailPage" component={AlbumPhotoDetailPage} title='AlbumPhotoDetailPage' hideNavBar={true} />
                        <Scene key="CommentPage" component={CommentPage} title='CommentPage' hideNavBar={true} />
                        <Scene key="ChatPage" component={ChatPage} title='ChatPage' hideNavBar={true} />
                        <Scene key="ParentRegistrationPage" component={ParentRegistrationPage} title='ParentRegistrationPage' hideNavBar={true} />
                        <Scene key="ProfessorHomePage" component={ProfessorHomePage} title='ProfessorHomePage' hideNavBar={true} />
                        <Scene key="AddAlbumPage" component={AddAlbumPage} title='AddAlbumPage' hideNavBar={true} />
                        <Scene key="ParentPage" component={ParentPage} title='ParentPage' hideNavBar={true} />
                        <Scene key="AddParentPage" component={AddParentPage} title='AddParentPage' hideNavBar={true} />
                        <Scene key="ApproveParentPage" component={ApproveParentPage} title='ApproveParentPage' hideNavBar={true} />
                        <Scene key="ParentHomePage" component={ParentHomePage} title='ParentHomePage' hideNavBar={true} />
                        <Scene key="ProfessorPage" component={ProfessorPage} title='ProfessorPage' hideNavBar={true} />
                        <Scene key="ParentChatlist" component={ParentChatlist} title='ParentChatlist' hideNavBar={true} />
                        <Scene key="StudentListPage" component={StudentListPage} title='StudentListPage' hideNavBar={true} />
                        <Scene key="AddStudentPage" component={AddStudentPage} title='AddStudentPage' hideNavBar={true} />
                        <Scene key="MyStudentListPage" component={MyStudentListPage} hideNavBar={true} />
                        <Scene key="ParentDetailPage" component={ParentDetailPage} hideNavBar={true}/>
                        <Scene key="StudentProfessorPage" component={StudentProfessorPage} hideNavBar={true}/>
                        {/* <Scene key="ProfessorChatPage" component={ProfessorChatPage} title='ProfessorChatPage' hideNavBar={true} /> */}
                    </Scene>
                </Router>
            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
