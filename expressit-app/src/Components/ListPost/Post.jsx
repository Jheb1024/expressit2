import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './Post.css'

function getImage(refImage){
    const storage = getStorage();
getDownloadURL(ref(storage, refImage))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
}
function Post() {
    const location = useLocation();
    const post = location.state?.data;
    getImage(post.refImage);
    return (
        <div>
            <div className="container">
                <div className='autor'>{post.author}</div>
                <div className="fecha">{new Date(post.date.seconds * 1000).toDateString()}</div>
                <div className="titulo">{post.title}</div>
                <img id='myimg'></img>
                <div className="contenido" dangerouslySetInnerHTML={{ __html: post.content }} />
                
            </div>


        </div>
    )
}

export default Post