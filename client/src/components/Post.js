import { Link } from "react-router-dom"

const Post = ({ post }) => {
    return(
        <Link to={`/editPost/${post.id}`}>
            <div className="post-container">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-contents">{post.contents}</p>
            </div>
        </Link>
    )
}

export default Post