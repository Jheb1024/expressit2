import React, {useEffect, useState}from 'react'
import {Card} from 'react-bootstrap'
import {onSnapshot,collection,getFirestore} from 'firebase/firestore'
import { firebaseApp } from '../../Auth/firebase-config';
import { Link } from 'react-router-dom';

const db= getFirestore(firebaseApp);


function ListPosts() {

    const [posts, setPosts] = useState([]);

useEffect(() => {
  function getPosts(){
    onSnapshot(collection(db, "allPosts"),(snapshop)=>{
       setPosts(snapshop.docs.map((doc)=>doc.data()))
      })
  }

  return () => {
    getPosts()
  }
}, [])

    return (
        <div>ListPosts

            { posts?.map(post=>(
                <Card style={{ width: '90%', margin:'15px', padding:'25px' }}>
                <Card.Body>
                    <Card.Title style={{ textAlign:'Left'}}>{post.title} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ textAlign:'Left'}}>{post.author} </Card.Subtitle>
                    <Card.Text style={{ textAlign:'Left'}}>
                    <div dangerouslySetInnerHTML={{__html: post.content.substring(0,50)}} />
                    
                    </Card.Text>
                    <Card.Footer style={{ textAlign:'Left'}} >{new Date(post.date.seconds * 1000).toLocaleDateString("es-MX")}</Card.Footer>
                    <Link to={'/view/post'} state={{data:post}}>ContinuarLeyendo</Link>
                 
                </Card.Body>
            </Card>
            )) }
        </div>
    )
}

export default ListPosts