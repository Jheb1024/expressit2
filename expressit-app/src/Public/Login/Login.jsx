import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {Link} from "react-router-dom";
import {firebaseApp} from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Auth/firebase-config.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Container, Row, Col, FormLabel} from 'react-bootstrap'
import registerImage from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Assets/images/97.png";
import './Login.css'
function Login() {

    const auth = getAuth(firebaseApp);
    
    

     function iniciarSesion( email, password){
        return signInWithEmailAndPassword(auth, email, password)
        
      }

    function onSubmit() {

        const db = getFirestore();
        const user = auth.currentUser;
        console.log("uiddd" + user.uid);

        if (user !== null) {

            const docRef = doc(db, "users", user.uid);

            getDoc(docRef).then((doc) => {
                console.log(doc.data(), doc.data().correo, doc.data().rol);
                const roldata = doc.data().rol;
                if (roldata === "admin") {
                   window.location.href = "/home-admin";
                } else if (roldata === "user") {
                    window.location.href="/user/home";
                }
            })
        }
    }

    async function submitHandler(email, pass) {
        

        
        console.log("submit", email, pass);

        await iniciarSesion(email, pass).then(() => {
            onSubmit()
        }).catch(error => {
            console.log("entramos al catch, error: ", error)
            switch (error.code) {
                case 'auth/invalid-email':
                    console.log();
                    Error = "Email invalido";
                   
                    break;

                case 'auth/user-disabled':
                    console.log("Este usuario ha sido desabilitado");
                    Error = "Este usuario ha sido desabilitado";
                   
                    break;

                case 'auth/user-not-found':
                    console.log("Usuario no encontrado");
                    Error = "Usuario no encontrado";
                  
                    break;

                case 'auth/wrong-password':
                    console.log("Contraseña incorrecta");
                 
                    break;

                default:
                    
                    break;
            }
        })

    }

  return (
    <div><h1>Inicio de Sesión</h1>
    <Container>
      <Row>
      <Col>
      <div>
        <img src={registerImage} style={{width:'600px', height:'400px'}}></img>
      </div>
      </Col>
      <Col>
      <div className='registerForm' style={{textAlign:'center', height:'300px'}}>
      <Formik
      initialValues={{ email: '', password: ''}}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Se requiere de un correo';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Correo invalido';
        }
        if (!values.password) {
          errors.password = "Se requiere contraseña";
        }else{
          if (values.password.length < 8) {
          errors.password = "La contraseña es demasiado débil";
        }
        }
        
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        submitHandler(values.email,values.password)
      }}
    >
      {({ isSubmitting }) => (
       

        
        <Form >
          
          <div className='fielderror'>
          <Field type="email" name="email" placeholder='Correo' className='field'/>
          <ErrorMessage name="email" component="div" className='error'/>
          </div>
          <div className='fielderror'>
          <Field type="password" name="password"  placeholder='Contraseña' className='field'/>
          <ErrorMessage name="password" component="div" className='error' />
          </div>
          <button type="submit" disabled={isSubmitting} className='buttonForm'>
            Entrar
          </button>
          <br></br>
          <Link style={{marginLeft:'100px', color:'black'}} to='/register'>¿Aún no tienes una cuenta?</Link>
        </Form>
       
      )}
    </Formik> </div>
      </Col>
      </Row>
    </Container>
   

    </div>
  )
}

export default Login