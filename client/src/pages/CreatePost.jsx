import { Formik, Form, Field, ErrorMessage } from 'formik'
import './CreatePost.css'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const CreatePost = () => {
    
    let navigate = useNavigate()
         
    const initialValues = {
        title: "",
        description: "",
        
    }

 useEffect(() => {
   
     if (!localStorage.getItem('accessToken')) {
        navigate('/login')
         
     }
     
 }, [])
     

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('You must provide a title'),
        description: Yup.string().required('Description cant be empty'), 
        
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3003/posts', data, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(() => {
            navigate('/')
            
        })
        // alert('Post Created')
    }

    return (
        <div className='createPostPage'>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                <Form className='formContainer'>
                    
                    <label>Title: </label>

                    <ErrorMessage name='title' component="span" />
                    
                    <Field id="inputCreatePost" name="title" placeholder="(Ex. Title...)" />

                    <label>Post: </label>

                    <ErrorMessage name='description' component="span" />

                    <Field id="inputCreatePost" name="description" placeholder="(Ex. Post...)" />

                

                    <button type='submit' >Create a Post</button>

                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
