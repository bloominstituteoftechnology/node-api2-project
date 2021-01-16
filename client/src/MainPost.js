import React,{useState,useEffect} from 'react';
import fetchPosts from './api/fetchPosts';
import Post from './Post';


function MainPost(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetchPosts(setPosts)
    },[fetchPosts])

    return(
        <div>
            {posts.length ===0 ? "Please wait...loading" :
            <div className="posts">
               {posts.map(item =>{
                   return <Post key={item.id} item={item} />
               })}
            </div>} 
        </div>
    )
}
export default MainPost;