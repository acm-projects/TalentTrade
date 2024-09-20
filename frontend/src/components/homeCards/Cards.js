import React from "react"
import CardItem from "./CardItem"
import './Cards.css'

function Cards() {
    return(
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
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
            </div>
        </div>
    )
}

export default Cards