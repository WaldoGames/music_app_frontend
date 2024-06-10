import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import LoginButton from "./Auth0/LoginButton"
import LogoutButton from "./Auth0/LogoutButton"
import { useAuth0 } from '@auth0/auth0-react';
import ShowSelector from "./ShowSelector";
import { ShowContext } from './Context/ShowContext';


const Navbar=()=>{

    const {isAuthenticated} = useAuth0();
    const { fetchShows, loading, showCount, shows, SelectDiffrentShow } = useContext(ShowContext);

    return( <nav className="navbar">
    <Link to="/" className="navbar-title"> Logo </Link>
    

            {isAuthenticated &&
            <ul>
                <li>
                    <Link to="/artists">artists</Link>
                </li>  
                <li>
                    <Link data-cy="song" to="/songs">songs</Link>
                </li>
                <li>
                    <Link to="/shows">shows</Link>
                </li>
                <li>
                    <Link data-cy="playlist" to="/playlists">playlists</Link>
                </li>
                {(!loading && showCount>1) &&

                    <li>
                    <ShowSelector></ShowSelector> 
                    </li>
                    }
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