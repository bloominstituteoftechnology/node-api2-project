import axios from 'axios';
import fetchPosts from './fetchPosts';

function addPost(newPost,setPosts){
axios.post(`http://localhost:5000/api/posts/`,newPost)
.then((res)=>{
    console.log('res from add',res)
    fetchPosts(setPosts);
})
.catch(err=>{
    console.log('err in addPost',err)
})
}
export default addPost;