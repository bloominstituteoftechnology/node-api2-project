import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {Form,Input,Label,Button} from 'reactstrap';
import updatePost from './api/updatePost';

function UpdatePost({setPosts}){
const params=useParams();
const history=useHistory();
 
 const [updatePosts,setUpdatePost]=useState({
     title:params.title,
     contents:params.contents
 })

 const handleChange=(e)=>{
     e.persist();
     setUpdatePost({
         ...updatePosts,
         [e.target.name]:e.target.value
     })
 }

 const handleSubmit=(e)=>{
     e.preventDefault();
     updatePost(updatePosts,params.id,setPosts)
     history.push('/')
 }

    return(
        <div className="p-5">
             <h3>Update Post!</h3>
             <Form onSubmit={handleSubmit} className="addForm">
                 <Label htmlFor="title">Title</Label>
                 <Input id="title"
                 name="title"
                 value= {updatePosts.title}
                 onChange= {handleChange}
                 placeholder="Post Title ..."/>

                <Label htmlFor="contents">Contents</Label>
                <Input id="contents"
                 name="contents"
                 value= {updatePosts.contents}
                 onChange= {handleChange}
                 placeholder="Post Content..."/>
                 <Button className="m-3">Update Post!</Button>
             </Form>
        </div>
    )
}
export default UpdatePost;