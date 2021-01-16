const router=require('express').Router();
const dbhelpers=require('../api/db-helpers');

// router.get('/',(req,res)=>{
//     res.send('hello from posts router')
// })

//post req
router.post('/', async (req,res)=>{
    const newPost= req.body;
    console.log(newPost)
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else{
        try {
            const postId= await dbhelpers.insert(req.body)
                res.status(201).json(postId)
            }
        catch (err) {
            res.status(500).json({ error: "There was an error while saving the post to the database"})
        }

    }
})

//post comments!!!
//to create comments object - we need below data, we only  have text  and post_id frm req. we need  post!
// "id": 1,
// "text": "Let your workings remain a mystery. Just show people the results.",
// "created_at": "2019-05-11 01:55:52",
// "updated_at": "2019-05-11 01:55:52",
// "post_id": 1,
// "post": "I wish the ring had never come to me. I wish none of this had happened."
router.post('/:id/comments',async (req,res)=>{
const postId=req.params.id;
const addComment={
   ...req.body,
    post_id: postId,
    // post:  ''
  }
if(!req.body.text){
    res.status(400).json({ errorMessage: "Please provide text for the comment"})
}else{
    try {
        //gets post from postID
        comment = await dbhelpers.findById(postId)
    } catch (err) {
        res.status(404).json({errorMessage: "post ID not found to insert comment"})
    }
   
      console.log('addcomment=',addComment);

    try {
       const postComment= await dbhelpers.insertComment(addComment) 
        res.status(201).json(postComment);
    } catch (error) {
        res.status(500).json({error: "There was an error while saving the comment to the database" })
    }

}

})

//get 
router.get('/',async (req,res)=>{
    try {
        const getPosts= await dbhelpers.find();
        res.status(200).json(getPosts)
    } catch (error) {
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
})

//get comments for the post id
router.get('/:id/comments', async (req,res)=>{
    const postId= req.params.id
    try {
        const getComments = await dbhelpers.findPostComments(postId)
        res.status(200).json(getComments)
    } catch (err) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

//delete
router.delete('/:id', async (req,res)=>{
    const deleteId= req.params.id;
    try {
        const deleted= await dbhelpers.remove(deleteId);
        if(deleted){
            res.status(200).json({message : "delete success!"})
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
      
    } catch (err) {
        res.status(500).json({error: "The post could not be removed"})
    }
})

router.put('/:id',async (req,res)=>{
    const updateId=req.params.id;
    const updatePost=req.body;
    console.log('updatePost=',updatePost);
    console.log('updateId=',updateId);
    if(!updatePost.title || !updatePost.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else{
    try {
        const udpated= await dbhelpers.update(updateId,updatePost)
        if(udpated){
            res.status(200).json(updated)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch (err) {
        res.status(500).json({error: "The post information could not be modified."})
    }}
})

module.exports=router;