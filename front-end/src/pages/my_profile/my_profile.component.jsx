import React, {Component} from 'react'
import './my_frofile.styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';
import Cookies from 'js-cookie'
import loginService from '../../service/login-service';


// let notify = () => toast("Wow so easy!");

class MyProfilePage extends Component {

    constructor(props){
        super(props)
        this.state = {post_in_profile: [], sort: false, fullpost: false, userProfile: []}
        this.funcToast = this.funcToast.bind(this)
        this.ColumnSort = this.ColumnSort.bind(this)
        this.BlockSort = this.BlockSort.bind(this)
        this.getFullPost = this.getFullPost.bind(this)
        this.logOut = this.logOut.bind(this)
    }
    

    funcToast(){
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    async getPost(){
        const response = await postService.getPost()
        this.setState({post_in_profile: response.data})
        console.log(response.data)
    }

    ColumnSort(){
        const pageContainer = document.getElementById('my-profile-page-container')
        const mainBlock = document.getElementById('my-profile-page-main')
        const mainColumn = document.getElementById('my-profile-main-postsColumn')
        const sortContainer = document.getElementById('sort-container')

        if(this.state.sort === false){
            mainBlock.style.display = 'none';
            mainColumn.style.display = 'flex'
            pageContainer.style.overflow = 'auto'
            sortContainer.style.padding = '0.926vh 0 0.926vh'            
            this.setState({sort: true})
        }
    }

    BlockSort(){
        const pageContainer = document.getElementById('my-profile-page-container')
        const mainBlock = document.getElementById('my-profile-page-main')
        const mainColumn = document.getElementById('my-profile-main-postsColumn')


        if(this.state.sort === true){
            mainColumn.style.display = 'none'
            mainBlock.style.display = 'block';
            pageContainer.style.overflow = 'none'            
            this.setState({sort: false})
        }
    }

    async getFullPost(pic){
            const fullpostContainer = document.getElementById('full-post-page-container')
            if(this.state.fullpost === false){
                fullpostContainer.style.zIndex = '1'
                fullpostContainer.style.display = 'flex'
                this.setState({fullpost: true})
                this.props.setFullPostData(pic);
                console.log('State setted: ' + this.state.fullpost) 
            }
            
    }

    async getUserProfile(){
        try{
            const response = await loginService.getUserProfile(this.props.user.id)
            this.setState({userProfile: response.data})
        }
        catch(e){

        }
    }

    async logOut() {
        try {
          // Видалення токена з куків
          Cookies.remove('ACCESS_TOKEN');
      
          // Додаткові дії, наприклад, оновлення стану компонента
          this.setState({ isLoggedIn: false });
      
          // Перенаправлення на сторінку входу
          window.location.href = "/login";
        } catch (error) {
          console.error(error);
        }
      }
    


    async componentDidMount(){
        await this.getPost()
        await this.getUserProfile()
        console.log(this.props.user)
    }

    componentDidUpdate(){
        if(this.state.fullpost === true){
            this.setState({ fullpost: false });
        }
    }


    render() {


        return (
            <div id='my-profile-page-container' className='my-profile-page-container'>
                <ToastContainer
                        position="top-right"
                        autoClose={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                />
                <div id='sort-container' className="sort-container">
                    <button id='btn-block-sort' className='btn-block-sort' onClick={this.BlockSort}>
                        <img className='block-sort-icon' src="./img/block sort.svg" alt="" />
                    </button>
                    <button id='btn-column-sort' className='btn-column-sort' onClick={this.ColumnSort}>
                        <img className='column-sort-icon' src="./img/column sort.svg" alt="" />
                    </button>
                </div>
                <div id='my-profile-page-main' className='my-profile-page-main'>
                    <div id='my-profile-post-container' className="my-profile-post-container">
                        
                        {this.state.userProfile.map((pic, index ) => (
                            <div id='block-post' key={index} className="block-post" >
                                <img className='block-post-img' onClick={() => this.getFullPost(pic)} src={`http://localhost:5000/${pic.picture}`} alt="" />
                            </div>
                        ))}
                    </div>                    
                </div>

                <div id='my-profile-main-postsColumn' className="my-profile-main-postsColumn">
                    {this.state.userProfile.map((post) => (
                        <div key={post.id} id='column-post' className="column-post">
                            <Post data={post} setFullPostData={this.props.setFullPostData} /> 
                        </div>
                    ))}
                </div>
 
                <div className="user-menu-profile-container">
                    <div className="menu-profile-header">
                        <img className='edit-btn' src="../img/edit.svg" alt="" />
                        <img className='menu-profile-avatar' src="" alt="" />
                        <div className="user-profileData">
                            <div className="menu-profile-userName">
                                {this.props.user?.userName} {this.props.user?.userSurname}
                            </div>
                            <div className="profile-indicators">
                                <div className="current-posts">
                                    5 <br /> current <br /> posts
                                </div>
                                <div className="folowers">
                                    150 <br /> followers
                                </div>
                                <div className="following">
                                    32 <br /> following
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="user-profile-description">
                        I’m a volunteer with big experience and always ready for hepling
                    </div>
                    <div className="user-menu-buttons-block">
                        <div className="donate-history-btn">
                            Donate history
                        </div>
                        <div className="notifications-btn">
                            Notifications
                        </div>
                        <div className="settings-btn">
                            Settings
                        </div>
                        <div className="premium-pots-btn">
                            Premium post
                        </div>
                        <div className="support-btn">
                            Support
                        </div>
                        <img className='logOut-btn' onClick={this.logOut} src="../img/logout.svg" alt="" />
                    </div>
                    
                    {/* <h1>User menu</h1>
                    {this.props.user?.email}
                    <button className='next' onClick={this.funcToast}>
                        toast
                    </button> */}
                </div>
            </div>
            
        )
    }
}

export default MyProfilePage;