import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../common.css"

const BACKEND_URI = "http://localhost:3003/api/";

// functional component
function SignUpForm(props) {
    const [FullName, setFullName] = useState("");
    const [Organization, setOrganization] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setuserType] = useState("");
    const [errorMsg, seterrorMsg] = useState("");

    return (
        <div className="parent" >
            <div className="child1" >
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
                    <h1 className='text-center'>Signup</h1>

                    <form className='form-group'>

                        <label className='m-2 form-label'>Full Name : </label>
                        <br />
                        <input className='m-2 form-control' type="text" name="FullName" value={FullName} onChange={(e) => setFullName(e.target.value)} />
                        <br />
                        <label className='m-2 form-label'>Organization </label>
                        <br />
                        <input className='m-2 form-control' type="text" name="Organization" value={Organization} onChange={(e) => setOrganization(e.target.value)} />
                        <br />
                        <label className='m-2 form-label'>Email Id : </label>
                        <br />
                        <input className='m-2 form-control' type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label className='m-2 form-label'>Password : </label>
                        <br />
                        <input className='m-2 form-control' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <label className='m-2 form-label'>User Type : </label>
                        <br />
                        <select className='m-2 form-control' name="userType" id="userType" value={userType} onChange={(e) => setuserType(e.target.value)}>
                            <option value="">Select option</option>
                            <option value="EndUser">End User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <br />
                    </form>
                    <button className='btn btn-primary position-relative start-50 translate-middle-x' onClick={async (e) => {
                        // send fetch (POST) request to server
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ FullName: FullName, Organization: Organization, email: email, password: password, userType: userType })
                        };

                        var res = await fetch(BACKEND_URI + "register", requestOptions);
                        // alert((await res.json())["msg"]);
                        let responseMsg = (await res.json());
                        seterrorMsg(responseMsg["msg"]);
                        setEmail("");
                        setPassword("");
                        setuserType("");
                        setFullName("");
                        setOrganization("");
                    }}>Sign Up</button>
                    <br />
                    <br />

                    <p className='m-4'>Already Registered ? <Link to='/login'> Login Here</Link></p>
                </div></div></div>);
}

export default SignUpForm;