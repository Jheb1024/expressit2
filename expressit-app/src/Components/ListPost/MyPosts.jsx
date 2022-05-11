import React, {useEffect, useState}from 'react'
import {Card} from 'react-bootstrap'
import {onSnapshot,collection,getFirestore} from 'firebase/firestore'
import { firebaseApp } from '../../Auth/firebase-config';
import { Link } from 'react-router-dom';

const db= getFirestore(firebaseApp);

function MyPosts({user}) {
    const [posts, setPosts] = useState([]);

useEffect(() => {
  function getPosts(){
    onSnapshot(collection(db, "postsUser", user.uid, "posts" ),(snapshop)=>{
       setPosts(snapshop.docs.map((doc)=>doc.data()))
      })
  }

  return () => {
    getPosts()
  }
}, [])
  return (
    <div>MyPosts
        { posts?.map(post=>(
                <Card style={{ width: '90%', margin:'15px', padding:'25px' }}>
                <Card.Body>
                    <Card.Title style={{ textAlign:'Left'}}>{post.title} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ textAlign:'Left'}}></Card.Subtitle>
                    <Card.Text style={{ textAlign:'Left'}}>
                    <div dangerouslySetInnerHTML={{__html: post.content.substring(0,50)}} />
                    
                    </Card.Text>
                    <Card.Footer style={{ textAlign:'Left'}} >{new Date(post.date.seconds * 1000).toLocaleDateString("es-MX")}</Card.Footer>
                    <Link to={'/view/post'} state={{data:post}}>Continuar Leyendo</Link>
                    <Link to={'/user/editmypost'} state={{data:post}}>Editar</Link>
                    <Link to={'/view/post'} state={{data:post}}>Borrar</Link>

                 
                </Card.Body>
            </Card>
            )) }
    </div>
  )
}

export default MyPosts