import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Container, Row, Col, FormLabel} from 'react-bootstrap'
import registerImage from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Assets/images/156.png";
import './Register.css'
import { userRegister } from '../../Models/Userfunctions';
import {Link} from 'react-router-dom'
function Register() {
  return (
    <div><h1>Registro</h1>
    <Container>
      <Row>
      <Col>
      <div>
        <img src={registerImage} style={{width:'600px', height:'400px'}}></img>
      </div>
      </Col>
      <Col>
      <div className='registerForm' style={{textAlign:'center', height:'500px'}}>
      <Formik
      initialValues={{ email: '', password: '', sexo: '', edad:'', nombre:'', apellido:'' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Se requiere de un correo';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Correo invalido';
        }
        if (!values.password) {
          errors.password = "Se requiere contraseña";
        }else{
          if (values.password.length < 8) {
          errors.password = "La contraseña es demasiado débil";
        }
        }
        if (!values.nombre) {
          errors.nombre = "Se requiere el nombre";
        }
        if (!values.edad ){
          errors.edad = "Se requiere el edad";
        }
        if (!values.sexo ||values.sexo ==='seleccione') {
          errors.sexo = "Se requiere el sexo";
        }
        if(!values.apellido){
          errors.apellido = "Se requiere el primer apellido";
        }
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        userRegister(values.email,values.password,values.sexo,values.edad,values.nombre,values.apellido)
      }}
    >
      {({ isSubmitting }) => (
       

        
        <Form >
          <div className='fielderror'>
          <Field  name="nombre"  placeholder='Nombre' className='field'/>
          <ErrorMessage name="nombre" component="div" className='error' />
          </div>
          <div className='fielderror'>
          <Field  name="apellido"  placeholder='Apellido' className='field'/>
          <ErrorMessage name="apellido" component="div" className='error' />
          </div>
          <div className='fielderror'>
          <Field  name="edad"  placeholder='Edad' className='field'/>
          <ErrorMessage name="edad" component="div" className='error' />
          </div>
          <div className='fielderror'>
         
          <Field as="select" name="sexo" className='field'>
          <option value="seleccione">Seleccione su sexo</option>
             <option value="mujer">Mujer</option>
             <option value="hombre">Hombre</option>
             <option value="otro">Otro</option>
           </Field>
          <ErrorMessage name="sexo" component="div" className='error' />
          </div>
          <div className='fielderror'>
          <Field type="email" name="email" placeholder='Correo' className='field'/>
          <ErrorMessage name="email" component="div" className='error'/>
          </div>
          <div className='fielderror'>
          <Field type="password" name="password"  placeholder='Contraseña' className='field'/>
          <ErrorMessage name="password" component="div" className='error' />
          </div>
          <button type="submit" disabled={isSubmitting} className='buttonForm'>
            Registrar
          </button>
          <br/>
          <Link style={{marginLeft:'100px', color:'black'}} to='/user/login'>¿Ya tienes una cuenta?</Link>
        </Form>
       
      )}
    </Formik> </div>
      </Col>
      </Row>
    </Container>
   

    </div>
  )
}

export default Register