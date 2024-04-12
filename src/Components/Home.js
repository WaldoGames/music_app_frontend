import React, { Component, useEffect  } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

class Home extends Component {
 
    render() {



        return (
            <div>
                <HomePage></HomePage>
            </div>
        );
    }
}

const HomePage = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        //console.log(user);
        const createUserIfNotExists = async () => {
          if (isAuthenticated && user) {
            try {
              const response = await fetch('https://localhost:32776/User/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subId: user.sub, email: user.email}),
              });
              
            } catch (error) {
              console.error(error);
            }
          }
        };
    
        createUserIfNotExists();
      }, [isAuthenticated, user]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if(!isAuthenticated){
        return(
            <div>
                <p>home page</p>
            </div>
        );
    }else {
    return (
        <div>
          <h2>User Profile</h2>
          <p>Email:</p>
          {/* Display other user information as needed */}
        </div>
      );
    }
}

export default Home;