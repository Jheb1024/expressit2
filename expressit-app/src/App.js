import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Public/Landing/Landing';
import NavbarPublic from './Public/Navbar/Navbar';
import Login from './Public/Login/Login';
import Register from './Public/Register/Register';
import OurStory from './Public/OurStory/OurStory';
import Home from './Pages/blogger/HomeBlogger/Home'
import AddPost from './Components/AddPost/AddPost';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavbarPublic/>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>  
    </Routes>
    <Routes>
      <Route path='/user/login' element={<Login/>}></Route>  
    </Routes> 
    <Routes>
      <Route path='/register' element={<Register/>}></Route>  
    </Routes> 
     <Routes>
      <Route path='/ourstory' element={<OurStory/>}></Route>  
    </Routes> 
    <Routes>
      <Route path='/user/home' element={<Home/>}></Route>
    </Routes>
    <Routes>
      <Route path='/user/addpost' element={<AddPost/>}></Route>
    </Routes> 

    </div>
    </BrowserRouter>
    
  );
}

export default App;
