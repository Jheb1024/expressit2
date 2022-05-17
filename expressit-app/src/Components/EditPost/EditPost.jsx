import React, { useState, useRef, useEffect } from 'react'
import { ReactDOM } from 'react';
import { useLocation } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import '../../../src/Components/Draft.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './AddPost.css';
import { storage } from '../../Auth/firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
import { updatePost } from '../../Models/PostFunctions';
import { Container, Row, Col } from 'react-bootstrap'
import SidebarUser from '../SidebarUser/SidebarUser';

function EditPost({ user }) {
  const location = useLocation();
  const post = location.state?.data;
  // <Field type="text" name="content" placeholder="Contenido" style={textareaStyle}/>
  const editorRef = useRef(null);
  const log = () => {
    if (value) {
      console.log(value);
    }
  };

  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    /*uploadBytes(imageRef,imageUpload).then(()=>{
      alert("uploaded")
    })*/
    console.log(imageRef.fullPath);

  }
  const initialValue = post.content;
  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  return (
    <div>

      <h1>Editar Post</h1>
      <Container>
        <Row style={{ padding: '0' }}>
          <Col xs={1} style={{
            position: 'fixed', wordWrap: 'break-word', minHeight: '120px',
            width: '252px', textAlign: 'center'
          }}>
            <SidebarUser></SidebarUser>
          </Col>
          <Col style={{ paddingLeft: '100px' }}>
            <div className='image'>
              <input type='file' onChange={(event) => {
                setImageUpload(event.target.files[0])
              }}></input>
              {/*<button onClick={uploadImage}>Subir imagen</button>*/}
            </div>
            <div className='post'>

              <Formik
                initialValues={{ title: post.title, content: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.title) {
                    errors.title = 'El titulo es requerido';
                  }
                  if (!value) {
                    errors.content = 'El contenido es requerido';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  //Llamamos a la funcion para poder guardar el post y la imagen
                  updatePost(values.title, value, "Salud", user.uid, imageUpload, post.idPost);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='form-box' style={formStyle}>
                    <Field type="text" name="title" placeholder="Título" style={inputStyle} />
                    <ErrorMessage name="title" component="div" style={{ color: 'red' }} />

                    <Editor style={textareaStyle}
                      apiKey='qnppcppwb4gg50aqml9w8o24jjb5zvdqf3nglhidqvfndifz'
                      initialValue={initialValue}
                      value={value}
                      onEditorChange={(newValue, editor) => setValue(newValue)}
                    />
                    <ErrorMessage name="content" component="div" style={{ color: 'red' }} />
                    <button type="submit" disabled={isSubmitting}>
                      Actualizar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

          </Col>
        </Row>
      </Container>


    </div>
  )
}

export default EditPost

const formStyle = {

  height: '100vh',

  /* border: 1px solid red; */
  margin: '0vw',
  padding: '5vw',
  //position: 'relative',
  border: '0'
  /* position:relative for .prevBtn and .nextBtn position:absolute; */
}

const inputStyle = {
  display: 'block',
  width: '700px',
  padding: '.5rem .8rem .5rem .8rem',
  margin: '.9vw 0',
  border: '0',
  borderRadius: '5px',
  fontSize: '30px',
  fontWeight: 'bold'
}

const textareaStyle = {
  display: 'block',
  width: '700px',
  padding: '.5rem .8rem .5rem .8rem',
  margin: '.9vw 0',
  border: '0',
  borderRadius: '5px',
  fontSize: '20px',
  height: '15vh'
}

const errorMessageStyle = {
  color: 'red'
}