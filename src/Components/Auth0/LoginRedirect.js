import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate, Outlet, Navigate } from 'react-router-dom';

const LoginRedirectProvider = ({ children }) => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const Api = process.env.REACT_APP_API_PATH
    const navigate = useNavigate();

    if(isAuthenticated){
        return (
            <Outlet/>
        );
        }else{
            return <Navigate to={'/'} />;
        }
};

export default LoginRedirectProvider;