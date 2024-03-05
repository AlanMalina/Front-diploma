import {Component} from 'react'
import './my_frofile.styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// let notify = () => toast("Wow so easy!");

class MyProfilePage extends Component {

    constructor(){
        super()
        this.funcToast = this.funcToast.bind(this)
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

    render() {
        return (
            <div className='my-profile-app'>
                <div className='my-profile-block'>
                    <h1>My profile page</h1>
                    <button className='next' onClick={this.funcToast}>
                        toast
                    </button>
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
                </div>
            </div>
            
        )
    }
}

export default MyProfilePage