import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {Link} from "react-router-dom";
import {firebaseApp} from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Auth/firebase-config.js"

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

    async function submitHandler(e) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const pass = e.target.elements.password.value;
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
    <div className="container">
            <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    Iniciar Sesion
                </div>


                <form className="formulario" onSubmit={submitHandler}>
                    <input type="text" id="email" className="fadeIn second" name="email" placeholder="Usuario" />
                    <input type="password" id="password" className="fadeIn third" name="login" placeholder="Contraseña" />
                    <input type="submit" className="fadeIn fourth" value="Entrar" />
                </form>


                <div id="formFooter">
                    <Link to="/">¿Olvidaste tu contraseña?</Link>
                    <p>¿Aun no tienes una cuenta?</p>
                    <Link to="/registro-paciente"> Paciente</Link>
                    <br></br>
                    <Link to="/registro-psicologo"> Psicologo</Link>
                </div>

            </div>
            </div>
        </div>
  )
}

export default Login