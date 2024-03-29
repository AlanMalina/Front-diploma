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


class App extends Component {

  constructor(){
    super()
  }


  render() {
    return (
      <div className='app'>
        <Router>
          <Header/>
          <SideBar/>
          <ChatApp/>
          <div className='app-container'>
              <Routes>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
                <Route path='/my-profile' element={<MyProfilePage/>}/>
                <Route path='/create-post' element={<CreatePostPage/>}/>
                <Route path='/chat' element={<ChatPage/>}/>
                <Route path='/post/:id' element={<FullPagePost/>}/>
                <Route path='/' element={<Navigate to="/registration" />} />
              </Routes>
          </div>
        </Router>
        
      </div>
      
    )
  }
    
}

export default App;