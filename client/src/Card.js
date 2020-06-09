import React, { useState, useEffect } from 'react';
import axios from 'axios'


 const Card = props => {
    const [post, setPost] = useState({});
 
    useEffect(() => {
     axios
     .get('http://localhost:5000/posts')
     .then(res => {
      console.log(res)   
      setPost(res.data)
    })
     .catch(err => console.log(err))
    },[])
  
    return(
        <div>
        {post.map(i => (
            <div key={i.id}>
            <p>{i.contents}</p>
            <p>{i.title}</p>   
          </div>
        ))}
      </div> 
    )
}

export default Card;