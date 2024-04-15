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


class App extends Component {

  constructor(props){
    super(props)
    this.state = { fullPostData: null, token: Cookies.get('ACCESS_TOKEN'), decoded: []};
  }

  setFullPostData = (postData) => {
    this.setState({ fullPostData: postData });
  }

//   componentDidMount() {
    
//     if (localStorage.getItem('token')) {
//         const token = JSON.parse(localStorage.getItem('token')).token;
//         this.setState({ token }, () => {
//             console.log(this.state.token);
//             if (this.state.token) {
//                 const decoded = jwtDecode(this.state.token);
//                 this.setState({ decoded });
//                 console.log(decoded);
//             }
//         });
        
//     }
// }



componentDidMount() {
  const token = Cookies.get('ACCESS_TOKEN');
  this.setState(prevState => ({
    token,
    decoded: token ? jwtDecode(token) : prevState.decoded,
  }));
}


  render() {
    return (
      <div className='app'>
        <Router>
          <Header/>
          <SideBar/>
          <ChatApp/>
          <FullPagePost fullPostData={this.state.fullPostData}/>
          <div className='app-container'>
              <Routes>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/login' element={<LogInPage user={this.state.decoded}/>}/>
                <Route path='/test-profile' element={<TestProfile/>}/>
                <Route path='/main' element={<MainPage user={this.state.decoded} setFullPostData={this.setFullPostData}/>}/>
                <Route path='/my-profile' element={<MyProfilePage user={this.state.decoded} setFullPostData={this.setFullPostData}/>}/>
                <Route path='/create-post' element={<CreatePostPage user={this.state.decoded}/>}/>
                <Route path='/chat' element={<ChatPage/>}/>
                <Route path='/' element={<Navigate to="/login" />} />
              </Routes>
          </div>
        </Router>
        
      </div>
      
    )
  }
    
}

export default App;