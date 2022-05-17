import React, { useState, useRef, useEffect } from 'react'
import { ReactDOM } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../../../src/Components/Draft.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './AddPost.css';
import { storage } from '../../Auth/firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'
import { addPostUser } from '../../Models/PostFunctions';
import {Container, Row,Col} from 'react-bootstrap';
import SidebarUser from '../SidebarUser/SidebarUser';


function AddPost({ user }) {
  const [categoria, setCategoria] = useState(['General', 'Salud', 'Negocios', 'Vida', 'Tecnología', 'Deportes', 'Literatura']);
  const [literatura, setLiteratura] = useState(null);
  const [category, setCategory] = useState('General');
  const Cat = categoria.map((Cat) => Cat);
  const handleCategoryChange = (e) => {
    console.clear()
    console.log(categoria[e.target.value]);
    console.log(e.target.value)

    if (categoria[e.target.value] === 'Literatura') {
      setLiteratura('Literatura');
    } else {
      setLiteratura(null);
    }

    setCategory(categoria[e.target.value].toString());
  };

  const [lit, setLit] = useState(null);
  function handleChange(e) {
    setLit({ value: e.target.value });
    console.log(lit);
  }


  const [imageUpload, setImageUpload] = useState(null);
  const initialValue = "Esperando por algo asombroso..."
  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

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
          <Col style={{ paddingLeft: '20px' }}>
            <h1>Escribir un nuevo post</h1>
            <div className='image' >
              <input clasName='file' type='file' onChange={(event) => {
                setImageUpload(event.target.files[0])
              }}></input>

            </div>
            <div className='post'>

              <Formik
                initialValues={{ title: '', content: '' }}
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
                  addPostUser(values.title, value, user.uid, imageUpload, category, lit);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='form-box' style={formStyle}>
                    <Field type="text" name="title" placeholder="Título" style={inputStyle} />
                    <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
                    <label style={{ textAlign: 'right', alignItems: 'start', float: 'left' }}> Categoría</label>
                    <br></br>
                    <select style={{ width: '100px', float: 'left', border: 'none' }}
                      onChange={(e) => handleCategoryChange(e)}
                      className="browser-default custom-select"
                    >
                      {Cat.map((address, key) => (
                        <option key={key} value={key}>
                          {address}
                        </option>
                      ))}
                    </select>
                    <br></br>
                    <br></br>

                    {literatura ? <div><label style={{ width: '100px', float: 'left', border: 'none' }}>
                      Tipo de obra
                      <select onChange={handleChange} style={{ border: 'none' }}>
                        <option value="poesia">Poesía</option>
                        <option value="cuento">Cuento</option>
                        <option value="novela">Novela</option>
                        <option value="verso libre">Verso Libre</option>
                      </select>
                    </label> <br /><br /><br /></div> : null}

                    <Editor style={textareaStyle}
                      apiKey='qnppcppwb4gg50aqml9w8o24jjb5zvdqf3nglhidqvfndifz'
                      initialValue={initialValue}
                      value={value}
                      onEditorChange={(newValue, editor) => setValue(newValue)}
                    />
                    <ErrorMessage name="content" component="div" style={{ color: 'red' }} />
                    <button type="submit" disabled={isSubmitting}  className='buttonForm'>
                      Publicar
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

export default AddPost

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