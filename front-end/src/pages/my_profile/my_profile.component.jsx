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
        this.state = {post_in_profile: [], sort: false, fullpost: false, userProfile: [], 
            followingCount: [], following: 0, followers: 0, postsCount: 0,
        avatar: '', description: '', username: '', usersurname: '', edit: false, updatedProf: []}
        this.funcToast = this.funcToast.bind(this)
        this.ColumnSort = this.ColumnSort.bind(this)
        this.BlockSort = this.BlockSort.bind(this)
        this.getFullPost = this.getFullPost.bind(this)
        this.logOut = this.logOut.bind(this)
        this.getFollowingCount = this.getFollowingCount.bind(this);
        this.getPostsCount = this.getPostsCount.bind(this)
        this.updateUser = this.updateUser.bind(this)
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
        // console.log(response.data)
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

    async getMyProfile(){
        try{
            const response = await loginService.getMyProfile(this.props.user?.id)
            this.setState({userProfile: response.data})
        }
        catch(e){
            console.log(e)
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

    async getFollowingCount(){
        try{
            const response = await postService.getFollowingCount(this.props.user?.id);
            const { followers, following } = response.data.find(item => item.followers !== undefined);
            this.setState({ followingCount: response.data });
            this.setState({ following: following,
                 followers: followers})
            // console.log(response.data)
            // console.log(this.state.following)
        }
        catch(e){
            console.log(e)
        }
    }

    async getPostsCount(){
        try{
            const response = await postService.getPostsCount(this.props.user?.id)
            this.setState({postsCount: response.data.postscount})
            // console.log('posts count: ' + response.data.postscount)
        }
        catch(e){
            console.log("You have no post yet! " + e)
        }
    } 

    openEdit = () => {
        const edit = document.getElementById('edit-btn');
        const checkEdit = document.getElementById('check-edit-btn');
        const editName = document.getElementById('input-edit-name');
        const editSurname = document.getElementById('input-edit-surname')
        const closeEdit = document.getElementById('close-edit-btn')
        const editDescription = document.getElementById('input-edit-description')
        const editAvatar = document.getElementById("edit-avatar")
        const menuProfileUserName = document.getElementById("menu-profile-userName")

        if(this.state.edit === false){
            this.setState({edit: true});
            edit.style.display = 'none';
            checkEdit.style.display = 'block';
            closeEdit.style.display = 'block'
            editName.style.display = 'block'
            editSurname.style.display = 'block'
            editDescription.style.display = 'block'
            editAvatar.style.display = 'block'
            menuProfileUserName.style.opacity = '0'
        }
    }

    closeEdit = () => {
        const edit = document.getElementById('edit-btn');
        const checkEdit = document.getElementById('check-edit-btn');
        const editName = document.getElementById('input-edit-name');
        const editSurname = document.getElementById('input-edit-surname')
        const closeEdit = document.getElementById('close-edit-btn')
        const editDescription = document.getElementById('input-edit-description')
        const editAvatar = document.getElementById("edit-avatar")
        const menuProfileUserName = document.getElementById("menu-profile-userName")

        if(this.state.edit === true){
            edit.style.display = 'block';
            checkEdit.style.display = 'none';
            closeEdit.style.display = 'none'
            editName.style.display = 'none'
            editSurname.style.display = 'none'
            editDescription.style.display = 'none'
            editAvatar.style.display = 'none'
            menuProfileUserName.style.opacity = '1'

            this.setState({edit: false})
        }
    }

    async updateUser() {
        const edit = document.getElementById('edit-btn');
        const checkEdit = document.getElementById('check-edit-btn');
        const editName = document.getElementById('input-edit-name');
        const editSurname = document.getElementById('input-edit-surname')
        const closeEdit = document.getElementById('close-edit-btn')
        const editDescription = document.getElementById('input-edit-description')
        const editAvatar = document.getElementById("edit-avatar")
        const menuProfileUserName = document.getElementById("menu-profile-userName")

        try {
            this.setState({edit: false}) 
            // console.log(this.state.avatar)
            const formAvatar = new FormData()
            formAvatar.append('image', this.state.avatar)
            // console.log(formAvatar)
            const response = await loginService.updateUser(this.props.user?.id, this.state.username, this.state.usersurname, this.state.description, this.state.avatar); 
            edit.style.display = 'block';
            checkEdit.style.display = 'none';
            closeEdit.style.display = 'none'
            editName.style.display = 'none'
            editSurname.style.display = 'none'
            editDescription.style.display = 'none'
            editAvatar.style.display = 'none'
            menuProfileUserName.style.opacity = '1'

            this.setState({updatedProf: response.data})
            window.location.reload();
            console.log("User updated:", response); 
        } 
        catch (error) {
            console.error("Error updating user:", error);
        }
    }

    avatarChange = (e) => {
        const avatar = e.target.files[0]
        console.log(avatar)
        this.setState({avatar: avatar})
    }

    userNameChange = (e) => {
        const name = e.target.value
        console.log(name)
        this.setState({username: name})
    }

    userSurnameChange = (e) => {
        const surname = e.target.value
        console.log(surname)
        this.setState({usersurname: surname})
    }

    descriptionChange = (e) => {
        const description = e.target.value
        console.log(description)
        this.setState({description: description})
    }
    

    async componentDidMount(){
        await this.getPost()
        await this.getMyProfile()
        await this.getFollowingCount()
        await this.getPostsCount()
    }


    async componentDidUpdate(prevState, prevProps){
        if(this.state.fullpost === true){
            this.setState({ fullpost: false });
        }
        if(prevProps.user !== this.props.user && this.state.updatedProf !== prevProps.user){
            this.setState({updatedProf: prevProps.user})
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
                {this.props.user.role !== 'user' &&
                    (<div id='sort-container' className="sort-container">
                        <select className='select-bar' name="items" id="items">
                            <option value="active-posts">Активні публікації</option>
                            <option value="active-requests">Активні запити</option>
                        </select>
                        <button id='btn-block-sort' className='btn-block-sort' onClick={this.BlockSort}>
                            <img className='block-sort-icon' src="./img/block sort.svg" alt="" />
                        </button>
                        <button id='btn-column-sort' className='btn-column-sort' onClick={this.ColumnSort}>
                            <img className='column-sort-icon' src="./img/column sort.svg" alt="" />
                        </button>
                    </div>)}

                {this.props.user.role !== 'user' &&
                    (<div id='my-profile-page-main' className='my-profile-page-main'>
                        <div id='my-profile-post-container' className="my-profile-post-container">
                            
                            {this.state.userProfile.map((pic, index ) => (
                                <div id='block-post' key={index} className="block-post" >
                                    {pic.picture !== null ? (
                                    <img className='block-post-img' onClick={() => this.getFullPost(pic)} src={`http://localhost:5000/${pic.picture}`} alt="" />
                                    ) : (
                                        <div className='block-post-img' style={{backgroundColor: '#d6d6d6'}}></div>
                                    )}
                                </div>

                                
                            ))}
                        </div>                    
                    </div>)}

                {this.props.user.role !== 'user' &&
                
                (<div id='my-profile-main-postsColumn' className="my-profile-main-postsColumn">
                    {this.state.userProfile.map((post) => (
                        <div key={post.id} id='column-post' className="column-post">
                            <Post data={post} 
                            followingCount={this.props.followingCount} 
                            setFullPostData={this.props.setFullPostData}
                            user={this.props.user}
                             /> 
                        </div>
                    ))}

                </div>)}
                {/* //  :
                // (
                //     <div>
                //         <h1>Hello</h1>
                //     </div>
                // ) */}
                
            
                <div className="user-menu-profile-container">
                    
                    <div className="menu-profile-header">
                        <img id='edit-btn' className='edit-btn' onClick={this.openEdit} src="../img/edit.svg" alt="" />
                        <img id='check-edit-btn' className='check-edit-btn' onClick={this.updateUser} src="../img/check edit.svg" alt="" />
                        <img id='close-edit-btn' className='close-edit-btn' onClick={this.closeEdit} src="../img/close edit.svg" alt="" />
                        {this.props.user?.avatar ? 
                            (<div >
                                <img className="menu-profile-avatar" src={`http://localhost:5000/${this.props.user?.avatar}`} />
                            </div>) 
                            : 
                            (<div className="menu-profile-avatar">
                                <img className='profile-avatar-default' src='../img/avatar_header_icon.svg' alt="" />
                            </div>)}
                        
                        <div id='edit-avatar' className="edit-avatar">
                            {this.state.avatar  ? 
                                (<div>
                                    <img src={URL.createObjectURL(this.state.avatar)} className="edited-img"/>
                                </div>) : (
                                    <div>
                                        <input type="file" className='input-edit-avatar' onChange={this.avatarChange}/>
                                    </div>
                                )
                            }
                        </div>
                        
                        <div className="user-profileData">
                            <div id='menu-profile-userName' className="menu-profile-userName" >
                                {this.props.user?.userName} {this.props.user?.userSurname}
                            </div>
                            <input onChange={this.userNameChange} type="text" defaultValue={this.props.user?.userName} id='input-edit-name' className='input-edit-name'/>
                            <input onChange={this.userSurnameChange} type="text" defaultValue={this.props.user?.userSurname} id='input-edit-surname' className='input-edit-surname'/>
                            <div className="profile-indicators">
                                <div className="current-posts">
                                    {this.state.postsCount} <br />
                                    Публікації
                                </div>
                                <div className="folowers">
                                    {this.state.followers} <br /> 
                                    Читачі
                                </div>
                                <div className="following">
                                    {this.state.following} <br />
                                    Стежить за
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="user-profile-description" >
                        {this.props.user?.description}
                    </div>
                    <textarea name="" id="input-edit-description" onChange={this.descriptionChange} defaultValue={this.props.user?.description} className='input-edit-description'></textarea>
                    <div className="user-menu-buttons-block">
                        <div className="donate-history-btn">
                            Історія донатів
                        </div>
                        <div className="notifications-btn">
                            Сповіщення
                        </div>
                        <div className="settings-btn">
                            Налаштування
                        </div>
                        <div className="premium-pots-btn">
                            Закріпити публікацію
                        </div>
                        <div className="support-btn">
                            Підтримка
                        </div>
                    </div>
                    <img className='logOut-btn' onClick={this.logOut} src="../img/logout.svg" alt="" />
                    
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