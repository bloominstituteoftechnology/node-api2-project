import axios from 'axios';
import fetchPosts from './fetchPosts';

function addPost(newPost,setPosts,setWelcome){
axios.post(`http://localhost:5000/api/posts/`,newPost)
.then((res)=>{
    console.log('res from add',res)
    setWelcome(res.data.message);
    fetchPosts(setPosts);
})
.catch(err=>{
    console.log('err in addPost',err)
})
}
export default addPost;