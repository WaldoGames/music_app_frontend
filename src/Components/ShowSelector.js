import React, { Component,useEffect, useState,  useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
import Select from 'react-select';


const  ShowSelector =(selectedItem, onItemSelected)=> {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { fetchShows, loading, showCount, shows, SelectDiffrentShow } = useContext(ShowContext);
    const [options, SetOptions] = useState([]);
    
    useEffect(() => {

        if(loading && !isAuthenticated){
            return;
        }
        const newOptions=[]
        shows.map(function(show,i){
            newOptions.push({value: i, label: show.name,})
        })
        SetOptions(newOptions);
        console.log(newOptions);
      }, [isAuthenticated, shows]);

    const ChangeSelected = (event)=>{
        console.log(event.value);
        SelectDiffrentShow(event.value);
    }

    return (
        <Select className="text-dark"
                onChange={ChangeSelected}
                options={options}
                placeholder="Select Show"
              />
    );
}

export default ShowSelector;