import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [userDataInfo] = useContext(UserContext);
    const location = useLocation()
    // console.log(location)
    return (
        <Route
      {...rest}
      render={({ location }) =>
    //   (loggedInUser.email || isSignedIn()) ? (
        userDataInfo.isSignedIn ? 
          children
         : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;