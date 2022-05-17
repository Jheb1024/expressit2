import './App.css';
import React,{useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Public/Landing/Landing';
import NavbarPublic from './Public/Navbar/Navbar';
import Login from './Public/Login/Login';
import Register from './Public/Register/Register';
import OurStory from './Public/OurStory/OurStory';
import Home from './Pages/blogger/HomeBlogger/Home'
import AddPost from './Components/AddPost/AddPost';
import ListPosts from './Components/ListPost/ListPosts';
import Post from './Components/ListPost/Post';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './Auth/firebase-config';
import MyPosts from './Components/ListPost/MyPosts';
import EditPost from './Components/EditPost/EditPost';
const auth = getAuth(firebaseApp);
function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
onAuthStateChanged(auth, (usuarioFirebase)=>{
  if(usuarioFirebase){
    console.log("usuario global: "+usuarioFirebase.uid)
    setUsuarioGlobal(usuarioFirebase);
  }else{
    setUsuarioGlobal(null);
  }
})


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
      <Route path='/user/home' element={usuarioGlobal && <Home user={usuarioGlobal}/>}></Route>
    </Routes>
    <Routes>
      <Route path='/user/addpost' element={usuarioGlobal && <AddPost user={usuarioGlobal}/>}></Route>
    </Routes>
    <Routes>
      <Route path='/public/listposts' element={<ListPosts/>}></Route>
    </Routes>
    <Routes>
      <Route path='/view/post' element={<Post/>}></Route>
    </Routes>
    <Routes>
      <Route path='/user/myposts' element={usuarioGlobal && <MyPosts user={usuarioGlobal}/>}></Route>
    </Routes>
    <Routes>
      <Route path='/user/editmypost' element={usuarioGlobal && <EditPost user={usuarioGlobal}/>}></Route>
    </Routes> 

    </div>
    </BrowserRouter>
    
  );
}

export default App;
