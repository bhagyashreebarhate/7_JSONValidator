import { useNavigate } from 'react-router-dom';
import "../common.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
const BACKEND_URI = "http://localhost:3003/ProjectJson/";


function Project(props) {
    const tableStyle = {
        width: 'fit-content',
        margin: 'auto',
        border: '1px solid black'
    };
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    
    const [ProjectName, setProjectName] = useState("");
    const [SceneObject, setSceneObject] = useState("");
    const [SceneTemplate, setSceneTemplate] = useState("");
    const [AssetObject, setAssetObject] = useState("");
    const [AssetTemplate, setAssetTemplate] = useState("");
    const [ActionObject, setActionObject] = useState("");
    const [ActionTemplate, setActionTemplate] = useState("");
    const [CustomObject, setCustomObject] = useState("");
    const [CustomTemplate, setCustomTemplate] = useState("");
    const [TimelineObject, setTimelineObject] = useState("");
    const [TimelineTemplate, setTimelineTemplate] = useState("");
    const [Counter, setCounter] = useState(1);
    const UserId = sessionStorage.getItem("curr_email");
    const [errorMsg, seterrorMsg] = useState("");
    // const UserId=sessionStorage.getItem("curr_email");

    // const handleClick = (event) => {
    //     setShow(!show);
    //     setTarget(event.target);
    // };

    const navigate = useNavigate();
    var testvariant = "danger";
    const navigateToLogin = () => {
        navigate('/login');
    }
    
    const navigateToProjectLists = () => {
        navigate('/ProjectList');
    }
    const navigateTovalidateJson = () => {
        navigate('/validateJson');
    }
    const changeCounter = () => {
        try {
            // const json = '{"result:true, "count":42}';
            var dataString1;
            var dataString2;
            var data1;
            var data2;
            if (Counter == 1) {
                dataString1 = SceneObject;
                dataString2 = SceneTemplate;
            }
            if (Counter == 2) {
                dataString1 = AssetObject;
                dataString2 = AssetTemplate;
            }
            if (Counter == 3) {
                dataString1 = ActionObject;
                dataString2 = ActionTemplate;
            }
            if (Counter == 4) {
                dataString1 = CustomObject;
                dataString2 = CustomTemplate;
            }
            if (Counter == 5) {
                dataString1 = TimelineObject;
                dataString2 = TimelineTemplate;
            }
            if(Counter == 4){
                data1 = dataString1;
                data2 = dataString2;
            }
            else{
                data1 = JSON.parse(dataString1);
                data2 = JSON.parse(dataString2);
            }
        } catch (e) {
            seterrorMsg("Invalid JSON");
            const timer = setTimeout(() => {
                //console.log('This will run after 1 second!')
                seterrorMsg("");
              }, 3000);
            //   alert("Invalid Json");
            // console.log(e.message);console.log(typeof(e));
            
            return;
            // expected output: SyntaxError: Unexpected token o in JSON at position 1
        }

        if (Counter < 5) setCounter(Counter + 1);
        seterrorMsg("");
        // Counter = Counter + 1;

    }
    const changeCounterBack = () => {
        if (Counter > 1) setCounter(Counter - 1);
        // Counter = Counter + 1;

    }
    const email = sessionStorage.getItem("curr_email");

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

    // control comes here if email is not null.
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
                    <Button variant="light" className='' style={{ marginRight: '20px', padding: '10px' }} onClick={navigateToProjectLists}><h4 >Projects</h4></Button>
                    
                    <Button variant="light" className='' style={{ marginRight: '20px', padding: '10px' }} onClick={navigateTovalidateJson}><h4 >Validate Schema</h4></Button>
                    <Button variant="outline-dark" className='logoutButton' onClick={navigateToLogin}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />
        <div>
            <font style={{ color: 'white', marginLeft: '2%' }}> Project Name : </font>
           
        <input className='' type="text" name="ProjectName" value={ProjectName} onChange={(e) => setProjectName(e.target.value)} />
        {errorMsg && (<text class="alert alert-danger text-center" role="alert" style={{  marginLeft: '25%' }}>
            {errorMsg}
        </text>)}
            {/* {
                Counter == 1 && !errorMsg? <text style={{ color: 'yellow', marginLeft: "25%", fontSize: "35px" }}>Scene</text> : null
            }
            {
                Counter == 2 ? <text style={{ color: 'yellow', marginLeft: "25%", fontSize: "35px" }}>Asset</text> : null
            }
            {
                Counter == 3 ? <text style={{ color: 'yellow', marginLeft: "25%", fontSize: "35px" }}>Action</text> : null
            }
            {
                Counter == 4 ? <text style={{ color: 'yellow', marginLeft: "25%", fontSize: "35px" }}>Custom</text> : null
            }
            {
                Counter == 5 ? <text style={{ color: 'yellow', marginLeft: "25%", fontSize: "35px" }}>Timeline</text> : null
            }
             */}
        </div>
        {
            Counter == 5 ?
                <div className='validate-next-buttons'>
                    <Button variant="success" className='upload-button' onClick={async (e) => {
                   
                        const requestOptions = {
                            credentials: 'include',
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },

                            body: JSON.stringify({
                                UserId: UserId, ProjectName: ProjectName, SceneObject: SceneObject, SceneTemplate: SceneTemplate,
                                AssetObject: AssetObject, AssetTemplate: AssetTemplate, ActionObject: ActionObject, ActionTemplate: ActionTemplate,
                                CustomObject: CustomObject, CustomTemplate: CustomTemplate, TimelineObject: TimelineObject, TimelineTemplate: TimelineTemplate
                            })
                        };

                        var res = await fetch(BACKEND_URI + "Project", requestOptions);
                        alert((await res.json())["msg"]);
                        if (res.status == 200) {
                            navigate('/ProjectList');
                        }
                        // setProjectName("");
                        // setSceneObject("");
                        // setSceneTemplate("");
                        // setAssetObject("");
                        // setAssetTemplate("");
                        // setActionObject("");
                        // setActionTemplate("");
                        // setCustomObject("");
                        // setCustomTemplate("");
                        // setTimelineObject("");
                        // setTimelineTemplate("");

                    }}>Upload</Button>



                </div> : null
        }

        {/* <MDBTextArea label='Message' id='textAreaExample' rows={4} /> */}
       
        {
            Counter == 1 ? <div className='mainProject-box'>
                <div className='JsonSchema-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" label='SceneObject' cols={4} rows={25} className="" name="SceneObject" value={SceneObject} placeholder='Type Scene JSON Here' onChange={(e) => setSceneObject(e.target.value)} />
                        </Form.Group>
                    </Form>

                </div>
                <div className='template-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={25} className="" name="SceneTemplate" value={SceneTemplate} placeholder='Type scene JSON template Here' onChange={(e) => setSceneTemplate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>

            </div> : null
        }
        {
            Counter == 2 ? <div className='mainProject-box'>
                <div className='JsonSchema-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" label='AssetObject' cols={4} rows={25} className="" name="AssetObject" value={AssetObject} placeholder='Type Asset JSON Here' onChange={(e) => setAssetObject(e.target.value)} />
                        </Form.Group>
                    </Form>

                </div>
                <div className='template-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={25} className="" name="AssetTemplate" value={AssetTemplate} placeholder='Type Asset JSON template Here' onChange={(e) => setAssetTemplate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>

            </div> : null
        }
        {
            Counter == 3 ? <div className='mainProject-box'>
                <div className='JsonSchema-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" label='ActionObject' cols={4} rows={25} className="" name="ActionObject" value={ActionObject} placeholder='Type Action JSON Here' onChange={(e) => setActionObject(e.target.value)} />
                        </Form.Group>
                    </Form>

                </div>
                <div className='template-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={25} className="" name="ActionTemplate" value={ActionTemplate} placeholder='Type Action JSON template Here' onChange={(e) => setActionTemplate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>

            </div> : null
        }
        {
            Counter == 4 ? <div className='mainProject-box'>
                <div className='JsonSchema-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" label='CustomObject' cols={4} rows={25} className="" name="CustomObject" value={CustomObject} placeholder='Type Custom JSON Here' onChange={(e) => setCustomObject(e.target.value)} />
                        </Form.Group>
                    </Form>

                </div>
                <div className='template-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={25} className="" name="CustomTemplate" value={CustomTemplate} placeholder='Type Custom JSON template Here' onChange={(e) => setCustomTemplate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>

            </div> : null
        }
        {
            Counter == 5 ? <div className='mainProject-box'>
                <div className='JsonSchema-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" label='TimelineObject' cols={4} rows={25} className="" name="TimelineObject" value={TimelineObject} placeholder='Type Timeline JSON Here' onChange={(e) => setTimelineObject(e.target.value)} />
                        </Form.Group>
                    </Form>

                </div>
                <div className='template-box'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={25} className="" name="TimelineTemplate" value={TimelineTemplate} placeholder='Type Timeline JSON template Here' onChange={(e) => setTimelineTemplate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>

            </div> : null
        }

        <div className='validate-next-buttons'>
            <>
                {/* <Button variant="light" className='back-button' onClick={navigateToAsset}>Back</Button>{' '} */}
                {Counter != 1 ? <Button variant="light" className='next-button' onClick={changeCounterBack}>Back</Button> : null}
                {Counter != 5 ? <Button variant="light" className='next-button' onClick={changeCounter}>Next</Button> : null}


            </>
        </div>

    </>);
}

export default Project;