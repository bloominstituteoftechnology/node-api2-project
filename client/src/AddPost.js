import React from 'react';
import {useHistory,useParams} from 'react-router-dom';

function AddPost(){
const {postId}=useParams()
console.log('in add post',postId)
 
    return(
        <div>
             <h3>Hi from add post!</h3>
        </div>
    )
}
export default AddPost;