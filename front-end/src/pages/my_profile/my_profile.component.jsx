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
        // this.getPost = this.getPost.bind(this)
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
        const container = document.getElementById('my-profile-post-container')
        const columns = document.querySelectorAll('.column-post')
        const blocks = document.querySelectorAll('.block-post');
        const btn_block = document.getElementById('btn-block-sort')       
        const btn_column = document.getElementById('btn-column-sort')

        if(this.state.sort === false){
            container.style.flexDirection = 'column'
            container.style.gap = '1.333vh'
            blocks.forEach(block => {
                block.style.display = 'none';
            });
            columns.forEach(column => {
                column.style.display = 'flex';
            });
            btn_block.style.background = 'none'
            btn_column.style.background = '#CAC8C1'
            this.setState({sort: true})
        }
    }

    BlockSort(){
        const container = document.getElementById('my-profile-post-container')
        const columns = document.querySelectorAll('.column-post')
        const blocks = document.querySelectorAll('.block-post');
        const btn_block = document.getElementById('btn-block-sort')       
        const btn_column = document.getElementById('btn-column-sort')

        if(this.state.sort === true){
            container.style.flexDirection = 'row'
            container.style.gap = '0.278vw'
            blocks.forEach(block => {
                block.style.display = 'block';
            });
            columns.forEach(column => {
                column.style.display = 'none';
            });
            btn_block.style.background = '#CAC8C1'
            btn_column.style.background = 'none'
            this.setState({sort: false})
        }
    }


    async componentDidMount(){
        await this.getPost()
    }

    render() {


        return (
            <div className='my-profile-page-container'>
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
                <div className='my-profile-page-main'>


                    

                    <div className="sort-container">
                        <button id='btn-block-sort' className='btn-block-sort' onClick={this.BlockSort}>
                            <img className='block-sort-icon' src="./img/block sort.svg" alt="" />
                        </button>
                        <button id='btn-column-sort' className='btn-column-sort' onClick={this.ColumnSort}>
                            <img className='column-sort-icon' src="./img/column sort.svg" alt="" />
                        </button>
                    </div>
                    <button className='next' onClick={this.funcToast}>
                        toast
                    </button>
                    <div id='my-profile-post-container' className="my-profile-post-container">
                        
                        {this.state.post_in_profile.map((pic, index ) => (
                            <div id='block-post' key={index} className="block-post" >
                                <NavLink to={`/post/${pic.id}`}>
                                    <img className='block-post-img' src={`http://localhost:5000/${pic.picture}`} alt="" />
                                </NavLink>    
                            </div>
                        ))}
                        

                        {this.state.post_in_profile.map((post, index) => (
                            <div key={index} id='column-post' className="column-post" onClick={this.getOne}>
                                <Post data={post}/> 
                            </div>
                        ))}
                    </div>
                    
                </div> 
                <div className="user-menu-container">
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