import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { onSnapshot, getFirestore, doc } from 'firebase/firestore';
import { firebaseApp } from '../../Auth/firebase-config';
import './Post.css'
import ButtonLike from '../LikeReaction/ButtonLike';
import { Container, Col, Row } from 'react-bootstrap';
import SidebarUser from '../SidebarUser/SidebarUser';
import SharedComponente from './SharedComponente';
import 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v13.0'




const db = getFirestore(firebaseApp);
function getImage(refImage) {
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

  const [numberLikes, setNumberLikes] = useState(null);
  const location = useLocation();
  const post = location.state?.data;
  getImage(post.refImage);
  useEffect(() => {
    async function getLikes() {
      const unsub = onSnapshot(doc(db, "likes", "N9s4oOPcKOZ510vPPU7V"), (doc) => {
        console.log("Current data: ", doc.data());
        setNumberLikes(doc.data().likes)
      });
    }

    return () => {
      getLikes()
    }
  }, [])

 
  

  return (
    <div>
      <Container>
        <Row>
          <Col xs={1} style={{
            position: 'fixed', wordWrap: 'break-word', minHeight: '120px',
            width: '252px', textAlign: 'center'
          }}>
            <SidebarUser></SidebarUser>
          </Col>
          <Col style={{ paddingLeft: '130px' }}>
            <div className="container">
              <div className='autor'>{post.author}</div>
              <div className="fecha">{ new Date(post.date.seconds * 1000).toDateString() ? new Date(post.date.seconds * 1000).toDateString() : new Date(post.date.seconds).toDateString()}</div>
              <div className="titulo">{post.title}</div>
              <img id='myimg'></img>
              <div className="contenido" dangerouslySetInnerHTML={{ __html: post.content }} />

            </div>
            <div className='button-like' style={styleButtonLike}>
              <ButtonLike numberLikes={numberLikes}></ButtonLike>
              <div class="share" >
              <div class="fb-share-button" data-href="https://expressit.com/view/post" 
              data-layout="button_count" data-size="small"><a target="_blank" 
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexpressit.com%2Fview%2Fpost&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                Compartir</a></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>




    </div>
  )
}

export default Post

const styleButtonLike = {
  padding: '25px',
  margin: '10px',
  alignContent: 'left',
  float: 'left'
}
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};