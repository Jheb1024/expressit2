import React, { useEffect, useState } from 'react'
import { Card, Nav, Col, Row, Container, Button } from 'react-bootstrap'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../Auth/firebase-config';
import { Link } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { deletePostUser } from '../../Models/PostFunctions';
function PostPrev({post, user}) {

    async function deletePost() {
    console.log("Eliminado post del user: ",user.uid)
        await deletePostUser(post, user);
        //
        //console.log("Eliminado post del user: ",user.uid)
      }
  return (
    <div>
        <Card style={{ width: '90%', margin: '15px', padding: '25px' }}>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'Left', fontSize:'25px'}}>{post.title} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'Left' }}></Card.Subtitle>
                  <Card.Text style={{ textAlign: 'Left' }}>
                    <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 50) }} />

                  </Card.Text>
                  <Card.Footer style={{ textAlign: 'Left' }} >{new Date(post.date.seconds * 1000).toLocaleDateString("es-MX")}</Card.Footer>
                  <Link to={'/view/post'} state={{ data: post }} style={{padding:'20px', textDecoration:'none', color:'black', fontStyle:'italic'}}>Continuar leyendo...</Link>
                <Link to={'/user/editmypost'} state={{ data: post }} style={{padding:'20px', textDecoration:'none'}}><FaEdit style={{color:'black', height:'20px', width:'20px'}}/></Link>
                <Button onClick={deletePost} variant="light"><RiDeleteBin6Line style={{color:'black', height:'20px', width:'20px'}}/></Button>


                </Card.Body>
              </Card>
    </div>
  )
}

export default PostPrev