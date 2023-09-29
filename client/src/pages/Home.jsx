import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { IoMdThumbsUp } from 'react-icons/io';
import { } from "react";
import { Link } from "react-router-dom";


const Home = () => {


    const [listOfPosts, setlistOfPosts] = useState([])
  
    let navigate = useNavigate();

    useEffect(() => {


        if (!localStorage.getItem('accessToken')) {
            navigate('/login')
        } else {
            
      

            axios.get('http://localhost:3003/posts').then((response) => {
                console.log(response.data)
                setlistOfPosts(response.data)
            })
            
        }
    }, [])


    const likePost = (postId) => {
        axios.post('http://localhost:3003/likes',
            { PostId: postId }, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }

        ).then((response) => {
            // alert(response.data);
            setlistOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] }
                    } else {
                        const likesArray = post.Likes
                        likesArray.pop()
                        return {
                            ...post, Likes: likesArray
                        }
                    }

                } else {
                    return post
                }
            }))
        })
    }


    return (
        <div className="HomePosts">

            {listOfPosts.map((value, key) => {
                return (
                    <div key={key}
                        className="post"
                    >

                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => {
                            navigate(`/post/${value.id}`);

                        }}>{value.description}</div>

                        <div className="likeArea">
                            <div className="userName">
                                <Link to={`/profile/${value.UserId}`} >  @{value.username}</Link>
                               </div>

                            <div className="likeSec">
                                <button className="likeBtn"
                                    onClick={() => {
                                        likePost(value.id)
                                    }}>
                                    <IoMdThumbsUp />{value.Likes.length}
                                </button>
                            </div>

                            {/* <button className="likeBtn">
                                {value.Likes.length}
                            </button> */}



                        </div>


                    </div>
                )
            })}

        </div>
    )
}

export default Home
