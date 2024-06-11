import React, {Component} from 'react'
import './request.styles.css';
import postService from '../../service/post-service';
import loginService from '../../service/login-service';
import requestService from '../../service/request-service';
import { NavLink } from 'react-router-dom';

class Request extends Component{

    constructor(props){
        super(props)
        this.state = {formattedDeadline: '', approveRequest: []}
        this.approveRequest = this.approveRequest.bind(this)
        this.finishRequest = this.finishRequest.bind(this)
    }

    async approveRequest() {
        try {
            const response = await requestService.addVolunteerReq(this.props.user?.id, this.props.req?.id);
            this.setState({approveRequest: response.data})
            window.location.href = '/my-profile'
        } catch (error) {
            console.error("Error approving request:", error);
        }
    }

    async finishRequest() {
        try {
            await requestService.finishRequest(this.props.req?.id);
            window.location.reload();
        } catch (error) {
            console.error("Error finishing request:", error);
        }
    }

    componentDidMount(){
        const deadlineISO = this.props.req?.deadline;
        if (deadlineISO) {
            const deadlineDate = new Date(deadlineISO); 
            const year = deadlineDate.getFullYear();
            const month = (deadlineDate.getMonth() + 1).toString().padStart(2, '0'); 
            const day = deadlineDate.getDate().toString().padStart(2, '0');
            const formattedDeadline = `${day}-${month}-${year}`;
            this.setState({formattedDeadline: formattedDeadline});
        }
    }

    componentDidUpdate(){
        console.log(this.props.user)
    }

    render(){
        return(
            <div className='request-container'>
                {/* {this.props.user?.role === 'volunteer' && 
                <div className="request-header">
                    {this.props.req?.avatar !== null ? (
                        <div className="request-header-avatar">
                            <img src={`http://localhost:5000/${this.props.req?.avatar}`}/>    
                        </div>
                    ) : (
                        <div className="request-header-avatar">
                            <img className='requests-profile-avatar-default' src='../img/avatar_header_icon.svg' alt="" />
                        </div>
                    )}
                    
                    {this.props.req?.user_name} {this.props.req?.user_surname}
                </div>} */}
                {this.props.req?.picture ? (
                    <div style={{width: '100%', height: '27.778vh', display: 'flex', gap: '0.521vw'}}>
                        <img className="request-picture" src={`http://localhost:5000/${this.props.req?.picture}`}/>    
                        <div className='request-info'>
                            <div className="request-description">
                                {this.props.req?.description}
                            </div>
                            <div className='request-sum-info'>
                                Сума: {this.props.req?.sum} грн
                            </div>
                            <div className='request-deadline-info'>
                                Терміни: {this.state.formattedDeadline}
                            </div>
                            {this.props.user.role === 'volunteer' &&
                            <div>
                                {this.props.req.status === false ? (
                                    <div onClick={this.approveRequest} className='btn-approve'>
                                        Прийняти
                                    </div>
                                ) : (
                                    <div onClick={this.finishRequest} className='btn-stop'>
                                        Завершити
                                    </div>
                                )}
                            </div>}
                        </div>
                    </div>
                ) : (
                    <div className='request-info-noPicture'>
                        <div className="request-description-noPicture">
                            {this.props.req?.description}
                        </div>
                        <div className='request-sum-info'>
                            Сума: {this.props.req?.sum} грн
                        </div>
                        <div className='request-deadline-info'>
                            Терміни: {this.state.formattedDeadline}
                        </div>
                        {this.props.user.role === 'volunteer' &&
                            <div>
                                {this.props.req.status === false ? (
                                    <div onClick={this.approveRequest} className='btn-approve'>
                                        Прийняти
                                    </div>
                                ) : (
                                    <div onClick={this.finishRequest} className='btn-stop'>
                                        Завершити
                                    </div>
                                )}
                            </div>}
                    </div>
                )}
                
            </div>
        )
    }

}

export default Request;