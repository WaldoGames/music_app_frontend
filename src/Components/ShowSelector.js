import React, { Component } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';


const  ShowSelector =(selectedItem, onItemSelected)=> {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [shows, setShows] = useState([]);

    


    return (
        isAuthenticated ? (
            
        ) : null
    );
}

export default ShowSelector;