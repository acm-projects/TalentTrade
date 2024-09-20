import React from "react"
import CardItem from "./CardItem"
import './Cards.css'

function Cards() {
    return(
        <div>
            <div className='cards'>
                        <ul className='cards__items'>
                            <CardItem
                            src="images/user.png"
                            text="math"
                            />

                            <CardItem
                            src="images/user.png"
                            text="music"
                            />

                            <CardItem
                            src="images/user.png"
                            text="art"
                            />

                            <CardItem
                            src="images/user.png"
                            text="cooking"
                            />

                            <CardItem
                            src="images/user.png"
                            text="programming"
                            />
                        </ul>
            </div>
            <div className='cards'>
                        <ul className='cards__items'>
                            <li className='card__item'>
                                <div className='cards__item__info'>
                                    <h1 className='cards__item__text'>50K+</h1>
                                    <h3 className='cards__item__text'>TRADERES</h3>
                                </div>
                            </li>

                            <li className='card__item'>
                                <div className='cards__item__info'>
                                    <h1 className='cards__item__text'>50K+</h1>
                                    <h3 className='cards__item__text'>TRADERES</h3>
                                </div>
                            </li>

                            <li className='card__item'>
                                <div className='cards__item__info'>
                                    <h1 className='cards__item__text'>50K+</h1>
                                    <h3 className='cards__item__text'>TRADERES</h3>
                                </div>
                            </li>
                        </ul>
            </div>
        </div>
        
    )
}

export default Cards