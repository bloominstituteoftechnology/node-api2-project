import axios from 'axios';
import fetchPosts from './fetchPosts';

function updatePost(updatePost,postId,setPosts){
axios.put(`http://localhost:5000/api/posts/${postId}`,updatePost)
.then((res)=>{
    console.log('res from update',res)
    fetchPosts(setPosts);
})
.catch(err=>{
    console.log('err in updatePost',err)
})
}
export default updatePost;