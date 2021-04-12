import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
    return(
        <Link to={`/editPost/${post.id}`}>
            <div>
                <h1>{post.title}</h1>
                <p>{post.contents}</p>
            </div>
        </Link>
    )
}

export default PostCard