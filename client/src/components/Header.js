import { NavLink } from "react-router-dom"

const Header = () => {
    return(
        <header>
            <nav>
                <NavLink exact to="/" className="navlink">Home</NavLink>
                <NavLink to="/addPost" className="post-link">Post</NavLink>
            </nav>

            <h1 className="title">The One Twitter To Rule Them All</h1>
        </header>
    )
}

export default Header