import React,{useState}  from 'react';
import {Card,CardSubtitle,CardText,CardTitle,Button} from 'reactstrap';
import fetchComments from './api/fetchComments';

function Post({item}){
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
    return(
        <div>
         <Card className="post">
             <CardTitle><h3>{item.title}</h3></CardTitle>
             <CardSubtitle><i>{item.contents}</i></CardSubtitle>
             <h4>Updated :{item.updated_at} | 
               Created :{item.created_at}</h4>

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