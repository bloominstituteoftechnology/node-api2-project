import React,{useState}  from 'react';
import { useHistory } from "react-router-dom";
import {Card,CardSubtitle,CardTitle,Button} from 'reactstrap';
import fetchComments from './api/fetchComments';
import deletePost from './api/deletePost';
 
 
function Post({item,setPosts,remove,setRemove}){
    let history=useHistory();
 
    const [comments,setComments]=useState([]);
   
    const [displayOrNot,setDisplayOrNot]=useState({
        close:false,
        name:'View Comments!'})
    const viewComments=(e)=>{
        if (!displayOrNot.close){
        fetchComments(item.id,setComments);
        setDisplayOrNot({
            close: true,
            name:'Close Comments'})
        console.log('comments=',comments);
        }else{
            setDisplayOrNot({
                close: false,
                name:'View Comments!'})
        }
    }
    const addPost=()=>{
        //here item.id is the post Id
         history.push(`/addpost/${item.id}`)
    }
    const handleDelete=()=>{
        console.log('to delete',item.id)
        deletePost(item.id,setPosts)
    }

    return(
        <div>
         <Card className="post">
             <CardTitle><h3>{item.title}</h3></CardTitle>
             <CardSubtitle><i>{item.contents}</i></CardSubtitle>
             <h4>Updated :{item.updated_at} | 
               Created :{item.created_at}</h4>
            <p>
            <Button color="success" className='m-2'
             onClick={addPost}>Add Post 
             </Button>

             <Button color="primary" className='m-2'
             onClick={addPost}>Update Post 
             </Button>
             
             <Button color="warning" className='m-2'
             onClick={handleDelete}>Take Down Post 
             </Button>
             </p>
             <Button color="info"
             onClick={viewComments}>{displayOrNot.name} 
             </Button>

            {!displayOrNot.close ? null : 
             <div>
                 {comments.map(item=> item.text)}
             </div>
            } 
         </Card>
        </div>
    )
}
export default Post;