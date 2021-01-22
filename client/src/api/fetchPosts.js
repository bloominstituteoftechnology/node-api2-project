 
import axios from 'axios';

function fetchPosts(setPosts){
axios.get('http://localhost:5000/api/posts/')
.then((res)=>{
    console.log('res from fetch',res)
    // return res.data
    setPosts(res.data)
})
.catch(err=>{
    console.log('err in fetch',err)
})
}
export default fetchPosts;