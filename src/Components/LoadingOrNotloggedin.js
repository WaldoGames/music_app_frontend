import React, { Component } from 'react'

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const  LoadingOrNotloggedin =()=> {
    const {isAuthenticated} = useAuth0();

    return (!isAuthenticated) ? <h1 className='m-3'>please login</h1>: <h1 className='m-3'>loading...</h1>

}
export default LoadingOrNotloggedin
