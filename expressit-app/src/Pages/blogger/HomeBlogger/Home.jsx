import React ,{useEffect,useState}from 'react'
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import SidebarUser from '../../../Components/SidebarUser/SidebarUser'
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import { firebaseApp } from '../../../Auth/firebase-config';

function Home({user}) {
  const [userBlog, setUserBlog]=useState(null);
console.log(user);
const db = getFirestore(firebaseApp);

  useEffect(()=>{
    const docRef = doc(db, `users/${user.uid}`);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      console.log("Current data: ", doc.data());
      setUserBlog(doc.data());
  });
  return()=>{
    unsubscribe();
  }

  }, []);

  return (
    <div>
      <Container>
        <Row style={{ padding: '0' }}>
          <Col xs={1} style={{
            position: 'fixed', wordWrap: 'break-word', minHeight: '120px',
            width: '252px', textAlign: 'center'
          }}>
            <SidebarUser></SidebarUser>
          </Col>
          <Col style={{ paddingLeft: '100px' }}>
          {userBlog ?<div className='cuenta'>
            <h1>Información de la cuenta</h1>
            <Card>
              <Card.Header>Usuario</Card.Header>
              <Card.Body>
                <Card.Title>Datos</Card.Title>
                <Card.Text>
                  <b>Nombre:</b> {userBlog.nombre}
                </Card.Text>
                <Card.Text>
                  <b>Apellido:</b> {userBlog.apellido}
                </Card.Text>
                <Card.Text>
                  <b>Edad:</b> {userBlog.edad}
                </Card.Text>
                <Card.Text>
                  <b>Correo:</b> {userBlog.correo}
                </Card.Text>
                
              </Card.Body>
            </Card></div> : null} 
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home