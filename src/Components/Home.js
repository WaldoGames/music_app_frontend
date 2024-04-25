import React, { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NewShowForm from './NewShow';
import LoadingOrNotloggedin from './LoadingOrNotloggedin';
import { ShowContext } from './Context/ShowContext';

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { fetchShows, loading, showCount, shows } = useContext(ShowContext);
  const [componentToShow, setComponentToShow] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // New state variable

  useEffect(() => {
    console.log("g");
    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    if (isAuthenticated && user) {
      fetchShows();
      console.log();
      try {
        const response = await fetch('https://localhost:32768/User/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subId: user.sub, email: user.email }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const reloadParent = () => {
    fetchData();
  };


  return (!isAuthenticated||isLoading||loading) ?  (<LoadingOrNotloggedin/>) : (
    shows.length === 0 ? (<NewShowForm Reload={reloadParent} />):(
      <div>
        <h2 className=' m-3'>Welcome user</h2>
      </div>
    )
  );
};

export default HomePage;
