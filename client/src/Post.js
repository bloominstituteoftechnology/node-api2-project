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
     
        }else{
            setDisplayOrNot({
                close: false,
                name:'View Comments!'})
        }
    }
  
    const handleDelete=()=>{
        deletePost(item.id,setPosts)
    }
    const handleUpdate=()=>{
        history.push(`/updatepost/${item.id}/${item.title}/${item.contents}`)   
    }
    const handleAddComment=()=>{
        //postId is passed in params.id
        history.push(`/addcomment/${item.id}/${item.title}`)
        console.log('to add comment',item.id);
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
             onClick={handleAddComment}>Add Comment 
             </Button>

             <Button color="primary" className='m-2'
             onClick={handleUpdate}>Update Post 
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
                 {comments.length === 0? <p>"No comments yet"</p> :
                    comments.map(item=> <li key={item.id}>{item.text}</li>)
                 }
             </div>
            } 
         </Card>
        </div>
    )
}
export default Post;