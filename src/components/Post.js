import axios from "axios";
import "./Post.css"
import { useState } from "react";

const Post = ( props) => {
    // 13:41 robie // chwilowy
    // console.log("🚀 ~ file: Post.js:5 ~ props:", props)

    
    
    // console.log('props.post przed props',props.post);
    // console.log('postObject przed props',postObject.id);
    let postObject= props.post;

    const [likesCount, setLikesCount] = useState (postObject.likes.length)
    // 11:05 wiele modeli nałożonych na siebie chcemy zeby tylko jeden sie wyswietlał
    //o co chodzi?
    // 11:19 useState default set  false 11:38
    const [deleteModalVisible, setDeleteModalVisible ] = useState(false)

    // 5:35 funkcja deletePost(id post)
    const deletePost = (id) => {
     axios.post('http://akademia108.pl/api/social-app/post/delete',{post_id: id})
     .then((res)=>{
        //co tu? <7:57 teraz confirm delete?
        console.log('res',res);
        //v2.9 14:59 setPost do pojedynczego posta do Post props przekazemy w Home 
        // w res potwierdzenie usunieci przyjdzie
        // 15:56 take old posts jako parametr przekazanego setter /funkcji
        // 16:12 zwracam old post and filter, zwracam new table gdzie id is rozne od id delete
        //czyli wszystkie nie usuniete
                props.setPosts((posts)=>{
                    // return posts.filter((posts) => post.id !== res.data.post.id) 
                    // return posts.filter(post=>post.id !== res.data.post.id) 
                    //16:51 post_id post.id poprawione
                    return posts.filter(post=>post.id !== res.data.post_id) 
                })
     }) 
     .catch((error)=>{
        console.warn(error);
     })  
    }
    // console.log('post z postObject ' , postObject.id);
    // let props.post=props;
    // console.log("🚀 ~ file: props.post.js:4 ~ props.post ~ props.post:", props.post)
    // console.log(props.post.id);
    return (
     
        <div className="post" key={postObject.id}>
            <p>{postObject.id}</p>
            <div className="avatar">
                <img className="postImage" src={postObject.user.avatar_url} alt= {postObject.user.avatar_url}/>
            </div>    
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{postObject.user.username}</div>
                    {/* kiedy zostal usuniety obiekt adres czy byl moj blad chyba */}
                    {/* <div className="author2">{postObject.user.avatar_url}</div> */}
                    <div className="postDate">{postObject.created_at.substring(0,10)}</div>
                </div>
                <div className="postContent">{postObject.content}</div>
                <div className="likes">
                    {/* // v29 01:27 czemu button do likes */}
                    {/* //3:50 props.user?.username wtedy moze byc null */}
                    {/* // 12:27 do buttona onClick z funkcja czy z funkcja() (z errora wynika ze ma byc funkcja) ASK: */}
                    {props.user?.username === props.post.user.username && <button onClick={()=>{setDeleteModalVisible(true)}} className="btn">Delete</button> }
                    {/* // 2:12 button wyswietla dla wszystkich chcemy przy swoich */}
                    {/* uciekamy sie do ciekawego warunku renderowania przycisku      */}
                    {likesCount}</div> 
                </div>
            
            {/* to beda postObiekty */}
            {/* {key} */}
            {/* <h3>{postObject.user.username}</h3> */}
            {/* <h4 style={{color: 'red'}}> {props.post.user.username}</h4> */}
            {/* style={color: 'red';} error bo ;*/}
            {/* <p>{postObject.content}</p> */}
            {/* <p className="likeFooter">{postObject.likes.length}</p> */}
            {/* // 7:57 */}
            {deleteModalVisible && 
                <div className="deleteConfirmation"> 
                    <h3>Are you sure you want to delete post?</h3>
                    {/* // 8:56 stylowanie zrob */}
                    <button className="btn yes" 
                    // 13:30  wywołanie funkcji: deletePost z przekazaniem id postu
                    onClick={()=>{
                        // console.log('usun posta o id: >>', id);
                        console.log('usun posta o id: >>', props.post.id);
                        deletePost(props.post.id)}}
                    >
                    Yes</button>
                    <button className="btn no"
                    onClick={()=>{setDeleteModalVisible(false)}}
                    >No</button>
                </div> 
            }
        </div>
    );
}

export default Post;