import {Component} from 'react'
import './App.css'
import Header from './components/header/header.component'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainPage from './pages/main_page/main_pages.component'
import MyProfilePage from './pages/my_profile/my_profile.component'
import CreatePostPage from './pages/create-post_page/create-post_page.component'
import ChatApp from './components/chat-app/chat-app.component'
import SideBar from './components/side-bar/side-bar.component'


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
              <Route path='/' element={<MainPage/>}/>
              <Route path='/my-profile' element={<MyProfilePage/>}/>
              <Route path='/create-post' element={<CreatePostPage/>}/>
            </Routes>
          </div>
        </Router>
        
      </div>
      
    )
  }
    
}

export default App;