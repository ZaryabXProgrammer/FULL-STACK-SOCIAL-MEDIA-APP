import { useNavigate, useParams } from "react-router"
import axios from 'axios'
import { useEffect, useState, useContext} from "react"
import './Home.css'
import './Profile.css'
import { AuthContext } from '../helpers/AuthContext'
import ChangePassword from "./ChangePassword"



function Profile() {
  const [info, setinfo] = useState({})
  const [listOfPosts, setlistOfPosts] = useState([])
  const { authState } = useContext(AuthContext)


  let { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {

    axios.get(`http://localhost:3003/auth/basicInfo/${id}`).then((response) => {
      setinfo(response.data)
    })


    axios.get(`http://localhost:3003/posts/byuserId/${id}`).then((response) => { 
      setlistOfPosts(response.data)
    })


  }, [id])


  return (


    <div className="profilePageContainer">


      <div className="basicInfo">

        <h1>Username: {info.username} </h1>
        {authState.username === info.username && <button className="password" onClick={<ChangePassword/>} >Change Password</button>
 }
        
        <h2>{info.createdAt && info.createdAt.length > 10 ? info.createdAt.slice(0, 10) : ''}</h2>

        <h1>ALL POSTS</h1>
          
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
                    <div className="userName"> @{value.username}</div>

                    

                    {/* <button className="likeBtn">
                                {value.Likes.length}
                            </button> */}



                  </div>


                </div>
              )
            })}

          </div>
       
       
        
      </div>


      <div className="listOfPosts"></div>



    </div>


  )
}

export default Profile
