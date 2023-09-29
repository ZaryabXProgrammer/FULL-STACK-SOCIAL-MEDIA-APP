import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import VideoBackground from "./helpers/VideoBackground ";



function App() {

  const [authState, setauthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(() => {

    axios.get('http://localhost:3003/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then((response) => {

        if (response.data.error) {
          setauthState({ ...authState, status: false });
        } else {
          setauthState({
            username: response.data.username,
            id: response.data.id,
            status: true
          });
        }
      });
  }, []);

  
  const logout = () => {
    localStorage.removeItem('accessToken');
    setauthState({ username: "", id: 0, status: false });
    window.location.replace('/');
  }


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setauthState }} >
        <Router>
          <VideoBackground/>

          <div className="links">
            <div className="left-links">
              {!authState.status ? (
                <>
                  <Link to="/login" className="link">Login</Link>
                  <Link to="/registration" className="link">Register</Link>
                </>)


                :
                (<>
                  <Link to="/createPost" className="link">Create A Post</Link>
                  <Link to="/" className="link">HomePage</Link>
                </>)
              }
            </div>


            <div className="right-links">
              {authState.status ? (
                <div className="logoutBtn">
                  <h1 className="userh1">@{authState.username}</h1>
                  <button onClick={logout} className="link">Log Out</button>

                </div>
              ) : null}
            </div>
          </div>

          <Routes>

            <Route path="/" exact element={<Home />} />
            <Route path="/createPost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/profile/:id" exact element={<Profile/>} />
            <Route path="/changePassword" exact element={<ChangePassword/>} />


            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;