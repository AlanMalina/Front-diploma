import React, {Component} from 'react'
import './requests-table.styles.css'
import requestService from '../../service/request-service';
import Request from '../../components/request/request.component';

class RequestsTable extends Component{

    constructor(props){
        super(props)
        this.state = {requests: []}
    }

    async getRequests(){
        const response = await requestService.getRequests()
        this.setState({requests: response.data})
        console.log(response.data)
    }

    componentDidMount(){
        this.getRequests();
    }

    render(){
        return(
            <div className='requests-table-main'>
                {this.state.requests.map((req) => (
                    <div key={req.id} className='requests-table-container'>
                        <Request req={req} 
                        // followingCount={this.props.followingCount} 
                        // setFullPostData={this.props.setFullPostData}
                        user={this.props.user}
                     /> 
                    </div>
                ))}
            </div>
        )
    }

}

export default RequestsTable;
