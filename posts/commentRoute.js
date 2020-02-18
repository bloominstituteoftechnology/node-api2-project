const express = require('express');

const router = express.Router();

const post = require('../data/db')




router.post('/', async (req,res)=>{
  const posts = req.body
   if(!posts.title || !posts.contents){
      return res.status(400).json({errorMessage: 'Please provide tile and contents for the post.'})
   }
   post.insert(title,contents)
   .then((res)=>{
      console.log(res)
      post.findById(res);
   })
   .then(data=>{
      console.log(data)
      res.status(202).json({message: `The data over`})
   })
   .catch(error=>{
      res.status(500).json({errorMessage: 'not working'})
   })

   });

   // router.post('/:id/comments',async (req,res)=>{
   //    const posts = req.body;
   //    const id = req.params.postId;
   //       post.findCommentById(id)
   //       if(!id){
   //          res.status(404).json({errorMessage:'id not found'})
   //       }
   //       if(!posts.text){
   //          res.status(400).json({errorMessage: 'Please provide some text for the comment'})
   //       }
   //       else {
   //          post.insertComment(posts)
   //          .then(comment=>{
   //             res.status(201).json(comment)
   //          })
   //          .catch(error=>{
   //             res.status(500).json({errorMessage: 'error'})
   //          })
   //       }
   // })
   router.post('/:id/comments', async (req,res)=>{
      
      const newComment = req.body;
      post.insertComment(newComment);
      const postId = req.params.id;
      post.findById(postId)
      .then(newComments=>{
         if(newComments.length===0){
            res.status(404).json({
               errorMessage: "the post with the spicific ID does not exist"
            })
         }else if(!newComment.text){
            res.status(402).json({errorMessage:'Please provide text'})
         }else{
            res.status(201).json({newComment})
         }
      })
      .catch(error=>{
         console.log(error)
         res.status(500).json({errorMessage: 'There was an error'})
      })
       
      
      
      
   })

   
   

      
router.get('/',async (req,res)=>{
 
   post.find()
   .then(post=>{
      res.status(200).json(post)
   })
   .catch(error=>{
      res.status(500).json({ errorMessage: 'The posts information could not be retrieved.'})
   })
})

router.get('/:id', async (req,res)=>{
   const id = req.params.id;
   post.findById(id)
   .then(posts=>{
      if(id){
         res.status(200).json(posts)
      } 
      else{
         res.status(404).json({errorMessage:'The post with the specified ID does not exist.'})
   }
   })
   .catch((error)=>{res.status(500).json({errorMessage: 'The post information could not be retrieved.'})
   })   

})

router.get('/:id/comments',async (req,res)=>{
   const postId = req.params.id;
   console.log(postId)
   post.findPostComments(postId)
       
   .then(comment=>{
      if(comment){
         res.status(200).json(comment)
      }else{
         res.status(404).json({errorMessage:'Id not found'})
      }
   })
   .catch(error=>{
      res.status(500).json({errorMessage:'opps'})

   })
})

router.put('/:id',(req,res)=>{
   const postId = req.params.id;
   const posts = req.body;
   console.log(postId)
   post.findPostComments(postId)
   
   post.update(postId,posts)
   .then(updates=>{
      if(!id){
         res.status(404).json({errorMessage:'Post not found'})
      }else if(!posts.title || !posts.contents) {
         res.status(400).json({
            errorMessage: "please give title and contents"
         })
      }else{
         res.status(200).json({updates})

      }
   })
   .catch(error=>{
      console.log(error)
      res.status(500).json({errorMessage: 'Something went wrong'})
   })
})

router.delete('/:id' ,async (req,res)=>{
   const id = req.params.id;
  post.remove(id)
  .then(deleted=>{
     if(id){
        res.status(404).json({errorMessage: 'ID Not Found'})
     }else{
        res.status(200).json({deleted})
     }
  })
  .catch(error=>{
     res.status(500).json({errorMessage: 'Not removed'})
  })
})



   

   
   
   
  

module.exports = router;