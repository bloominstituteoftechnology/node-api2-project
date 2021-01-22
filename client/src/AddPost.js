import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form,Input,Label,Button} from 'reactstrap';
 import addPost from './api/addPost';

function AddPost({setPosts,setWelcome}){
// const {postId}=useParams();

const history=useHistory();

 const [newPost,setNewPost]=useState({
     title:'',
     contents:''
 })

 const handleChange=(e)=>{
     e.persist();
     setNewPost({
         ...newPost,
         [e.target.name]:e.target.value
     })
 }

 const handleSubmit=(e)=>{
     e.preventDefault();
     addPost(newPost,setPosts,setWelcome)
     history.push('/')
 }

    return(
        <div className="p-5">
             <Form onSubmit={handleSubmit} className="addForm">
                 <Label htmlFor="title">Title</Label>
                 <Input id="title"
                 name="title"
                 value= {newPost.title}
                 onChange= {handleChange}
                 placeholder="Post Title ..."/>

                <Label htmlFor="contents">Contents</Label>
                <Input id="contents"
                 name="contents"
                 value= {newPost.contents}
                 onChange= {handleChange}
                 placeholder="Post Content..."/>
                 <Button className="m-3">Add Post!</Button>
             </Form>
        </div>
    )
}
export default AddPost;