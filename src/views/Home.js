import "./Home.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
    
    const [posts, setPosts] = useState([]);

    const getLatestPosts = () => {
        //tym razem metoda post
        axios
        .post("http://akademia108.pl/api/social-app/post/latest")
        .then((req)=>{
           console.log(req);
           setPosts(req.data)
        })
        .catch((error) => {
            console.warn(error);
        });
        
    };

    const getOldestPosts = () => {
        //tym razem metoda post
        axios
        .post("http://akademia108.pl/api/social-app/post/older-then")
        .then((req)=>{
           console.log(req);
           setPosts(req.data)
        })
        .catch((error) => {
            console.warn(error);
        });
        
    };

    useEffect(()=>{
        getLatestPosts();
            
    }, [])
    
    console.log('w useEfect',posts);
    return (
        <div className="home">
            <div className="postList">
                {posts.map(post => {
                        return (
                           <Post post={post}/>
                            /*  <div className="post" key={post.id}>
                            <h3>{post.user.username}</h3>
                            <p>{post.content}</p>
                            <p className="likeFooter">{post.likes.length}</p>
                            </div> */
                        )    
                    })
                }
                

            </div>
            <button className="btn" onClick={()=>getOldestPosts}>  get more...</button>

        </div>
        ) 
        
}

export default Home;