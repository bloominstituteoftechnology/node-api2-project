// implement your posts router here
const Posts = require( "./posts-model" );
const express = require( "express" );
const router = express.Router();

// POST /api/posts == new post
router.post( "/", ( req, res ) => {
    ! req.body.title || ! req.body.contents
    ? res.status( 422 )
         .json( { message: "Please provide title and contents for the post" } )
    : Posts.insert( req.body )
           .then( () => res.json( req.body ) )
           .catch( () => res.status( 500 )
                            .json( { message: "There was an error while saving the post to the database" } ) );
} );

// GET /api/posts == all posts
router.get( "/", ( req, res ) => {
    Posts.find()
         .then( posts => res.status( 200 )
                            .json( posts ) )
         .catch( () => res.status( 500 )
                          .json( "Error retrieving all posts" ) );
} );

// GET /api/posts/:id == post by id
router.get( "/:id", ( req, res ) => {
    const { id } = req.params;
    Posts.findById( id )
         .then( post => ! post
                        ? res.status( 404 )
                             .json( "Post does not exist" )
                        : res.json( post ) )
         .catch( () => res.status( 500 )
                          .json( "Error while fetching post" ) );
} );

// GET /api/posts/:id/comments == comments of post by id
router.get( "/:id/comments", ( req, res ) => {
    const { id } = req.params;
    Posts.findCommentById( id )
         .then( post => ! post
                        ? res.status( 404 )
                             .json( "Post does not exist" )
                        : res.json( post ) )
         .catch( () => res.status( 500 )
                          .json( "Post does not exist" ) );
} );

// PUT /api/posts/:id == update post
router.put( "/:id", async ( req, res ) => {
    const { id } = req.params;
    const changes = req.body;
    
    try {
        if ( ! changes.title || ! changes.contents ) {
            res.status( 422 )
               .json( "Title and post body required" );
        } else {
            const updatedPost = await Posts.update( id, changes );
            ! updatedPost
            ? res.status( 404 )
                 .json( "Post does not exist" )
            : res.status( 200 )
                 .json( changes );
        }
    } catch ( err ) {
        res.status( 200 )
           .json( err.message );
    }
    Posts.update()
         .then( posts => res.status( 200 )
                            .json( posts ) )
         .catch( () => res.status( 500 )
                          .json( "Error retrieving all posts" ) );
} );

// DELETE /api/posts/:id == delete post
router.delete( "/:id", async ( req, res ) => {
    const { id } = req.params;
    const deletedPost = await Posts.remove( id );
    
    try {
        if ( ! deletedPost ) {
            res.status( 404 )
               .json( { message: "Post does not exist" } );
        } else {
            res.status( 201 )
               .json( `Successfully deleted the post titled "${req.body.title}"` );
        }
    } catch ( err ) {
        res.status( 500 )
           .json( { message: err.message } );
    }
} );

// CATCH ALL
router.use( "*", ( req, res ) => {
    res.status( 404 )
       .json( { message: "Go eat a taco" } );
} );

module.exports = router;