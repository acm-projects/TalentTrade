import './Signin.css';
import SignupForm from '../components/Form/SignupForm';
import NavBarPre from '../components/NavBarPre/NavBar';

const Signup = () => {
    return (
        <div>
            <NavBarPre />
            <div className="signup">
                <div className="verticalcenter">
                    <h1>Welcome!</h1>
                    <h2>Sign up to connect and trade<br></br>
                        skills with students.</h2>
                </div>
                <div className="formcolumn"><SignupForm /></div>
            </div>
        </div>
    )
}

export default Signup