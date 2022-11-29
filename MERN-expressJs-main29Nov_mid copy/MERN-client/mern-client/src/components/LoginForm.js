import "../common.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3003/api/";

// functional component
function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setuserType] = useState("");
    const navigate = useNavigate();
    const [errorMsg, seterrorMsg] = useState("");
    const navigateToProjectList = () => {
        navigate('/ProjectList');
    }

    return (
        <div className="parent" >
            <div className="child1">
                <div className='logo'>
                    <img src='https://www.creativefabrica.com/wp-content/uploads/2021/07/15/JSON-File-Glyph-Vector-Icon-Graphics-14762271-1.jpg' className='logo-image'></img>
                </div>
                <div className="about">
                    <h1><center>About US</center></h1>
                    <p><b>JSON VALIDATOR</b>  is a website built completely on the MERN stack. The main purpose of this project is to validate a json file against a predefined json schema. 
It gives you an interface to create an account, track your work, validate and upload json schema if you are an admin.</p>
                </div>
            </div>
            <div className="child2">
                <div className="center-div">
                {errorMsg && (<div class="alert alert-danger text-center" role="alert">
                        {errorMsg}
                        </div>)}
                    {/* <div id="error_msg" className="text-center"><p></p></div> */}
                    <form className='form-group'>
                       
                        <label className='m-2 form-label'>Email Id : </label>
                        <br />
                        <input className='m-2 form-control' type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label className='m-2 form-label'>Password : </label>
                        <br />
                        <input className='m-2 form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        {/* <label className='m-2 form-label'>User Type : </label>
                        <br /> */}
                        {/* <select className='m-2 form-control' name="userType" id="userType" value={userType} onChange={(e) => setuserType(e.target.value)}>
                            <option value="">select option</option>
                            <option value="EndUser">End User</option>
                            <option value="Admin">Admin</option>
                        </select> */}
                    </form>
                    <br />

                    <button className='btn btn-primary position-relative start-50 translate-middle-x' style={{ width: "210px" }} onClick={async (e) => {
                        // send fetch (POST) request to server
                        const requestOptions = {
                            credentials: 'include',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: password})
                        };

                        var res = await fetch(BACKEND_URI + "login", requestOptions);
                        // let responseMsg=( await res.json());
                        // alert(responseMsg["msg"]);
                        let responseMsg=( await res.json());
                        seterrorMsg(responseMsg["msg"]);
                        setEmail("");
                        setPassword("");
                        setuserType("");
                        if (res.status == 200) {
                            sessionStorage.setItem("userType", responseMsg["usertype"] );
                            sessionStorage.setItem("curr_email", email);
                            navigateToProjectList();
                        }
                    }}>Login</button>
                    <br />
                    <p className='m-4'>Do not have an account ? <Link to='/signup'> Sign Up Here</Link> </p>
                </div>
            </div>
        </div>


    );
}

export default LoginForm;