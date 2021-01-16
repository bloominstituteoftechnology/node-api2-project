const router=require('express').Router();
const dbhelpers=require('../api/db-helpers');

router.get('/',(req,res)=>{
    res.send('hellw from comments router')
})

//get comments for the post id
// router.get('/:id/comments', async (req,res)=>{
//     const postId= req.params.id
//     console.log('post id in comments router',postId)
//     try {
//         const getComments = await dbhelpers.findPostComments(postId)
//         res.status(200).json(getComments)
//     } catch (err) {
//         res.status(404).json({ message: "The post with the specified ID does not exist." })
//     }
// })

module.exports=router;