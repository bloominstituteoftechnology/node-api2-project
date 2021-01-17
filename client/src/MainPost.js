import React,{useState,useEffect} from 'react';
import fetchPosts from './api/fetchPosts';
import Post from './Post';

function MainPost({posts,setPosts,remove,setRemove}){

    
    return(
        <div>
            {posts.length ===0 ? "Please wait...loading" :
            <div className="posts">
               {posts.map(item =>{
                   return <Post key={item.id} item={item} setPosts={setPosts}remove={remove} setRemove={setRemove} />
               })}
            </div>} 
        </div>
    )
}
export default MainPost;