import "./Home.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post"; 
// v28 9:39 po zmianie nazwy blad poprawiona docelowa nazwa
import { AddPost } from "../components/AddPost";
import FollowRecommendations from "../components/FollowRecommendations";
// import { FollowRecommendations } from "../components/FollowRecommendations";

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
    // 16:54 opis działania w Home w l:21 myL:49
    //17:00 tej funkcji getPrevPosts nie odpalamy w Home tylko przekazujemy przez props do formularz AddPost
    // 15:16 aby pobrac z dodanym
    const getPrevPosts = () => {
        // console.log('getOldestPosts');
        let dateOfLast= posts[posts.length-1].created_at
        let dateOfFirst= posts[0].created_at
        console.log("🚀 ~ file: Home.js:54 ~ getPrevPosts ~ dateOfFirst:", dateOfFirst)
        console.log(posts.length);
        console.log("🚀 ~ file: Home.js:27 ~ getOldestPosts ~ dateOfLast:", dateOfLast)

        //tym razem metoda post
        axios
        // .post("http://akademia108.pl/api/social-app/post/older-then",{"date": "2020-06-11T00:18:44.000000Z"})
        // 16:03
        // 17:52 literowka nie never tylko newer od new nowszy
        // ODP: mozna sprawdzic wstepnie linka axios w przegladarce np aby uniknac literowki czyli 404
        .post("http://akademia108.pl/api/social-app/post/newer-then",{"date": {dateOfFirst}})
        // .post("http://akademia108.pl/api/social-app/post/older-then",{"date": {dateOfLast}})
        .then((res)=>{
        //    console.log(res);
           //do zmiennej posts append nowe res.data
           // 16:27 na odwrot to co przyjdzie do tego dołaczamy posts
           setPosts(res.data.concat(posts) );
        //    setPosts(posts.concat(res.data) );
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
        // wpis do tablicy zaleznosci useEffect powoduje wywołanie
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
            {/* {props.user && <AddPost />} */}

            {/* //17:01 tej funkcji getPrevPosts nie odpalamy w Home tylko przekazujemy przez props do formularz AddPost */}
            {/* // 3.12 9:37 moja modyfikacja przekazanie propsem usera zalogowanego do AddPost zeby wyswietlic nazwe w placeholder */}
            {props.user && <AddPost getPrevPosts={getPrevPosts} user={props.user}/>}
            {/* // 03:12 v2.11 wyswietlany warunkowo bo dla zalogowanego user*/}
            {/* // 3:48 propsy zalogowany user ,f.ostatnie i posts*/}
            {props.user && <FollowRecommendations user={props.user}
             getLatestPosts={getLatestPosts} posts={posts}/>}
            <div className="postList">
            {/* // 0:58 nie zakrecaj sie, w klamrze juz normalny JS, klamry w srodku zle */}
            {/* {console.log('przekazałem', {props.user})} */}
            {console.log('przekazałem', props.user)}
                {posts.map(post => {
                        return (
                           // v29 0:55 przekazanie user w map do Post
                           // 0:55 popraw key bo tu jes , kiedy byl dopisany?
                            // 0:58 jednak props.user nie zawsze ta sama nazwa
                            // v2.9 14:59 setPost do pojedynczego posta do Post props przekazemy w Home 
                           // v2.11 22:05 getLatestPosts={getLatestPosts}/> dodajemy dla unfollow()
                           <Post post={post} key={post.id} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts}/>
                           
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
            {/* <button className="btn" onClick={()=>getLatestPosts()}>  get latest more...</button> */}

        </div>
    ) 
        
}

export default Home;