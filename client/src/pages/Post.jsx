import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import './Post.css'
import { AuthContext } from '../helpers/AuthContext'
import { FaTrash } from 'react-icons/fa';



const Post = () => {

    let { id } = useParams()

    const [postObject, setpostObject] = useState({})
    const [comments, setcomments] = useState([])
    const [newComment, setnewComment] = useState('')
    const { authState } = useContext(AuthContext)

    useEffect(() => {

        axios.get(`http://localhost:3003/posts/byId/${id}`).then((response) => {
            setpostObject(response.data)
        })
        axios.get(`http://localhost:3003/comments/${id}`).then((response) => {
            setcomments(response.data)
        })

    }, [])

    const addComment = () => {

        axios.post(`http://localhost:3003/comments`, {
            commentBody: newComment, PostId: id
        }, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }
        )
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)

                } else {
                    const commentToAdd = { commentBody: newComment, username: res.data.username }
                    setcomments([...comments, commentToAdd])
                    setnewComment("")
                }
            })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3003/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(() => {
            setcomments(
                comments.filter((val) => { return val.id !== id; })
            ) // val.id is not equal to the id parameter, it returns true, indicating that the comment should be included in the filtered array.If val.id is equal to the id parameter, it returns false, indicating that the comment should be excluded from the filtered array.

        })
    }
    const navigate = useNavigate()

    const deletePost = (id) => {
        axios.delete(`http://localhost:3003/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(() => {
            navigate("/")
            alert('Post deleted successfully')
        })


    }

    const editPost = (option) => {

        if (option === 'title') {
            let newTitle = prompt('Enter a new Post Title! ')

            axios.put(`http://localhost:3003/posts/title`, { newTitle: newTitle, id: id }, { headers: {
                accessToken: localStorage.getItem('accessToken')
            } }
            
            ).then(() => {
                
                setpostObject({...postObject, title: newTitle})
                
            })


        } else {

            let newText = prompt('Enter new Post Description! ')
            axios.put(`http://localhost:3003/posts/postText`, { newText: newText, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }

            ).then(() => {
                
                setpostObject({ ...postObject, description: newText })
            })
        }

    }

    const iconStyle = {
        fontSize: '19px', // Adjust the size
        color: 'white', // Set the color to white
        cursor: 'pointer', // Set cursor to pointer
     // Adjust margin-top (use camelCase)
        position: 'absolute', // Position the icon absolutely
        right: '0', // Push the icon to the maximum right
        marginRight: '8rem',
        marginBottom: '3rem'

    };



    return (
        postObject != null && <div className="postPage">

            <div className="leftSide">
                <div className="title" onClick={() => {
                    if (authState.username === postObject.username) {
                        editPost('title')
                    }

                }} >{postObject.title}</div>

                <div className="postText" onClick={() => {
                    if (authState.username === postObject.username) {
                        editPost('body')
                    }
                }
                }

                >{postObject.description}</div>

                <div className="username">
                    <div className='userBox'>
                        <div>
                            @{postObject.username}
                        </div>
                        <div>
                            {authState.username === postObject.username && (
                                <button className="DeleteBtn" onClick={() => { deletePost(postObject.id) }} >
                                    Delete Post
                                </button>
                            )}

                        </div>
                    </div>


                </div>

            </div>

            <div className="rightSide"
            >
                <div className="addCommentContainer">
                    <input value={newComment} className='commentinput' type="text" placeholder='Comments Here..' onChange={(event) => { setnewComment(event.target.value) }} />

                    <button type="submit" disabled={newComment === ''} onClick={addComment}>
                        Add Comment
                    </button>

                </div>

                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">@{comment.username}
                                <br />


                                {comment.commentBody}

                                {authState.username === comment.username ? <div
                                    style={iconStyle} // Add cursor style
                                    onClick={() => {
                                        deleteComment(comment.id);
                                    }}
                                >
                                    <FaTrash />
                                </div>
 : ""
                                }

                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Post
