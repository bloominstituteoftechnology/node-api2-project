import React,{useState,useEffect} from 'react';
import MainPost from './MainPost';
import {Route} from 'react-router-dom';
import AddPost from './AddPost';
import AddComment from './AddComment';
import UpdatePost from './UpdatePost';
import fetchPosts from './api/fetchPosts';
 

function Home(){
 
    const [posts,setPosts]=useState([]);
    const [remove,setRemove]=useState(false);
    const [welcome,setWelcome]=useState('');
    
    useEffect(()=>{
        fetchPosts(setPosts)
    },[])
    
    return(
        <div>
            <div className="banner">
                <h3>Spin your thoughts!</h3>
            </div>
           
            <Route exact path="/">
                <MainPost posts={posts} setPosts={setPosts} remove={remove}setRemove={setRemove} welcome={welcome}/>
            </Route>
            <Route exact path="/addpost">
                <AddPost posts={posts} setPosts={setPosts} setWelcome={setWelcome}/>
            </Route>
            <Route exact path="/addcomment/:id/:title">
                <AddComment posts={posts} setPosts={setPosts}/>
            </Route>
            <Route exact path="/updatepost/:id/:title/:contents">
                <UpdatePost posts={posts} setPosts={setPosts}/>
            </Route>
        </div>
    )
}
export default Home;