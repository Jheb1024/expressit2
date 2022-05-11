import { firebaseApp, storage } from "../Auth/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const db = getFirestore(firebaseApp);

export async function addPostUser(
  title,
  content,
  idUser,
  imageUpload,
  categoria, 
  lit
) {
  //se agrega la image al storage con el id previo
  if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload).then(() => {
    //alert("uploaded");
  });

  //obtenemos el nombre del user
  const authorName = await getAuthorName(idUser);

  //primero se agrega el post solito par abtener su id
  const docPost = {
    title: title,
    content: content,
    category: categoria,
    refImage: imageRef.fullPath,
    date: Timestamp.fromDate(new Date()),
    author:authorName,
    literatura:lit
  };

  const postAded = await addDoc(
    collection(db, "postsUser", idUser, "posts"),
    docPost
  );

  if (postAded) {
    setDoc(doc(db, "allPosts", postAded.id), {
      title: title,
      content: content,
      category: categoria,
      refImage: imageRef.fullPath,
      date: Timestamp.fromDate(new Date()),
      idUser: idUser,
      idPost: postAded.id,
      author:authorName,
      literatura:lit
      
    }).then(() => {
      console.log("Agregado el otro documento en all posts");
    });
  }
  const postUserRef = doc(db, "postsUser", idUser, "posts", postAded.id);
  await updateDoc(postUserRef, {
    idPost: postAded.id,
  });

  //se agrega el post a la subcoleccion post propia del usurio
}

export function getListPost() {
  onSnapshot(collection(db, "allPosts"), (snapshop) => {
    return snapshop.docs;
  });
}

///Actualizar los posts con o sin imagen

export async function updatePost(
  title,
  content,
  category,
  idUser,
  imageUpload,
  idPost
) {
  const userPostRef = doc(db, "postsUser", idUser, "posts", idPost);
  const PostRef = doc(db, "allPosts", idPost);

  if (imageUpload == null) {
    await updatePostWithoutImage(userPostRef, PostRef, category, content, title).then(()=>{
      console.log("Post Gaurdado");
    })
  } else {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("uploaded");
    });
    await updatePostWithImage(
      userPostRef,
      PostRef,
      category,
      content,
      title,
      imageRef
    ).then(()=>{
      console.log("Post Gaurdado");
    })
  }
}

async function updatePostWithoutImage(
  userPostRef,
  PostRef,
  category,
  content,
  title
) {
  await updateDoc(userPostRef, {
    category: category,
    content: content,
    title: title,
  });

  await updateDoc(PostRef, {
    category: category,
    content: content,
    title: title,
  });
}

async function updatePostWithImage(
  userPostRef,
  PostRef,
  category,
  content,
  title,
  imageRef
) {
  await updateDoc(userPostRef, {
    category: category,
    content: content,
    title: title,
    refImage: imageRef.fullPath,
  });

  await updateDoc(PostRef, {
    category: category,
    content: content,
    title: title,
    refImage: imageRef.fullPath,
  });
}

async function getAuthorName(userId) {

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const name = docSnap.data().nombre + " " + docSnap.data().apellido;
    return name;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
