import { Link } from "react-router-dom"
import LoginButton from "./Auth0/LoginButton"
import LogoutButton from "./Auth0/LogoutButton"
import { useAuth0 } from '@auth0/auth0-react';

const Navbar=()=>{

    const {isAuthenticated} = useAuth0();

    return( <nav className="navbar">
    <Link to="/" className="navbar-title"> Logo </Link>
    

            {isAuthenticated &&
            <ul>
                <li>
                    <Link to="/artists">artists</Link>
                </li>  
                <li>
                    <Link to="/songs">songs</Link>
                </li>
            </ul>
            }
            


        <li>
            
                <LoginButton/>
                <LogoutButton/>
            </li>  
    </nav>
    )
}
export default Navbar;