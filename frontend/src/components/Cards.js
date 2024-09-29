import React from "react"
import '../pages/cheryl.css'

function Cards() {
    return(
        <div>
                <div className="container cheryl mediumBackground">
                    <div className="box">
                        <img src="images/user.png" alt="Image 1" className="box__img" />
                        <h3 className="box__text">Math</h3>
                    </div>
                    <div className="box">
                        <img src="images/user.png" alt="Image 2" className="box__img" />
                        <h3 className="box__text">Music</h3>
                    </div>
                    <div className="box">
                        <img src="images/user.png" alt="Image 3" className="box__img" />
                        <h3 className="box__text">Art</h3>
                    </div>
                    <div className="box">
                        <img src="images/user.png" alt="Image 4" className="box__img" />
                        <h3 className="box__text">Cooking</h3>
                    </div>
                    <div className="box">
                        <img src="images/user.png" alt="Image 5" className="box__img" />
                        <h3 className="box__text">Programming</h3>
                    </div>
                </div>
                <div className='darkBackground'><img src='images/bottomBackground.png' className='bottomBackground'/></div>
                <div className='darkBackground'>
                    <div className='cards'>
                        <ul className='cards__items'>
                            <li className='card__item blackBackground'>
                                <div className='cards__item__info'>
                                    <h1 className='c noMargin'>50K+</h1>
                                    <h3 className='statistic white c'>TRADERES</h3>
                                </div>
                            </li>

                            <li className='card__item blackBackground'>
                                <div className='cards__item__info'>
                                    <h1 className='c noMargin'>30</h1>
                                    <h3 className='statistic white c'>AFFLILATED UNIVERSITIES</h3>
                                </div>
                            </li>

                            <li className='card__item blackBackground'>
                                <div className='cards__item__info'>
                                    <h1 className='c noMargin'>9/10</h1>
                                    <h3 className='statistic white c'>BY IGN</h3>
                                </div>
                            </li>
                        </ul>
                   </div>
            </div>
        </div>
        
    )
}

export default Cards