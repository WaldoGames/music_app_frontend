import React, { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Create a context
export const ShowContext = createContext();

const ShowProvider = ({ children }) => {
    const [shows, setShows] = useState([]);
    const [showCount, SetShowCount] = useState([]);
    const [selectedShow, setSelectedShow] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const Api = process.env.REACT_APP_API_PATH

    useEffect(() => {
      if(isAuthenticated){
        fetchShows();
      }
    }, [isAuthenticated, isLoading])

    const fetchShows = async () => {
      console.log(Api)
        try {
          setLoading(true);
          console.log("aaaaaa")
          const response = await fetch(Api+'/Show?AuthSub='+ user.sub)
          const data = await response.json();
          setShows(data)
          if (data.length > 0) {
            setSelectedShow(data[0]); // Set the first item as active'
            SetShowCount(data.length);
          }
          
        } catch (error) {
            console.log(error)
          setError(error);
        } finally {
          setLoading(false);
        }
        
      };

  const updateActiveItem = (itemId) => {
    const selectedShow = shows.find(show => show.id === itemId);
    setSelectedShow(selectedShow);
  };

  const SelectDiffrentShow= (index) =>{
    setSelectedShow(shows[index]);
    //TODO handel our of bound error
  };

  return (
    <ShowContext.Provider value={{ shows, selectedShow, loading, error,showCount, fetchShows, setShows, SelectDiffrentShow}}>
      {children}
    </ShowContext.Provider>
  );
};

export default ShowProvider;