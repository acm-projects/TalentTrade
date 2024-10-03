import './Signin.css';
import SignupForm from '../components/Form/SignupForm';
import NavBarPre from '../components/NavBarPre/NavBar';

const Signup = () => {
    return (
        <div>
            <div className="background"><img src={"/images/signinBG.svg"} class="background-img" /></div>
            <div className="verticalcenter">
                <div className="welcome">Welcome!</div>
                <div className="subtitle">
                    Sign up to connect and trade<br></br>
                    skills with students.
                </div>
            </div>
            <div className="formcolumn"><SignupForm /></div>
            <NavBarPre />
        </div>
    )
}

export default Signup