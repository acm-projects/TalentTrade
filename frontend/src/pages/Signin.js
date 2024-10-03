import './Signin.css';
import SigninForm from '../components/Form/SigninForm';
import NavBarPre from '../components/NavBarPre/NavBar';

const Signin = () => {
    return (
        <div>
            <div className="background"><img src={"/images/signinBG.svg"} class="background-img" /></div>
            <div className="verticalcenter">
                <div className="welcome">Welcome back!</div>
                <div className="subtitle">
                    Sign in to connect and trade<br></br>
                    skills with students.
                </div>
            </div>
            <div className="formcolumn"><SigninForm /></div>
            <NavBarPre />
        </div>
    )
}

export default Signin