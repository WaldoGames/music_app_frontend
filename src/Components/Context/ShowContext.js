import React, { createContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Create a context
export const ShowContext = createContext();

const ShowProvider = ({ children }) => {
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();

    const fetchShows = async () => {
        setLoading(true);
        try {
            
          const response = await fetch('https://localhost:32768/Show?AuthSub='+ user.sub)
          const data = await response.json();
          setShows(data)
          if (data.length > 0) {
            setSelectedShow(data[0]); // Set the first item as active
          }
        } catch (error) {
            console.log(error)
          setError(error);
        } finally {
          setLoading(false);
        }
        
      };
    const showCount = async()=>{
        return shows.length;
    }

  const updateActiveItem = (itemId) => {
    const selectedShow = shows.find(show => show.id === itemId);
    setSelectedShow(selectedShow);
  };

  return (
    <ShowContext.Provider value={{ shows, selectedShow, loading, error, fetchShows, setShows,showCount }}>
      {children}
    </ShowContext.Provider>
  );
};

export default ShowProvider;