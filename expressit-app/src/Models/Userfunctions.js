import { firebaseApp, storage } from "../Auth/firebase-config";
import {addDoc,collection,doc,getFirestore,onSnapshot,setDoc,Timestamp,updateDoc,getDoc,runTransaction, deleteDoc,
} from "firebase/firestore";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { ref, uploadBytes } from "firebase/storage";


const db = getFirestore(firebaseApp);

export async function login(email, password){
    
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password).then(()=>{
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
    })
}

export async function userRegister(email, password, sexo, edad, nombre, apellido){
    const auth = getAuth(firebaseApp); //primero debemos saber cual es nuestro usuario por defecto no existe
  //pero auth nos da uatorización

  //creamos un usuario con correo y contraseña
  const newUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then((nPsicologo) => {
      return nPsicologo;
    })
    .catch((error) => {
      console.log(error.code);
    });

  console.log(newUser);

  if (newUser) {
    //cambiar por paciente
    const docRef = doc(db, `users/${newUser.user.uid}`);
    //rellenar con todos los parametros
    await setDoc(docRef, {
      correo: email,
      password: password,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
     sexo:sexo,
      idUser:newUser.user.uid,
      rol:'user'
    })
      .then(() => {
        console.log("Usuario registrado");
        window.location.href = "/user/login";
      })
      .catch((err) => {
        console.log("Hubo un error al registrarse" + err.message);
      });
  }
}