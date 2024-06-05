import React, {Component} from 'react'
import './request.styles.css';
import postService from '../../service/post-service';
import loginService from '../../service/login-service';
import { NavLink } from 'react-router-dom';

class Request extends Component{

    constructor(props){
        super(props)
        this.state = {formattedDeadline: ''}
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

    render(){
        return(
            <div className='request-container'>
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
                    </div>
                )}
                
            </div>
        )
    }

}

export default Request;