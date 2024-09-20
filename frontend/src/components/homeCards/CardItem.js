import React from "react";
import './Cards.css'

function CardItem(props) {
    return(
            <li className='card__item'>
                <figure className="cards__item__pic-wrap">
                    <img src={props.src} alt='mathpic' class='card__item__img'/>
                </figure>
                <div className='cards__item__info'>
                    <h3 className='cards__item__text'>{props.text}</h3>
                </div>
            </li>
    )
}

export default CardItem;