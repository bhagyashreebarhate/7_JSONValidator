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
import Table from 'react-bootstrap/Table';
import { FcApproval } from 'react-icons/fc';
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
var JSONPretty = require('react-json-pretty');


function ProjectList() {
    const [ListofSchema, setListofSchema] = useState([]);
    const [ListofProjects, setListofProjects] = useState([]);
    const UserId = sessionStorage.getItem("curr_email");
    const userType = sessionStorage.getItem("userType");
    useEffect(() => {
        Axios.get("http://localhost:3003/ProjectJson/getListofProjects", { params: { UserId: UserId } }).then((response) => {
            setListofProjects(response.data);
        });
    }, []);


    useEffect(() => {
        Axios.get("http://localhost:3003/ProjectJson/getListofschema", { params: { UserId: UserId } }).then((response) => {
            setListofSchema(response.data);
        });
    }, []);

    const navigate = useNavigate();
    const navigateToLogin = () => {
        sessionStorage.setItem("curr_email", null);
        navigate('/login');

    }
    const navigateToProject = () => {
        navigate('/Project');
    }
    const navigateToValidateJson = () => {
        navigate('/validateJson');
    }
    let i = 1;

    const showScene = (showmessage, ttl) => {
        console.log(showmessage);
        Swal.fire({
            title: ttl,
            text: showmessage,
            confirmButtonText: "Back",
        });
    }
    // let mySpecialPopup = Popup.register({
    //     title: 'I am special',
    //     content: 'Since I am special you might need me again later. Save me!',
    //     buttons: {
    //         left: ['cancel'],
    //         right: ['ok']
    //     }
    // });
    const downloadText = (SceneValue) => {
        console.log(SceneValue);
        const element = document.createElement("a");
        const file = new Blob([SceneValue], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "jsonfile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    return (
        <>


            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container className='navbar-custom'>
                    <img className='logonavbar-custom' src='https://www.creativefabrica.com/wp-content/uploads/2021/07/15/JSON-File-Glyph-Vector-Icon-Graphics-14762271-1.jpg' ></img>

                    <Navbar.Brand href="#home"><h2>JSON Validator</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features"></Nav.Link>

                        </Nav>
                        <Nav>

                            <Nav.Link href='/ProjectList'><h2 style={{ marginRight: 50 }}>Refresh</h2></Nav.Link>
                            {userType == "Admin" ? <Button variant="light" className='' style={{ marginRight: '20px', padding: '10px' }} onClick={navigateToProject}><h4 >Upload Schema</h4></Button> : null}
                            <Button variant="light" className='' style={{ marginRight: '20px', padding: '10px' }} onClick={navigateToValidateJson}><h4 >Validate Json</h4></Button>
                        </Nav>

                        <Button variant="outline-dark" className='logoutButton' onClick={navigateToLogin}><h6>Logout</h6></Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br></br>
            {userType == "Admin" ?
                <h2 style={{ color: "#3BA015" }}><center  >My Projects</center></h2>
                : null}
            {userType == "Admin" ?
                <Table striped bordered hover size="sm" bg="light" variant="light" style={{ marginLeft: '2%', width: '96%' }}>
                    <thead>
                        <tr>
                            <th><center>Sr. No.</center></th>
                            <th><center>Project Name</center></th>
                            <th><center>Scene Schema</center></th>
                            <th><center>Asset Schema</center></th>
                            <th><center>Action Schema</center></th>
                            <th><center>Custom Schema</center></th>
                            <th><center>Timeline Schema</center></th>
                            <th><center>Download</center></th>
                        </tr>
                    </thead>
                    <tbody>

                        {ListofSchema.map(Data => (
                            <tr>
                                <td><center>{i++}</center></td>
                                <td><center>{Data.ProjectName}</center></td>
                                <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.SceneObject)), "Scene Schema")}>Scene Schema</Button></center></td>
                                <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.AssetObject)), "Asset Schema")}>Asset Schema</Button></center></td>
                                <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.ActionObject)), "Action Schema")}>Action Schema</Button></center></td>
                                <td><center><Button onClick={() => showScene(Data.CustomObject, "Custom Schema")}> Custom Schema</Button></center></td>
                                <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.TimelineObject)), "Timeline Schema")} >Timeline Schema</Button></center></td>
                                <td><center><button onClick={() => downloadText("\n ---Scene Schema---\n\n" + Data.SceneObject + "\n\n ---Asset Schema---\n\n" + Data.AssetObject + "\n\n ---Action Schema---\n\n" + Data.ActionObject + "\n\n ---Custom Schema---\n\n" + Data.CustomObject + "\n\n ---Timeline Schema---\n\n" + Data.TimelineObject)}> Download </button></center></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                : null}
            <h2 style={{ color: "yellow" }}><center  >Validated Projects </center></h2>
            <Table striped bordered hover size="sm" bg="light" variant="light" style={{ marginLeft: '2%', width: '96%' }}>
                <thead>
                    <tr>
                        <th><center>Sr. No.</center></th>
                        <th><center>Project Name</center></th>
                        <th><center>Task Name</center></th>
                        <th><center>Scene Json</center></th>
                        <th><center>Asset Json</center></th>
                        <th><center>Action Json</center></th>
                        <th><center>Custom Json</center></th>
                        <th><center>Timeline Json</center></th>
                        <th><center>Validation Status</center></th>
                        <th><center>Download</center></th>
                    </tr>
                </thead>
                <tbody>

                    {ListofProjects.map(Data => (
                        //<option key={option.ProjectName}>{option.ProjectName}</option>
                        <tr>
                            <td><center>{i++}</center></td>
                            <td><center>{Data.ProjectName}</center></td>
                            <td><center>{Data.UserProjectName}</center></td>
                            <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.SceneData)), "Scene JSON")}>Scene Json</Button></center></td>
                            <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.AssetData)), "Asset JSON")}>Asset Json</Button></center></td>
                            <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.ActionData)), "Action JSON")}>Action Json</Button></center></td>
                            <td><center><Button onClick={() => showScene(Data.CustomData, "Custom JSON")}>Custom Json</Button></center></td>
                            <td><center><Button onClick={() => showScene(JSON.stringify(JSON.parse(Data.TimelineData)), "Timeline JSON")} >Timeline Json</Button></center></td>

                            <td><center>Done <FcApproval style={{ height: '25px', width: '25px' }}></FcApproval></center></td>
                            <td><center><button onClick={() => downloadText("\n ---Scene JSON---\n\n" + Data.SceneData + "\n\n ---Asset JSON---\n\n" + Data.AssetData + "\n\n ---Action JSON---\n\n" + Data.ActionData + "\n\n ---Custom JSON---\n\n" + Data.CustomData + "\n\n ---Timeline JSON---\n\n" + Data.TimelineData)}> Download </button></center></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </>

    );
}

export default ProjectList;