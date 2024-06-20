import React, { useContext, Image } from 'react';
import { Link } from "react-router-dom"
import LoginButton from "./Auth0/LoginButton"
import LogoutButton from "./Auth0/LogoutButton"
import { useAuth0 } from '@auth0/auth0-react';
import ShowSelector from "./ShowSelector";
import { ShowContext } from './Context/ShowContext';


const Navbar=()=>{

    const {isAuthenticated} = useAuth0();
    const { fetchShows, loading, showCount, shows, SelectDiffrentShow, selectedShow } = useContext(ShowContext);
    console.log("SHO3 "+selectedShow);
    return( <nav className="navbar">

    <Link to="/" className="navbar-title"> <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        style={styles.logo}
    /> </Link>


            {(isAuthenticated && selectedShow!='') &&
            <ul>
                <li>
                    <Link to="/artists">artists</Link>
                </li>  
                <li>
                    <Link data-cy="song" to="/songs">songs</Link>
                </li>
                <li>
                    <Link data-cy="show" to="/shows">shows</Link>
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

const styles = {
    logo: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
  };
  
export default Navbar;