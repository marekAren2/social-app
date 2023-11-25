import "./Post.css"
import { useState } from "react";

const Post = (props) => {
    
    
    console.log('props.post przed props',props.post);
    // console.log('postObject przed props',postObject.id);
    let postObject= props.post;

    const [likesCount, setLikesCount] = useState (postObject.likes.length)

    console.log('post z postObject ' , postObject.id);
    // let props.post=props;
    // console.log("🚀 ~ file: props.post.js:4 ~ props.post ~ props.post:", props.post)
    // console.log(props.post.id);
    return (
     
        <div className="post" key={postObject.id}>
            <div className="avatar">
                <img src={postObject.user.avatar_url} alt= {postObject.user.avatar_url}/>
            </div>    
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{postObject.user.avatar_url}</div>
                    <div className="postData">{postObject.created_at.substring(0,10)}</div>
                    <div className="postContent">{postObject.content}</div>
                    <div className="likes">
                        {likesCount}
                    </div>
                </div>
            </div>
            

            {/* to beda postObjecty */}
            {/* {key} */}
            {/* <h3>{postObject.user.username}</h3> */}
            {/* <h3>{postObject.user}</h3> */}
            {/* <h3>{postObject.user.username}</h3> */}
            {/* <h4 style={{color: 'red'}}> {props.post.user.username}</h4> */}
            {/* style={color: 'red';} */}
            {/* <p>{postObject.content}</p> */}
            {/* <p className="likeFooter">{postObject.likes.length}</p> */}
        </div>
    );
}

export default Post;