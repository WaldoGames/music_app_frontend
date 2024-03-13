import { Link } from "react-router-dom"

export default function Navbar(){

    return <nav className="navbar">
    <Link to="/" className="navbar-title"> Logo </Link>

        <ul>
            <li>
                <Link to="/artists">artists</Link>
            </li>  
            <li>
                <Link to="/songs">songs</Link>
            </li>
        </ul>
    
    </nav>
}