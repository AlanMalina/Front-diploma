import React, { Component } from "react"
import './create-post_page.styles.css'
import postService from "../../service/post-service";

class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {post: [], content: '', picture: '', appointer: '', goal: '', deadline: '', id: '',
            linkReq: '', extraLink: '', card: '', extraCard: '', iban: '', extraIban: '',
        minDate: this.getMinDate(), slider: false, btnNext: 'Далі', 
        extraLinkInput: false, extraCardInput: false, extraIbanInput: false,
            };
        this.postPost = this.postPost.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.appointerChange = this.appointerChange.bind(this);
        this.goalChange = this.goalChange.bind(this);
        this.deadlineChange = this.deadlineChange.bind(this);
        this.linkChange = this.linkChange.bind(this);
        this.extraLinkChange = this.extraLinkChange.bind(this);
        this.cardChange = this.cardChange.bind(this);
        this.extraCardChange = this.extraCardChange.bind(this);
        this.ibanChange = this.ibanChange.bind(this);
        this.extraIbanChange = this.extraIbanChange.bind(this);
    }


    async postPost(){
        const infoBlock = document.getElementById('create-info-block');
        const btnNext = document.getElementById('btn-next');
        const detailsBlock = document.getElementById('details-block');
        const btnBack = document.getElementById('btn-back');
        try{
            if(this.state.slider === false){
                infoBlock.style.left = '-61.5vw';
                btnNext.style.left = '30.97vw'
                btnBack.style.left = '20.596vw'
                detailsBlock.style.right = '15vw';
                this.setState({slider: true, btnNext: 'Створити'})
            } 
            if(this.state.btnNext === 'Створити'){
                const formPhoto = new FormData()
                formPhoto.append('image', this.state.picture)
                console.log(formPhoto)
                const response = await postService.postPost(this.state.picture,
                     this.state.content, this.state.appointer, this.state.goal,
                      this.state.deadline, this.props.user?.id, this.state.link, this.state.extraLink,
                      this.state.card, this.state.extraCard, this.state.iban, this.state.extraIban)
                this.setState({post: response.data})
                console.log(response.data)
                window.location.href = '/main'
            }       
        }
        catch(e){
            console.error(e)
        } 
    }

    Slider = () => {
        const infoBlock = document.getElementById('create-info-block');
        const btnNext = document.getElementById('btn-next');
        const detailsBlock = document.getElementById('details-block');
        const btnBack = document.getElementById('btn-back');
         if(this.state.slider === true){
            infoBlock.style.left = '0vw';
            btnNext.style.left = '25.782vw'
            btnBack.style.left = '25.782vw'
            detailsBlock.style.right = '-30.729vw';
            this.setState({slider: false, btnNext: 'Далі'})
        }
    }


    addExtraDetails = (detail) => {
        this.setState((prevState) => {
            const newState = { ...prevState };
            newState[detail] = !prevState[detail];
            return newState;
        });
    }


    calculateTopPosition = () => {
        const { extraLinkInput, extraCardInput, extraIbanInput } = this.state;
        const baseLinkPosition = 29.63; // базова позиція для першого поля
        const baseCardPosition = 36.111
        const baseIBANPosition = 42.593

        const baseLinkBtnPosition = 30.556
        const baseCardBtnPosition = 37.037
        const baseIbanBtnPosition = 43.519
        
        const increment = 6.481; // зміщення для кожного додаткового поля

        const positions = {
            link: baseLinkPosition,
            card: baseCardPosition + (extraLinkInput ? increment : 0),
            iban: baseIBANPosition + (extraLinkInput ? increment : 0) + (extraCardInput ? increment : 0)
        };

        const extraPositions = {
            link: positions.link + (extraLinkInput ? increment : 0),
            card: positions.card + (extraCardInput ? increment : 0),
            iban: positions.iban + (extraIbanInput ? increment : 0),
        };

        const buttonPosition = {
            link: baseLinkBtnPosition,
            card: baseCardBtnPosition + (extraLinkInput ? increment : 0),
            iban: baseIbanBtnPosition + (extraLinkInput ? increment : 0) + (extraCardInput ? increment : 0)
        };


        return { positions, extraPositions, buttonPosition };
    }

    contentChange(e){
        const content = e.target.value
        this.setState({content: content})
        
    }

    pictureChange(e){
        const photo = e.target.files[0]
        this.setState({picture: photo})
        console.log(photo)
    }

    appointerChange(e){
        const appointer = e.target.value
        this.setState({appointer: appointer})
    }
    goalChange(e){
        const goal = e.target.value
        this.setState({goal: goal})
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
    
    linkChange(e) {
        const link = e.target.value
        this.setState({link: link})
    }
    extraLinkChange(e) {
        const extraLink = e.target.value
        this.setState({extraLink: extraLink})
    }

    cardChange(e) {
        const card = e.target.value
        this.setState({card: card})
    }
    extraCardChange(e) {
        const extraCard = e.target.value
        this.setState({extraCard: extraCard})
    }

    ibanChange(e) {
        const iban = e.target.value
        this.setState({iban: iban})
    }
    extraIbanChange(e) {
        const extraIban = e.target.value
        this.setState({extraIban: extraIban})
    }

    render() {

        const { positions, extraPositions, buttonPosition } = this.calculateTopPosition();

        
        return(
            <div className="create-post-app">
                <div id="create-info-block" className="create-info-block">
                    {this.state.picture ? (
                        <div className="add-photo">
                            <img src={URL.createObjectURL(this.state.picture)} className="added-img"/>
                            <input type="file" id="InputPhoto" onChange={this.pictureChange} className="btn-add-photo"/>
                        </div>
                    ):( 
                        <div className="add-photo">
                            <input type="file" onChange={this.pictureChange} className="btn-add-photo"/>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src="./img/add-photo.svg" className="add-photo-icon"/>
                                <p className="title-to_add-photo">Додати фото:</p>
                            </div>
                        </div>
                        )}
                    <div className='create-post-container'>
                        <input type="text" onChange={this.appointerChange} placeholder='Отримувач:' className="for-whom post-info" />
                        <input type="text" onChange={this.goalChange} placeholder="Сума в грн:" className="sum post-info" />
                        <input type="date" min={this.state.minDate} onChange={this.deadlineChange} placeholder="Термін:" className="deadline-input post-info" />
                        <input type="text" placeholder="Спільно з:" className="cooperator post-info" />
                        <div>
                            <textarea type="text" onChange={this.contentChange} placeholder="Опис:" className="create-post-description" />
                        </div>
                        
                    </div>
                </div>
                <div id="details-block" className="details-block">
                    <input type="text" id="link-extra" placeholder="Додаткове посилання:" className="link-extra extra-details" onChange={this.extraLinkChange} style={{ top: `${extraPositions.link}vh` }} />
                    {/* <img className='add-details' style={{ top: `${buttonPosition.link}vh`, right: '0vw', width: '1.406vw', height:'1.406vw' }} src="../img/remove-details.png" /> */}
                    <input type="text" id='link-input' placeholder="Посилання:" className="link-input input-details" onChange={this.linkChange} style={{ top: `${positions.link}vh` }} />
                    <img className='add-details' style={{ top: `${buttonPosition.link}vh`, right: '0vw' }} onClick={() => this.addExtraDetails('extraLinkInput')} src='../img/add-details.svg' />

                    <input type="text" id="card-extra" style={{ top: `${extraPositions.card}vh`}} placeholder="Додаткова картка:" onChange={this.extraCardChange} className="card-extra extra-details" />
                    <input type="text" id="card-input" style={{ top: `${positions.card}vh`}} placeholder="Картка:" onChange={this.cardChange} className="card-input input-details" />
                    <img className='add-details' style={{ top: `${buttonPosition.card}vh`, right: '0vw'}} onClick={() => this.addExtraDetails('extraCardInput')} src='../img/add-details.svg' />

                    <input type="text" id="iban-extra" style={{ top: `${extraPositions.iban}vh`}} placeholder="Додатковий IBAN рахунок:" onChange={this.extraIbanChange} className="iban-extra extra-details" />
                    <input type="text" id="iban-input" style={{ top: `${positions.iban}vh`}} placeholder="IBAN рахунок:" onChange={this.ibanChange} className="iban-input input-details" />
                    <img className='add-details' style={{ top: `${buttonPosition.iban}vh`, right: '0vw'}} onClick={() => this.addExtraDetails('extraIbanInput')} src='../img/add-details.svg' />
                </div>
                <button id="btn-back" className="btn-back" onClick={this.Slider}>Назад</button>
                <button id="btn-next" className="btn-next" onClick={this.postPost}>{this.state.btnNext}</button>
            </div>
            
        )
    }
}

export default CreatePostPage;