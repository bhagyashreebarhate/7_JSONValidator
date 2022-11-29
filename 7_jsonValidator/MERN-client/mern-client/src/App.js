import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Project from './components/Project';
import ProjectList from './components/ProjectList';




import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="signup" element={<SignUpForm />}/>
        <Route path="login" element={<LoginForm />}/>
        <Route path="validateJson" element={<Profile />}/>
        <Route path="Project" element={<Project />}/>
        <Route path="ProjectList" element={<ProjectList />}/>



    </Routes>
  </BrowserRouter>);
}

export default App;
