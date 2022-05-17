import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../Auth/firebase-config';
import { Link } from 'react-router-dom';
import SidebarUser from '../SidebarUser/SidebarUser';


const db = getFirestore(firebaseApp);


function ListPosts() {

    const [posts, setPosts] = useState([]);
    const [postsTemp, setPostsTemp] = useState();



    const url = 'http://localhost:57144/api/getAllPosts'
    const url2 = 'http://localhost:57144/api/getPosts/'
    const fetchApi = async () => {
        const respose = await fetch(url);
        console.log(respose.statusText);
        const responseJson = await respose.json()
        console.log(responseJson)
        setPostsTemp(responseJson);
    }
    const fetchApi2 = async (termino) => {
        const newUrl = url2 + termino;
        const respose = await fetch(newUrl);
        console.log(respose.statusText);
        const responseJson = await respose.json()
        console.log(responseJson)
        setPostsTemp(responseJson);
    }

    function submitHandler(event) {
        event.preventDefault();
        const termino = event.target.elements.busqueda.value;
        fetchApi2(termino);
    }


    useEffect(() => {
        function getPosts() {
            onSnapshot(collection(db, "allPosts"), (snapshop) => {
                setPosts(snapshop.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            getPosts()
        }
    }, [])

    useEffect(() => {
        fetchApi()
    }, [])



    return (
        <div>
            <br />
            <h2>Posts de la comunidad</h2>
            <Container>
                <Row>
                    <Col xs={1} style={{
                        position: 'fixed', wordWrap: 'break-word', minHeight: '120px',
                        width: '252px', textAlign: 'center'
                    }}>
                        <SidebarUser></SidebarUser>
                    </Col>
                    <Col style={{ paddingLeft: '100px' }}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Naturaleza" 
                                name='busqueda'
                                id='busqueda'/>
                            </Form.Group>
                            <Button variant="light" type="submit">
                               Buscar
                            </Button>
                        </Form>
                        {posts?.map(post => (
                            <Card style={{ width: '90%', margin: '15px', padding: '25px' }}>
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'Left' }}>{post.title} </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'Left' }}>{post.author} </Card.Subtitle>
                                    <Card.Text style={{ textAlign: 'Left' }}>
                                        <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 50) }} />

                                    </Card.Text>
                                    <Card.Footer style={{ textAlign: 'Left' }} >{new Date(post.date.seconds * 1000).toLocaleDateString("es-MX")}</Card.Footer>
                                    <Link to={'/view/post'} state={{ data: post }}>ContinuarLeyendo</Link>

                                </Card.Body>
                            </Card>
                        ))}
                        <ul>
                            {/*postsTemp?.map((post, index) => {
                                return (
                                    <Card style={{ width: '90%', margin: '15px', padding: '25px' }}>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'Left' }}>{post.title} </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'Left' }}>{post.author} </Card.Subtitle>
                                            <Card.Text style={{ textAlign: 'Left' }}>
                                                <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 50) }} />

                                            </Card.Text>
                                            <Card.Footer style={{ textAlign: 'Left' }} >{new Date(post.date).toLocaleDateString("es-MX")}</Card.Footer>
                                            <Link to={'/view/post'} state={{ data: post }}>ContinuarLeyendo</Link>

                                        </Card.Body>
                                    </Card>)
                            })*/}</ul>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ListPosts