import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiService from "./apiService";

const PostDetail = () => {
    const {postId}=useParams();
    const [post,setPost]  = useState(null);
    const [err,setErr] = useState(null);

    useEffect(()=>{
        apiService.getPostById(postId,setPost,setErr)
    },[postId]);

    if(!post){
        return <p>게시물 불러오는 중입니다.</p>
    }

    return (
        <div className="postDetail-container">
            <h2>{post.postTitle}</h2>
            <p>{post.postContent}</p>
        </div>
    )

};

export default PostDetail;