import "./Home.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { AddPost } from "../components/AdPost";

// v27 06:21 insert props
const Home = (props) => {
    
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
           //do zmiennej posts append nowe res.data
           setPosts(posts.concat(res.data) );
        })
        .catch((error) => {
            console.warn(error);
        });
        console.log("🚀 ~ file: Home.js:36 ~ getOldestPosts ~ axios:", axios)

        
    };

    useEffect(()=>{
        getLatestPosts();
         // v27 06:32 w tablicy zaleznosci przekazanie zmiany props
         // jak sie cos tu zmieni: przekaze zmiane props   
         //after:  logout have null; login have obiekt; logout - null
         // to wywoła sie getLatestPosts()
         // 07:04refresh widok ale jak? ASK:
         // wpis do tablicy zaleznosci useEffect powoduje wywolanie
        //   go po kazdej zmianie props.uses precisely (exactly) calls function :getLatestPosts()
        // login daje obiekt w user przekazany przez pops: props.user 
        // ta zmiana wywołuje useEffect and in :funkcje getLatestPosts()
    }, [props.user])
    
    console.log('w useEffect',posts);
    return (
        <div className="home">
            {/* // v28 03:31 przed lista postów dodamy component AddPost */}
            {/* // display form only for login user */}
            {/* // 04:00 renderowanie warunkowe */}
            {/* // przemysl wykorzystanie tego mechanizmu 3:42 */}
            {/* // v28 04:46  stylowanie zrob bo skok */}
            {props.user && <AddPost/>}
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