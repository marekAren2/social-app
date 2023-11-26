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
        .then((res)=>{
        //    console.log(res);
           setPosts(res.data)
        })
        .catch((error) => {
            console.warn(error);
        });
        
    };

    const getOldestPosts = () => {
        // console.log('getOldestPosts');
        let dateOfLast= posts[posts.length-1].created_at
        console.log(posts.length);
        console.log("🚀 ~ file: Home.js:27 ~ getOldestPosts ~ dateOfLast:", dateOfLast)

        //tym razem metoda post
        axios
        // .post("http://akademia108.pl/api/social-app/post/older-then",{"date": "2020-06-11T00:18:44.000000Z"})
        .post("http://akademia108.pl/api/social-app/post/older-then",{"date": {dateOfLast}})
        .then((res)=>{
        //    console.log(res);
           //do zmiennej posts dolaczamy nowe res.data
           setPosts(posts.concat(res.data) );
        })
        .catch((error) => {
            console.warn(error);
        });
        console.log("🚀 ~ file: Home.js:36 ~ getOldestPosts ~ axios:", axios)

        
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
            <button className="btn btnLoadMore" onClick={()=>getOldestPosts()}>  get old more...</button>
            <button className="btn" onClick={()=>getLatestPosts()}>  get latest more...</button>

        </div>
        ) 
        
}

export default Home;