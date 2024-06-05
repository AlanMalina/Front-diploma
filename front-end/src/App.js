import React, {Component} from 'react'
import './App.css'
import Header from './components/header/header.component'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MainPage from './pages/main_page/main_pages.component'
import MyProfilePage from './pages/my_profile/my_profile.component'
import CreatePostPage from './pages/create-post_page/create-post_page.component'
import ChatApp from './components/chat-app/chat-app.component'
import SideBar from './components/side-bar/side-bar.component'
import ChatPage from './pages/chat-page/chat-page.component'
import FullPagePost from './pages/full-page-post/full-page-post.component'
import RegistrationPage from './pages/registration-page/registration-page.component'
import LogInPage from './pages/login-page/login-page.component'
import TestProfile from './pages/test-profile/test-profile.component'
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import PublicProfilePage from './pages/users-profile/users-profile.component'
import axios from 'axios';
import CreateRequest from './pages/create-request/create-request.component'
import RequestsTable from './pages/requests-table/requests-table.component'


class App extends Component {

  constructor(props){
    super(props)
    this.state = { fullPostData: null, token: Cookies.get('ACCESS_TOKEN'), decoded: [], path: '/login',
    followingCount: [], getFollowingData: null, getOtherProfile: []};
  }

  setFullPostData = (postData) => {
    this.setState({ fullPostData: postData });
    // console.log(postData);
  }

  FollowingData = (followingData) => {
    this.setState({ getFollowingData: followingData});
    console.log(followingData);
  }
  
  // getOtherProfile = (profile) => {
  //   this.setState({ getOtherProfile: profile})
  //   console.log(profile)
  // }
//   FollowingCount = (followingCount) => {
//     this.setState({followingCount: followingCount})
// }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.following !== prevState.following) {
      this.setState({token: Cookies.set('ACCESS_TOKEN', this.state.following.token)})
    }
    console.log(this.state.decoded.role)
  }
  
async componentDidMount() {
  const token = Cookies.get('ACCESS_TOKEN');
  this.setState(prevState => ({
    token, 
    decoded: token ? jwtDecode(token) : prevState.decoded
  }));
  // console.log(token)

  if(token){
    this.setState({path: '/main'})
  }else{
    this.setState({path: '/login'})
  }

}



  render() {
    return (
      <div className='app'>
        <Router>
          <Header user={this.state.decoded}/>
          <SideBar/>
          <ChatApp/>
          <FullPagePost followingCount={this.state.followingCount} fullPostData={this.state.fullPostData} user={this.state.decoded}/>
          <div className='app-container'>
              <Routes> 
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/login' element={<LogInPage user={this.state.decoded}/>}/>
                <Route path='/main' element={<MainPage getFollowingData={this.state.getFollowingData} FollowingData={this.FollowingData} user={this.state.decoded} setFullPostData={this.setFullPostData}/>}/>
                <Route path='/my-profile' element={<MyProfilePage following={this.state.following} user={this.state.decoded} setFullPostData={this.setFullPostData}/>}/>
                {this.state.decoded.role === 'volunteer' &&(
                  <Route path='/create-post' element={<CreatePostPage user={this.state.decoded}/>}/>
                )}
                <Route path='/chat' element={<ChatPage/>}/>
                <Route path='/public-profile/:id' element={<PublicProfilePage following={this.state.following} user={this.state.decoded} setFullPostData={this.setFullPostData}/>}/>
                <Route path='/create-request' element={<CreateRequest user={this.state.decoded}/>}/>
                <Route path='/requests-table' element={< RequestsTable/>}/>
                <Route path='/' element={<Navigate to={this.state.path}/>} />
              </Routes>
          </div>
        </Router>
        
      </div>
      
    )
  }
    
}

export default App;