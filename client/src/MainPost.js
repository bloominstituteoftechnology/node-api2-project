import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';
import Post from './Post';

function MainPost({posts,setPosts,remove,setRemove,welcome}){
    const history=useHistory();
    const addPost=()=>{
        //here item.id is the post Id
         history.push(`/addpost`)
    }
    
    return(
        <div>
            <Button color="success" className='m-2'
             onClick={addPost}>Add New Post! 
             </Button>
            {welcome.length !==0 ? <h3>{welcome}</h3> : null}
            {posts.length ===0 ? "Please wait...loading" :
            <div className="posts">
               {posts.map(item =>{
                   return <Post key={item.id} item={item} setPosts={setPosts}remove={remove} setRemove={setRemove} />
               })}
            </div>} 
        </div>
    )
}
export default MainPost;