import React, { Component } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';


const  LogoutButton =()=> {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && ( <Button onClick={()=> logout()}>logout</Button>)
    );
}

export default LogoutButton;