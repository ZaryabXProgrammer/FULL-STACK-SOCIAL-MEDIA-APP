import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './CreatePost.css'
import axios from 'axios'
import { useNavigate } from 'react-router'


const Registration = () => {

    const initialValues = {
        username: "",
        password: "",


    }

    const validationSchema = Yup.object().shape({

        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required('Please Enter Your Password'),
       
    })

    const navigate = useNavigate()

    const onSubmit = (data) => { 
        axios.post('http://localhost:3003/auth/', data).then((response) => { 
            console.log("Created User", response)
        })  
        navigate('/')
        alert('User created successfully')
    }


  return (
      <div className='createPostPage' style={{ "display": 'flex', "flex-direction": "column" }}>

          <div className="register">
              <h1>Registration</h1>
          </div>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

              <Form className='formContainer'>

                  <label>Username: </label>

                  <ErrorMessage name='username' component="span" />

                  <Field id="inputCreatePost" name="username" placeholder="(Ex. Zaryab123...)" />

                  <label>Password: </label>

                  <ErrorMessage name='password' component="span" />

                  <Field id="inputCreatePost" name="password" placeholder="Your Password" type='password' />

                  <button type='submit' >Register</button>

              </Form>
          </Formik>
    </div>
  )
}

export default Registration
