import { firebaseApp, storage } from "../Auth/firebase-config";
import {addDoc, collection, doc, getFirestore, onSnapshot, setDoc, Timestamp} from 'firebase/firestore'
import {ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid'


const db= getFirestore(firebaseApp);

export async function addPostUser( title, content, category, idUser,imageUpload){
//se agrega la image al storage con el id previo
    if(imageUpload==null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef,imageUpload).then(()=>{
      alert("uploaded")
    })
    
    //primero se agrega el post solito par abtener su id
    const docPost = {
        title: title,
        content:content,
        category: category,
        refImage:imageRef.fullPath,
        date:Timestamp.fromDate(new Date()),
    }

    const postAded = await addDoc(collection(db, "postsUser", idUser, "posts"),docPost);
    
    if(postAded){
      setDoc(doc(db, "allPosts", postAded.id),{
        title: title,
        content:content,
        category: category,
        refImage:imageRef.fullPath,
        date:Timestamp.fromDate(new Date()),
        idUser: idUser
      }).then(()=>{
        console.log("Agregado el otro documento en all posts")
    })
    }
    

//se agrega el post a la subcoleccion post propia del usurio
    
}

export function getListPost(){
  
  onSnapshot(collection(db, "allPosts"),(snapshop)=>{
    return snapshop.docs;
  })
}