import axios from 'axios';
import fetchPosts from './fetchPosts';

function deletePost(postId,setPosts){
axios.delete(`http://localhost:5000/api/posts/${postId}`)
.then((res)=>{
    console.log('res from delete',res)
    fetchPosts(setPosts);
    // setPosts(res.data)
})
.catch(err=>{
    console.log('err in delete',err)
})
}
export default deletePost;