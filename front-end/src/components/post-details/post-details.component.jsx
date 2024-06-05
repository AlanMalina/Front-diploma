import React from 'react';
import './post-details.styles.css';

const PostDetails = ({ link, extraLink, card, extraCard, iban, extraIban, closeForm }) => {

    const copyToClipboard = (text, btn) => {
        const copyBtn = document.getElementById('copy-btn')
        navigator.clipboard.writeText(text).then(() => {
            btn.style.opacity = 0
            setTimeout(() => {
                btn.style.opacity = 1
            }, 300)
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="main-block-details">
            <div className="divBack" onClick={closeForm}></div>
            {/* <div className="donate-form">
                <h2>Donate Details</h2>
                {link && <div><strong>Link:</strong> {link}</div>}
                {extraLink && <div><strong>Extra Link:</strong> {extraLink}</div>}
                {card && <div><strong>Card:</strong> {card}</div>}
                {extraCard && <div><strong>Extra Card:</strong> {extraCard}</div>}
                {iban && <div><strong>IBAN:</strong> {iban}</div>}
                {extraIban && <div><strong>Extra IBAN:</strong> {extraIban}</div>}
                <button onClick={closeForm}>Close</button>
            </div> */}
            <div id='details-container' className='details-container'>
                     <div className="details-titles">
                         <div>Посилання:</div>
                         <div>Номер картки: </div>
                         <div>IBAN рахунок:</div>
                     </div>
                    
                    <div className="detail-block">
                    {extraLink &&
                        (link && extraLink) !== null ? (
                            <div style={{height: '9.259vh'}} className='link-item detail-item'>
                                <a href={link} target="_blank">{link}</a>
                                <div className='extra-link-item'>
                                    <a href={link} target="_blank">{extraLink}</a>
                                </div>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(link, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(extraLink, e.target)} src="../img/copy_btn.png" className='extra-copy-details-btn'/>
                            </div>
                        ) : (
                            <div className='link-item detail-item'>
                                <a href={link} target="_blank">{link}</a>
                                {link &&
                                <div>
                                    <img id='copy-btn' onClick={(e) => copyToClipboard(link, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                </div>}
                            </div>
                        )}
                    </div>
                    {extraCard && 
                        (card && extraCard) !== null ? (
                            <div style={{height: '9.259vh'}} className='card-item detail-item'>
                                {card}
                                <div className='extra-link-item'>
                                    {extraCard}
                                </div>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(card, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(extraCard, e.target)} src="../img/copy_btn.png" className='extra-copy-details-btn'/>
                            </div>
                        ) : (
                            <div className='card-item detail-item'>
                                {card}
                                {card &&
                                <div>
                                    <img id='copy-btn' onClick={(e) => copyToClipboard(card, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                </div>}
                            </div>
                        )}

                        {extraIban &&
                        (iban && extraIban) !== null ? (
                            <div style={{height: '9.259vh'}} className='iban-item detail-item'>
                                {iban}
                                <div className='extra-link-item'>
                                    {extraIban}
                                </div>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(iban, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                <img id='copy-btn' onClick={(e) => copyToClipboard(extraIban, e.target)} src="../img/copy_btn.png" className='extra-copy-details-btn'/>
                            </div>
                        ) : (
                            <div className='iban-item detail-item'>
                                {iban}
                                {iban &&
                                <div>
                                    <img id='copy-btn' onClick={(e) => copyToClipboard(iban, e.target)} src="../img/copy_btn.png" className='copy-details-btn'/>
                                </div>}
                            </div>
                        )}
                </div>
        </div>
        
    );
};

export default PostDetails;
