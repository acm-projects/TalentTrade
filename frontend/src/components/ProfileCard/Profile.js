import React from 'react'
import './Profile.css'

function Profile() {
    return (
        <div className="profile-grid">
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Larry Jerry</div>
                    <div className="teaching">Teaching</div>
                    <div className="teaching-rating">4.7 (31)</div>
                    <div className="teaching-subjects">Geometry, Calculus, Guitar</div>
                    <div className="location">The University of Texas at Dallas</div>
                </div>
            </div>
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Steve Jones</div>
                    <div className="learning">Learning</div>
                    <div className="learning-rating">0.0 (0)</div>
                    <div className="learning-subjects">2D Art, Piano, Baking, Guitar, Badminton</div>
                    <div className="location">Texas A&M University</div>
                </div>
            </div>
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Bob Robertson</div>
                    <div className="teaching">Teaching</div>
                    <div className="teaching-rating">2.0 (5)</div>
                    <div className="teaching-subjects">Statistics, Cooking</div>
                    <div className="learning">Learning</div>
                    <div className="learning-rating">2.0 (25)</div>
                    <div className="learning-subjects">Basketball, 3D Modeling</div>
                    <div className="location">University of Houston</div>
                </div>
            </div>
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Cryan Creynolds</div>
                    <div className="teaching">Teaching</div>
                    <div className="teaching-rating">5.0 (1)</div>
                    <div className="teaching-subjects">Acting, Comedy</div>
                    <div className="learning">Learning</div>
                    <div className="learning-rating">1.0 (2)</div>
                    <div className="learning-subjects">Boxing</div>
                    <div className="location">The University of Texas at Dallas</div>
                </div>
            </div>
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Adrian Tran</div>
                    <div className="teaching">Teaching</div>
                    <div className="teaching-rating">3.0 (2)</div>
                    <div className="teaching-subjects">2D Art, Algebra</div>
                    <div className="learning">Learning</div>
                    <div className="learning-rating">1.0 (2)</div>
                    <div className="learning-subjects">Volleyball, UX Design</div>
                    <div className="location">The University of Texas at Dallas</div>
                </div>
            </div>
            <div className="profile">
                <div className="banner"><img src={"/images/user.png"} alt="banner" class="banner"/></div>
                <div className="body">
                    <div className="name">Notta Scammer</div>
                    <div className="teaching">Teaching</div>
                    <div className="teaching-rating">1.0 (3)</div>
                    <div className="teaching-subjects">Python, Linear Algebra</div>
                    <div className="learning">Learning</div>
                    <div className="learning-rating">0.8 (58)</div>
                    <div className="learning-subjects">Java, Calculus, Quantum Physics, Literary Analysis</div>
                    <div className="location">The University of Texas at Dallas</div>
                </div>
            </div>
        </div>
    )
}

export default Profile