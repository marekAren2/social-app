import "./Post.css"
import { useState } from "react";

const Post = (props) => {
    console.log("🚀 ~ file: Post.js:5 ~ props:", props)

    
    
    // console.log('props.post przed props',props.post);
    // console.log('postObject przed props',postObject.id);
    let postObject= props.post;

    const [likesCount, setLikesCount] = useState (postObject.likes.length)

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
                    {props.user.username === props.post.user.username && <button className="btn">Delete</button> }
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
        </div>
    );
}

export default Post;