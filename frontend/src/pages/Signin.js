import './Signin.css';
import SigninForm from '../components/Form/SigninForm';
import NavBarPre from '../components/NavBarPre/NavBar';

const Signin = () => {
    return (
        <div>
            <NavBarPre />
            <div className="signin">
                <div className="fullsize">
                    <div className="verticalcenter">
                        <h1>Welcome back!</h1>
                        <h2>Sign in to connect and trade<br></br>
                            skills with students.</h2>
                    </div>
                    <div className="formcolumn"><SigninForm /></div>
                </div>
            </div>
        </div>
    )
}

export default Signin