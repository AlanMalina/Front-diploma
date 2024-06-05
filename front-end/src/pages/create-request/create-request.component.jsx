import React, {Component} from 'react'
import './create-request.styles.css'
import requestService from '../../service/request-service';

class CreateRequest extends Component{

    constructor(props){
        super(props)
        this.state = {request: [], description:'', picture: '', sum: '', deadline: '', minDate: this.getMinDate()}
        this.createRequest = this.createRequest.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.pictureChange = this.pictureChange.bind(this);
        this.goalChange = this.goalChange.bind(this);
        this.deadlineChange = this.deadlineChange.bind(this);
    }

    async createRequest(){
        try{
            const formPhoto = new FormData()
                formPhoto.append('image', this.state.picture)
                console.log(formPhoto)
                const response = await requestService.createRequest(this.state.description,
                                                                    this.state.sum, 
                                                                    this.state.deadline, 
                                                                    this.props.user.id,
                                                                    this.state.picture)
                this.setState({request: response.data})
                console.log(response.data)
                window.location.href = '/main'
        }
        catch(e){
            console.log(e)
        }
    }

    descriptionChange(e){
        const description = e.target.value
        this.setState({description: description})
    }
    pictureChange(e){
        const photo = e.target.files[0]
        this.setState({picture: photo})
        console.log(photo)
    }
    goalChange(e){
        const sum = e.target.value
        this.setState({sum: sum})
    }
    deadlineChange(e){
        const deadline = e.target.value
        this.setState({deadline: deadline})
        console.log(deadline)
    }
    getMinDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Додаємо один день
        return tomorrow.toISOString().split('T')[0]; // Повертаємо дату у форматі "YYYY-MM-DD"
    }

    render(){
        return(
            <div className='create-request-container'>
                <div className="request-data-form">
                {this.state.picture ? (
                        <div className="add-request-photo">
                            <img src={URL.createObjectURL(this.state.picture)} className="added-img"/>
                            <input type="file" id="InputPhoto" onChange={this.pictureChange} className="btn-add-photo"/>
                        </div>
                    ):( 
                        <div className="add-request-photo">
                            <input type="file" onChange={this.pictureChange} className="btn-add-photo"/>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src="./img/add-photo.svg" className="add-photo-icon"/>
                                <p className="title-to_add-photo">Додати фото:</p>
                            </div>
                        </div>
                        )}
                    
                    <div className="create-request-info-container">
                        <textarea onChange={this.descriptionChange} type="text" placeholder="Опис потреби:" className="create-request-description" />
                        <input type="text" onChange={this.goalChange} placeholder="Необхідна сума в грн:" className="create-request-info" />
                        <input type="date" onChange={this.deadlineChange} min={this.state.minDate} placeholder="Терміни:" className="create-request-info" />
                    </div>
                </div>
                <button className="btn-create-req" onClick={this.createRequest}>Створити</button>
            </div>
        )
    }
}

export default CreateRequest;