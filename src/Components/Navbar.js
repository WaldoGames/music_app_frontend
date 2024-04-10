import { Link } from "react-router-dom"
import LoginButton from "./Auth0/LoginButton"
import LogoutButton from "./Auth0/LogoutButton"

export default function Navbar(selectedItem, onItemSelected){

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

        <li>
            
                <LoginButton/>
                <LogoutButton/>
            </li>  
    </nav>
}