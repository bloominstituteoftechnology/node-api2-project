import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {Form,Input,Label,Button} from 'reactstrap';
 import addComment from './api/addComment';

function AddComment({setPosts}){
const params=useParams();
const history=useHistory();
 
 const [newComment,setComment]=useState({
     text:''
 })

 const handleChange=(e)=>{
     e.persist();
     setComment({
         ...newComment,
         [e.target.name]:e.target.value
     })
 }

 const handleSubmit=(e)=>{
     e.preventDefault();
     addComment(newComment,params.id,setPosts)
     history.push('/')
 }

    return(
        <div className="p-5">
            <div><b>Add Comment for the post:</b>
                <p><i>{params.title}</i></p>
            </div>
             <Form onSubmit={handleSubmit} className="addForm">
                 <Label htmlFor="text">Title</Label>
                 <Input id="text"
                 name="text"
                 value= {newComment.text}
                 onChange= {handleChange}
                 placeholder="Comment Text ..."/>

                 <Button className="m-3">Add Comment!</Button>
             </Form>
        </div>
    )
}
export default AddComment;