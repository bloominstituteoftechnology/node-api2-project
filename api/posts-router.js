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
//to create comments object - we need text and post_id property obj
// "id": 1,
// "text": "Let your workings remain a mystery. Just show people the results.",
// "created_at": "2019-05-11 01:55:52",
// "updated_at": "2019-05-11 01:55:52",
// "post_id": 1,
// "post": "I wish the ring had never come to me. I wish none of this had happened."
router.post('/:id/comments',async (req,res)=>{
const postId=req.params.id;
//post obj 
const addComment={
    text: req.body.text,
    post_id: postId,
  }
  //test for missing text property
if(!req.body.text){
    res.status(400).json({ errorMessage: "Please provide text for the comment"})
}else{
    //check if the post is found for the req postID
    try {
        //gets post from postID and error if the post not found
        postFound = await dbhelpers.findById(postId)
    } catch (err) {
        res.status(404).json({errorMessage: "post ID not found to insert comment"})
    }
    //post comment with obj that has text and post id
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
    console.log('post id in comments router',postId)
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

//update post with the id
router.put('/:id',async (req,res)=>{
    const updateId=req.params.id;
    const updatePost=req.body;
    console.log('updatePost=',updatePost);
    console.log('updateId=',updateId);
    if(!updatePost.title || !updatePost.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }else{
    try {
        const postFound = await dbhelpers.findById(updateId)
        if(!postFound){
            res.status(404).json({error: "The post information could not be modified."})
        }
    } catch (err) {
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    }
    try {
        const putPost= await dbhelpers.update(updateId,updatePost)
            res.status(200).json(putPost)
    } catch (err) {
        res.status(500).json({error: "The post information could not be modified."})
    }}
})

module.exports=router;