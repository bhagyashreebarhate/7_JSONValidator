import { useNavigate } from 'react-router-dom';
import "../common.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useRef, useEffect } from 'react';
// import { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from "axios";
import Swal from "sweetalert2";

const BACKEND_URI = "http://localhost:3003/api/";
const BACKEND_URI1 = "http://localhost:3003/ProjectJson/";
let errors = "";


var testvariant = "danger";
function findTypeOf(obj) {
    if (typeof obj == "object")
        return "object";
    if (isNaN(obj) == false)
        return "number"
    if (obj === "true" || obj === "false")
        return "boolean"
    else
        return "string"
}
function validationFn(dataObj, schemaObj) {
    // console.log(dataObj,schemaObj);
    for (const objKey in dataObj) {
        // console.log(objKey);
        const nestedObj = dataObj[objKey];
        var typeOfNestedObj = findTypeOf(nestedObj);
        // console.log(nestedObj);
        if (typeOfNestedObj == "object") {
            validationFn(nestedObj, schemaObj);
        }
        else {
            if (schemaObj["req"] == "optional") {
                // console.log("hello");
                if (nestedObj == "")
                    continue;
                else {
                    if (schemaObj["typeof"] == typeOfNestedObj) {
                        continue;
                    }
                    else {
                        // flag=true;
                        errors += "Datatype of  Key : " + objKey + " does not matches <br>";
                        // console.log(objKey, "error in objtype");
                    }
                }
            }
            if (schemaObj["req"] == "mandatory") {
                if (nestedObj === "") {
                    errors += "Value of Key : " + objKey + " is mandatory <br> ";
                    // console.log(objKey, "it is mandatory but user doesn't enters it");
                }
                else {
                    if (schemaObj["typeof"] == typeOfNestedObj) {
                        continue;
                    }
                    else {
                        // flag=true;
                        errors += "Datatype of  Key : " + objKey + " does not matches <br>";
                        // console.log(objKey, "error in objtype");
                    }
                }
            }
        }
    }
}

function validateJson(dataString, schemaString, setisValidated, setTestVariant) {
    const schema = JSON.parse(schemaString);
    var data;
    try {
        // const json = '{"result:true, "count":42}';
        data = JSON.parse(dataString);
    } catch (e) {
        setisValidated(0);
        errors = " Not a syntactically valid json ";
        document.getElementById("errors").innerHTML = errors;
        errors = "";
        setTestVariant("danger")
        console.log(errors);
        return;
        // expected output: SyntaxError: Unexpected token o in JSON at position 1
    }
    // console.log(typeof schema);
    // console.log(schema);
    // console.log(typeof data);


    setisValidated(0);
    const userJsonKeys = Object.keys(data);
    const schemaKeys = Object.keys(schema);
    console.log(userJsonKeys, schemaKeys);
    for (const dataKey in data) {
        // console.log(schemakey);
        if (schemaKeys.includes(dataKey)) {
            let schemaKey = dataKey;
            let userObj = data[schemaKey];
            let schemaObj = schema[schemaKey];
            var typeOfNestedObj = findTypeOf(userObj);
            // console.log(typeOfNestedObj,userObj);
            if (typeOfNestedObj == "object") {
                // console.log("asd",userObj); 
                validationFn(userObj, schemaObj);
                // console.log(schemaObj["typeof"],schemaObj["req"]) 
            }
            else {
                if (schemaObj["req"] == "optional") {
                    // console.log("hello");
                    if (userObj == "")
                        continue;
                    else {
                        if (schemaObj["typeof"] == typeOfNestedObj) {
                            continue;
                        }
                        else {
                            // flag=true;
                            errors += "Datatype of  Key : " + schemaKey + " does not matches <br>";
                            // console.log(userKey, "error in objtype");
                        }
                    }
                }
                if (schemaObj["req"] == "mandatory") {
                    if (userObj === "") {
                        errors += "Value of Key : " + schemaKey + " is mandatory <br>";
                        // console.log(userKey, "it is mandatory but user doesn't enters it");
                    }
                    else {
                        if (schemaObj["typeof"] == typeOfNestedObj) {
                            continue;
                        }
                        else {
                            // flag=true;
                            errors += "Datatype of  Key : " + schemaKey + " does not matches <br>";
                            // console.log(schemaKey, "error in objtype");
                        }
                    }
                }
            }
        }
        else {
            errors += "Key :" + dataKey + " is not in schema keys <br>";
            // console.log("key not matches");
            continue;
        }
    }

    console.log(errors);
    if (errors == "") {
        setisValidated(1);
        errors += "it is a valid json" + "<br>";
        console.log("it is a valid json");
        document.getElementById("errors").innerHTML = errors;
        setTestVariant("success")
        errors = "";
    }
    else {
        setisValidated(0);
        document.getElementById("errors").innerHTML = errors;
        errors = "";
        setTestVariant("danger")
        console.log(errors);
    }
}
// fn= value=>()=>{
//     console.log(value);
// }
// function fn(t)
// {
//     console.log(t);
// }

function parse(code, CC, setisValidated, setTestVariant) {
    errors = "";
    // code = 
    // `if ( { _gameball $hits _anypin ) OR { _anypin $hits _anypin } )
    // then $fall ( _anypin )`;

    // code = `if ( $roll = true )
    //         point = #count($fall(_anypin)) * ind_point
    //         else 
    //         point = null`;

    // code=`if ( { _gameball $hits _anypin } OR { _anypin $hits _anypin } ) then $fall( _anypin )`


    // console.log(code, typeof code);
    // console.log(CC, typeof CC);
    //split the code and CC into lines
    var sampleLine1 = code.split('\n');
    //split each entry in sampleLine1 by space
    var code_tokens = [];
    for (var i = 0; i < sampleLine1.length; i++) {
        //split each entry in sampleLine1 by space and push it to sampleLines individually not as an array and dont push empty strings
        code_tokens.push(...sampleLine1[i].split(' ').filter(Boolean));
    }
    CC = CC.replace("\n", "");
    var CC_tokens = CC.split(',');
    //console.log(code_tokens);
    console.log(CC_tokens);
    //remove the prefix and suffix spaces from the sample lines
    for (var i = 0; i < code_tokens.length; i++) {
        code_tokens[i] = code_tokens[i].trim();
    }
    console.log(code_tokens);
    //syntax check the code tokens using the CC tokens in same order 
    var codeIndex = 0;
    var CCIndex = 0;
    var flag = false;
    for (var codeIndex = 0; codeIndex < code_tokens.length; codeIndex++) {
        //console.log(code_tokens[codeIndex]);
        if (CC_tokens[CCIndex] === code_tokens[codeIndex]) {
            //console.log("matched",CC_tokens[CCIndex],code_tokens[codeIndex]);
            CCIndex++;
        }
        else if (CC_tokens[CCIndex] === "*") {
            if (CCIndex === CC_tokens.length - 1) {
                flag = false;
                break;
            }
            else {
                //console.log("here");
                var next = CC_tokens[CCIndex + 1];
                //var temp=code_tokens[codeIndex];
                while (codeIndex < code_tokens.length && code_tokens[codeIndex] != next) {
                    codeIndex++;
                }
                if (code_tokens[codeIndex] === next) {
                    //console.log("matched",CC_tokens[CCIndex],code_tokens[codeIndex]);
                    //console.log("her1e");
                    CCIndex = CCIndex + 2;
                }
                else {
                    if (codeIndex === code_tokens.length) {
                        flag = true;
                        // console.log("Syntax Error ","Expected "+next);
                        errors += "Syntax Error Please Check!";
                        setisValidated(0);
                        setTestVariant("danger");
                        break;
                    }
                    // console.log("Syntax Error at "+code_tokens[codeIndex],"Expected "+next);
                    errors += "Syntax Error Please Check!";
                    setisValidated(0);
                    setTestVariant("danger");
                    flag = true;
                    break;
                }
            }
        }
        else {
            // console.log("Syntax Error at "+code_tokens[codeIndex],"Expected "+CC_tokens[CCIndex]);
            errors += "Syntax Error Please Check!";
            setisValidated(0);
            setTestVariant("danger");
            flag = true;
            break;
        }
    }
    if (!flag) {
        // console.log("Syntax Correct");
        errors += "Matched! Now You Convert it Into Hash";
        setisValidated(1);
        setTestVariant("success");
    }
}


function parse1(code, str, setisValidated, setTestVariant) {

    // str="#f,{,},#e,{,}";
    console.log(code);
    console.log(str);
    errors = "";

    // console.log(code);
    // console.log(str);
    //match the sample lines with the str tokens
    var sampleLines = code.split('\n');
    var strLines = str.split(',');
    // console.log(sampleLines);
    // console.log(strLines);
    //remove the prefix and suffix spaces from the sample lines
    for (var i = 0; i < sampleLines.length; i++) {
        sampleLines[i] = sampleLines[i].trim();
    }
    // console.log(sampleLines);
    //match the sample lines with the str tokens in same order
    var sampleIndex = 0;
    var strIndex = 0;
    var flag = false;
    for (var i = 0; i < sampleLines.length; i++) {
        if (i == 0) {
            if (sampleLines[i] == strLines[strIndex]) {
                strIndex++;
                continue;
            }
            else {
                flag = true;
                // console.log("Syntax Error ");
                // alert("Syntax Error Please Check!");
                errors += "Syntax Error Please Check!";
                setisValidated(0);
                setTestVariant("danger");
                // setRuleCheck(true);

                break;
            }
        }
        if (sampleLines[i] == '{') {
            while (sampleLines[i] != '}') {
                i++;
            }
            strIndex += 2;
        }
        else if (sampleLines[i] == '(') {
            while (sampleLines[i] != ')') {
                i++;
            }
            strIndex += 2;
        }
        else if (sampleLines[i] == '[') {
            while (sampleLines[i] != ']') {
                i++;
            }
            strIndex += 2;
        }
        else if (sampleLines[i] == strLines[strIndex]) {
            sampleIndex++;
            strIndex++;
        }
        else {

            // console.log("Syntax Error");
            // alert("Syntax Error Please Check!");
            errors += "Syntax Error Please Check!";
            setisValidated(0);
            setTestVariant("danger");
            // setRuleCheck(true);
            flag = true;
            break;
        }
    }
    if (flag == false) {
        // console.log("matched");
        // alert("Matched! Now You Convert it Into Hash");
        errors += "Matched! Now You Convert it Into Hash";
        setisValidated(1);
        setTestVariant("success");
        // setHashCode(btoa(code));
        // setRuleCheck(false);
    }
}


function Profile(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [listofJsonSchema, setListofJsonSchema] = useState([]);
    const [UserProjectName, setUserProjectName] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const [ProjectName, setProjectName] = useState("");
    const [SceneData, setSceneData] = useState("");
    const [AssetData, setAssetData] = useState("");
    const [ActionData, setActionData] = useState("");
    const [CustomData, setCustomData] = useState("");
    const [TimelineData, setTimelineData] = useState("");
    const [SceneSchema, setSceneSchema] = useState("");
    const [AssetSchema, setAssetSchema] = useState("");
    const [ActionSchema, setActionSchema] = useState("");
    const [CustomSchema, setCustomSchema] = useState("");
    const [TimelineSchema, setTimelineSchema] = useState("");
    const [Counter, setCounter] = useState(1);
    const [isValidated, setisValidated] = useState(0);
    const [testvariant, setTestVariant] = useState("success");
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    useEffect(() => {
        Axios.get("http://localhost:3003/ProjectJson/getJsonSchema").then((response) => {
            setListofJsonSchema(response.data);
        });
    }, []);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };


    const UserId = sessionStorage.getItem("curr_email");

    const navigate = useNavigate();
    const navigateToLogin = () => {
        sessionStorage.setItem("curr_email", null);
        navigate('/login');

    }
    const navigateToProject = () => {
        navigate('/Project');
    }
    const changeCounter = () => {
        if (Counter < 5 && isValidated == 1) {
            errors = "";
            setCounter(Counter + 1);
            setisValidated(0);
            setTestVariant("success");
        }

    }




    // const enterTaskname = () => {
    //     Swal.fire({
    //         title: 'Enter the Task Name',
    //         input: 'text',
    //         inputAttributes: {
    //           autocapitalize: 'off'
    //         },
    //         showCancelButton: false,
    //         confirmButtonText: 'save',
    //         showLoaderOnConfirm: true,
            
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             if(result.value == ""){
    //                 alert('Please enter the Task name');
    //             }
    //             else{
    //                 setUserProjectName(result.value);
    //             }
              
    //         }
            
        
    //       })
    // }
    const changeProjectName = (Pname) => {
        setProjectName(Pname);
        console.log(Pname);
        let schemaString = "";
        for (let i = 0; i < listofJsonSchema.length; i++) {
            let sch = listofJsonSchema[i];
            if (sch["ProjectName"] == Pname) {
                setProjectName(sch["ProjectName"]);
                setSceneData(sch["SceneTemplate"]);
                setAssetData(sch["AssetTemplate"]);
                setActionData(sch["ActionTemplate"]);
                setCustomData(sch["CustomTemplate"]);
                setTimelineData(sch["TimelineTemplate"]);
                setSceneSchema(sch["SceneObject"]);
                setAssetSchema(sch["AssetObject"]);
                setActionSchema(sch["ActionObject"]);
                setCustomSchema(sch["CustomObject"]);
                setTimelineSchema(sch["TimelineObject"]);

            }
        }
        const timer = setTimeout(() => {
            console.log({ SceneData });
        }, 1000);
        // if(Counter<5) setCounter(Counter +1);

    }

    var output = errors;

    const email = sessionStorage.getItem("curr_email");
    const userType = sessionStorage.getItem("userType");
    // If email is null it means the session variable is not set and hence the user 
    // has not logged in yet
    if (email == null) {
        return (<p>
            Please Login First.
            <button onClick={navigateToLogin} className='btn btn-primary'>
                Go To Login
            </button>
        </p>)
    }
    return (<>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container className='navbar-custom'>
                <img className='logonavbar-custom' src='https://www.creativefabrica.com/wp-content/uploads/2021/07/15/JSON-File-Glyph-Vector-Icon-Graphics-14762271-1.jpg' ></img>

                <Navbar.Brand href="#home"><h2>JSON Validator</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features"></Nav.Link>

                    </Nav>
                    {
                        Counter == 1 ? <text style={{ color: 'brown', marginRight: "15%", fontSize: "35px" }}>Scene</text> : null
                    }
                    {
                        Counter == 2 ? <text style={{ color: 'brown', marginRight: "15%", fontSize: "35px" }}>Asset</text> : null
                    }
                    {
                        Counter == 3 ? <text style={{ color: 'brown', marginRight: "15%", fontSize: "35px" }}>Action</text> : null
                    }
                    {
                        Counter == 4 ? <text style={{ color: 'brown', marginRight: "15%", fontSize: "35px" }}>Custom</text> : null
                    }
                    {
                        Counter == 5 ? <text style={{ color: 'brown', marginRight: "15%", fontSize: "35px" }}>Timeline</text> : null
                    }
                    <Nav>

                        <Nav.Link href='/ProjectList'><h2 style={{ marginRight: 50 }}>Projects</h2></Nav.Link>

                        {userType == "Admin" ? <Button variant="light" className='' style={{ marginRight: '20px', padding: '10px' }} onClick={navigateToProject}><h4 >Upload Schema</h4></Button> : null}
                    </Nav>

                    <Button variant="outline-dark" className='logoutButton' onClick={navigateToLogin}><h6>Logout</h6></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />


        {Counter == 1 ?

            <div ref={ref}>
                <Form.Group controlId='custom-select' className='selectSchema' >
                    <Form.Control as="select" className="rounded-0 shadow" name="ProjectName" value={ProjectName} onChange={(e) => changeProjectName(e.target.value)}>
                        <option className="d-none" value="">
                            Select Project
                        </option>
                        {listofJsonSchema.map(option => (
                            <option key={option.ProjectName}>{option.ProjectName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
               
                <Button style={{ marginLeft: '2%', marginTop: '-3.4%' }}> Scene Json </Button>
            </div> : null
        }


        {Counter == 2 ?

            <div ref={ref}>

                <Form.Group controlId='custom-select' className='selectSchema' >
                    <Form.Control as="select" className="rounded-0 shadow" name="ProjectName" value={ProjectName} >
                        <option className="d-none" value="">
                            {ProjectName}
                        </option>
                    </Form.Control>
                </Form.Group>
                <Button style={{ marginLeft: '2%', marginTop: '-3.4%' }}> Asset Json </Button>
            </div> : null
        }

        {Counter == 3 ?

            <div ref={ref}>

                <Form.Group controlId='custom-select' className='selectSchema' >
                    <Form.Control as="select" className="rounded-0 shadow" name="ProjectName" value={ProjectName} onChange={(e) => setProjectName(e.target.value)}>
                        <option className="d-none" value="">
                            {ProjectName}
                        </option>
                    </Form.Control>
                </Form.Group>
                {/* <span>{ProjectName}</span> */}
                <Button style={{ marginLeft: '2%', marginTop: '-3.4%' }}> Action Json </Button>
            </div> : null
        }

        {Counter == 4 ?

            <div ref={ref}>

                <Form.Group controlId='custom-select' className='selectSchema' >
                    <Form.Control as="select" className="rounded-0 shadow" name="ProjectName" value={ProjectName} onChange={(e) => setProjectName(e.target.value)}>
                        <option className="d-none" value="">
                            {ProjectName}
                        </option>

                    </Form.Control>
                </Form.Group>
                {/* <span>{ProjectName}</span> */}
                <Button style={{ marginLeft: '2%', marginTop: '-3.4%' }}> Custom Json</Button>
            </div> : null
        }

        {Counter == 5 ?

            <div ref={ref}>

                <Form.Group controlId='custom-select' className='selectSchema' >
                    <Form.Control as="select" className="rounded-0 shadow" name="ProjectName" value={ProjectName} onChange={(e) => setProjectName(e.target.value)}>
                        <option className="d-none" value="">
                            {ProjectName}
                        </option>

                    </Form.Control>
                </Form.Group>
                {/* <span>{ProjectName}</span> */}
                <Button style={{ marginLeft: '2%', marginTop: '-3.4%' }}> Timeline Json </Button>
            </div> : null
        }

        <ProgressBar className='progressbar-custom'>
            {Counter == 1 ? <ProgressBar striped variant="success" now={0} key={3} /> : null}
            {Counter == 2 ? <ProgressBar striped variant="success" now={20} key={3} /> : null}
            {Counter == 3 ? <ProgressBar striped variant="success" now={40} key={3} /> : null}
            {Counter == 4 ? <ProgressBar striped variant="success" now={60} key={3} /> : null}
            {Counter == 5 && !isValidated? <ProgressBar striped variant="success" now={80} key={3} /> : null}
            {Counter == 5 &&  isValidated? <ProgressBar striped variant="success" now={100} key={3} /> : null}

        </ProgressBar>




        {Counter == 1 ?
            <div className='v-box'>
                <div className='i-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {/* <Form.Label>Example textarea</Form.Label> */}
                            <Form.Control as="textarea" rows={25} className="textarea1" placeholder='Type JSON Here' name="SceneData" value={SceneData} onChange={(e) => setSceneData(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {testvariant == "success" ? (<div className='o-box'>
                    <Alert variant="success" style={{ height: "615px" }} >
                        <Alert.Heading>Validation status</Alert.Heading>

                        <hr />
                        <p id='errors'>
                            {errors}
                        </p>
                    </Alert>
                </div>) :
                    (<div className='o-box'>
                        <Alert variant="danger" style={{ height: "615px" }} >
                            <Alert.Heading>Validation status</Alert.Heading>

                            <hr />
                            <p id='errors'>
                                {errors}
                            </p>
                        </Alert>
                    </div>)}

            </div>
            : null}


        {Counter == 2 ?
            <div className='v-box'>
                <div className='i-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {/* <Form.Label>Example textarea</Form.Label> */}
                            <Form.Control as="textarea" rows={25} className="textarea1" placeholder='Type JSON Here' name="AssetData" value={AssetData} onChange={(e) => setAssetData(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {testvariant == "success" ? (<div className='o-box'>
                    <Alert variant="success" style={{ height: "615px" }} >
                        <Alert.Heading>Validation status</Alert.Heading>

                        <hr />
                        <p id='errors'>
                            {errors}
                        </p>
                    </Alert>
                </div>) :
                    (<div className='o-box'>
                        <Alert variant="danger" style={{ height: "615px" }} >
                            <Alert.Heading>Validation status</Alert.Heading>

                            <hr />
                            <p id='errors'>
                                {errors}
                            </p>
                        </Alert>
                    </div>)}

            </div>
            : null}

        {Counter == 3 ?
            <div className='v-box'>
                <div className='i-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {/* <Form.Label>Example textarea</Form.Label> */}
                            <Form.Control as="textarea" rows={25} className="textarea1" placeholder='Type JSON Here' name="ActionData" value={ActionData} onChange={(e) => setActionData(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {testvariant == "success" ? (<div className='o-box'>
                    <Alert variant="success" style={{ height: "615px" }} >
                        <Alert.Heading>Validation status</Alert.Heading>

                        <hr />
                        <p id='errors'>
                            {errors}
                        </p>
                    </Alert>
                </div>) :
                    (<div className='o-box'>
                        <Alert variant="danger" style={{ height: "615px" }} >
                            <Alert.Heading>Validation status</Alert.Heading>

                            <hr />
                            <p id='errors'>
                                {errors}
                            </p>
                        </Alert>
                    </div>)}

            </div>
            : null}

        {Counter == 4 ?
            <div className='v-box'>
                <div className='i-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {/* <Form.Label>Example textarea</Form.Label> */}
                            <Form.Control as="textarea" rows={25} className="textarea1" placeholder='Type JSON Here' name="CustomData" value={CustomData} onChange={(e) => setCustomData(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {testvariant == "success" ? (<div className='o-box'>
                    <Alert variant="success" style={{ height: "615px" }} >
                        <Alert.Heading>Validation status</Alert.Heading>

                        <hr />
                        <p id='errors'>
                            {errors}
                        </p>
                    </Alert>
                </div>) :
                    (<div className='o-box'>
                        <Alert variant="danger" style={{ height: "615px" }} >
                            <Alert.Heading>Validation status</Alert.Heading>

                            <hr />
                            <p id='errors'>
                                {errors}
                            </p>
                        </Alert>
                    </div>)}

            </div>
            : null}

        {Counter == 5 ?
            <div className='v-box'>
                <div className='i-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {/* <Form.Label>Example textarea</Form.Label> */}
                            <Form.Control as="textarea" rows={25} className="textarea1" placeholder='Type JSON Here' name="TimelineData" value={TimelineData} onChange={(e) => setTimelineData(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                {testvariant == "success" ? (<div className='o-box'>
                    <Alert variant="success" style={{ height: "615px" }} >
                        <Alert.Heading>Validation status</Alert.Heading>

                        <hr />
                        <p id='errors'>
                            {errors}
                        </p>
                    </Alert>
                </div>) :
                    (<div className='o-box'>
                        <Alert variant="danger" style={{ height: "615px" }} >
                            <Alert.Heading>Validation status</Alert.Heading>

                            <hr />
                            <p id='errors'>
                                {errors}
                            </p>
                        </Alert>
                    </div>)}

            </div>
            : null}


        {Counter == 1 ?
            <div className='validate-next-buttons'>
                <>
                    {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                    <Button variant="success" className='validate-button' onClick={() => validateJson(SceneData, SceneSchema, setisValidated, setTestVariant)}>Validate</Button>{' '}
                    <Button variant="light" className='next-button' onClick={changeCounter}>Next</Button>


                </>
            </div>
            : null}


        {Counter == 2 ?
            <div className='validate-next-buttons'>
                <>
                    {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                    <Button variant="success" className='validate-button' onClick={() => validateJson(AssetData, AssetSchema, setisValidated, setTestVariant)}>Validate</Button>{' '}
                    <Button variant="light" className='next-button' onClick={changeCounter}>Next</Button>


                </>
            </div>
            : null}


        {Counter == 3 ?
            <div className='validate-next-buttons'>
                <>
                    {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                    <Button variant="success" className='validate-button' onClick={() => validateJson(ActionData, ActionSchema, setisValidated, setTestVariant)}>Validate</Button>{' '}
                    <Button variant="light" className='next-button' onClick={changeCounter}>Next</Button>


                </>
            </div>
            : null}


        {Counter == 4 ?
            <div className='validate-next-buttons'>
                <>
                    {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                    <Button variant="success" className='validate-button' onClick={() => parse(CustomData, CustomSchema, setisValidated, setTestVariant)}>Validate</Button>{' '}
                    <Button variant="light" className='next-button' onClick={changeCounter}>Next</Button>



                </>
            </div>
            : null}


        {Counter == 5 ?
            <div className='validate-next-buttons'>
                <>
                    {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                    {!isValidated ?  <Button variant="success" className='validate-button' onClick={() => validateJson(TimelineData, TimelineSchema, setisValidated, setTestVariant)}>Validate</Button> :null}
                    {isValidated ? <input  type="text" style={{ marginLeft: '30%',marginTop:'2%', width: '10%', height: '40px' }} name="UserProjectName" placeholder='TaskName' value={UserProjectName} onChange={(e) => setUserProjectName(e.target.value)} /> :null}
                    {isValidated ?<Button variant="light" className='next-button' onClick={async (e) => {
                           
                        const requestOptions = {
                            credentials: 'include',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },

                            body: JSON.stringify({
                                UserId: UserId, ProjectName: ProjectName, UserProjectName: UserProjectName, SceneData: SceneData, AssetData: AssetData, ActionData: ActionData, CustomData: CustomData, TimelineData: TimelineData
                            })
                        };

                        var res = await fetch(BACKEND_URI1 + "UserProject", requestOptions);
                        alert((await res.json())["msg"]);
                        // setProjectName("");
                        // setUserProjectName("");
                        // setSceneData("");
                        // setAssetData("");
                        // setActionData("");
                        // setCustomData("");
                        // setTimelineData("");
                        console.log(res.status)
                        if (res.status == 200) {
                            navigate('/ProjectList');
                        }


                    }}>Save Status</Button>
                        : null}

                </>
            </div>
            : null}

    </>);
}

export default Profile;