import React,{useState,useEffect} from 'react';
import MainPost from './MainPost';
import {Route, useHistory} from 'react-router-dom';
import AddPost from './AddPost';
import fetchPosts from './api/fetchPosts';
 

function Home(){
    const history=useHistory();
    const [posts,setPosts]=useState([]);
    const [remove,setRemove]=useState(false);
    
    useEffect(()=>{
        fetchPosts(setPosts)
    },[])
    
    return(
        <div>
            <div className="banner">
                <h3>Spin your thoughts!</h3>
            </div>
           
            <Route exact path="/home">
                <MainPost posts={posts} setPosts={setPosts} remove={remove}setRemove={setRemove}/>
            </Route>
            <Route exact path="/addpost/:id">
                <AddPost posts={posts} setPosts={setPosts}/>
            </Route>
        </div>
    )
}
export default Home;