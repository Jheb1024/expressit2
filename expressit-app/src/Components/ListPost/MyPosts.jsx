import React, { useEffect, useState } from 'react'
import { Card, Nav, Col, Row, Container, Button } from 'react-bootstrap'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../Auth/firebase-config';
import { Link } from 'react-router-dom';
import SidebarUser from '../SidebarUser/SidebarUser';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin6Line} from 'react-icons/ri'
import PostPrev from './PostPrev';
const db = getFirestore(firebaseApp);

function MyPosts({ user }) {
  const [posts, setPosts] = useState([]);

  


  useEffect(() => {
    function getPosts() {
      onSnapshot(collection(db, "postsUser", user.uid, "posts"), (snapshop) => {
        setPosts(snapshop.docs.map((doc) => doc.data()))
      })
    }

    return () => {
      getPosts()
    }
  }, [])
  return (

    <div>
      <br/>
      <h2>Mis publicaciones</h2>
    <Container>
      <Row style={{ padding: '0' }}>
        <Col xs={1} style={{
          position: 'fixed', wordWrap: 'break-word', minHeight: '120px',
          width: '252px', textAlign: 'center'
        }}>
          <SidebarUser style={{}}></SidebarUser>
        </Col>
        <Col style={{ paddingLeft: '100px' }}>
            {posts?.map(post => (
              <PostPrev post={post} user={user}/>
            ))}
          </Col>
        </Row>
      </Container>



    </div>
  )
}

export default MyPosts