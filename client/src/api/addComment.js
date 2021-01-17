import axios from 'axios';
import fetchPosts from './fetchPosts';

function addComment(newComment,postId,setPosts){
    console.log('newcomment in addcomment=',newComment)
axios.post(`http://localhost:5000/api/posts/${postId}/comments`,newComment)
.then((res)=>{
    console.log('res from addcomment',res)
    fetchPosts(setPosts);
})
.catch(err=>{
    console.log('err in addComment',err)
})
}
export default addComment;