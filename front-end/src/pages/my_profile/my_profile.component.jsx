import React, {Component} from 'react'
import './my_frofile.styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';
import { NavLink } from 'react-router-dom';


// let notify = () => toast("Wow so easy!");

class MyProfilePage extends Component {

    constructor(props){
        super(props)
        this.state = {post_in_profile: [], sort: false}
        this.funcToast = this.funcToast.bind(this)
        this.ColumnSort = this.ColumnSort.bind(this)
        this.BlockSort = this.BlockSort.bind(this)
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


    async componentDidMount(){
        await this.getPost()
        console.log(this.props.data)
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
                        
                        {this.state.post_in_profile.map((pic, index ) => (
                            <div id='block-post' key={index} className="block-post" >
                                <NavLink to={`/post/${pic.id}`}>
                                    <img className='block-post-img' src={`http://localhost:5000/${pic.picture}`} alt="" />
                                </NavLink>    
                            </div>
                        ))}
                    </div>                    
                </div>

                <div id='my-profile-main-postsColumn' className="my-profile-main-postsColumn">
                    {this.state.post_in_profile.map((post, index) => (
                        <div key={index} id='column-post' className="column-post">
                            <Post data={post}/> 
                        </div>
                    ))}
                </div>

                <div className="user-menu-profile-container">
                    <div className="menu-profile-header"></div>
                    <h1>User menu</h1>
                    <button className='next' onClick={this.funcToast}>
                        toast
                    </button>
                </div>
            </div>
            
        )
    }
}

export default MyProfilePage;