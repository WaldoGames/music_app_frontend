import React, { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NewShowForm from './NewShow';
import { ShowContext } from './Context/ShowContext';

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { fetchShows, loading, showCount, shows } = useContext(ShowContext);
  const [componentToShow, setComponentToShow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user && !loading) {
        fetchShows();
        try {
          const response = await fetch('https://localhost:32768/User/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subId: user.sub, email: user.email }),
          });
          // Handle response if needed
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, user, loading, fetchShows]);

  useEffect(() => {
    if (!isAuthenticated) {
      setComponentToShow(<div><p>Loading2...</p></div>);
    } else {

        if (shows.length == 0) {
          setComponentToShow(<NewShowForm Reload={reloadParent} />);
        } else {
          setComponentToShow(
            <div>
              <h2 className=' m-3'>Welcome user</h2>
            </div>
          );
        }
    }
  }, [isAuthenticated, loading, showCount]);

  const reloadParent = () => {
    // Define reloadParent function here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return componentToShow;
};

export default HomePage;
