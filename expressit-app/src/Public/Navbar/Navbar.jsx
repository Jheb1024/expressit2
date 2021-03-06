import React , {useState}from 'react'
import { Dropdown, Navbar, Nav, Container, NavDropdown, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './Navbar.css';
import {signOut,getAuth,onAuthStateChanged} from 'firebase/auth';
import { firebaseApp } from '../../Auth/firebase-config';
import logo from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Assets/images/Logo.png";

const auth = getAuth(firebaseApp);


function NavbarPublic() {
  /*const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      console.log("usuario global: "+usuarioFirebase.uid)
      setUsuarioGlobal(usuarioFirebase);
    }else{
      setUsuarioGlobal(null);
    }
  })*/
  const currentUser = auth.currentUser;
  function cerrarSesion() {
      signOut(auth)
        .then((user) => {
          console.log("El usaurio a cerrado la sesion");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  return (
    <Navbar className="nav-color" collapseOnSelect expand="lg">
      <img src={logo} style={{height:'5%',width:'5%', marginLeft:'50px'}}></img>
    <Container>
      {!currentUser ? 
      <LinkContainer to="/">
        
        <Navbar.Brand >Express it</Navbar.Brand>
      </LinkContainer> :<LinkContainer to="/public/listposts">
        <Navbar.Brand >Express it</Navbar.Brand>
      </LinkContainer> }
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          
        </Nav>
        <Nav>
         {!currentUser ? <LinkContainer to="/user/login"><Nav.Link>Escribir</Nav.Link></LinkContainer> :
         <LinkContainer to="/user/addpost"><Nav.Link>Escribir</Nav.Link></LinkContainer> }
        
        <LinkContainer to="/ourstory"><Nav.Link>Nuestra historia</Nav.Link></LinkContainer>
        {!currentUser ? <LinkContainer to="/user/login"><Nav.Link>Iniciar Sesión</Nav.Link></LinkContainer>: null}
        {!currentUser ? <LinkContainer to="register"><Nav.Link>Registrarse</Nav.Link></LinkContainer> : null}
        {currentUser ? <LinkContainer to="/user/login" onClick={cerrarSesion}><Nav.Link>Cerrar Sesión</Nav.Link></LinkContainer> : null}


        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarPublic