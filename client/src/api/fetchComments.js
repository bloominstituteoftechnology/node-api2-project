 
import axios from 'axios';

function fetchComments(postId,setComments){
axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
.then((res)=>{
    console.log('res from comments',res)
    // return res.data
    setComments(res.data)
})
.catch(err=>{
    console.log('err in fetch',err)
})
}
export default fetchComments;