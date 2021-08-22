// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../../../App';

// const PrivateRouteProductBuy = ({children, ...rest}) => {
//     const [userDataInfo] = useContext(UserContext);
    
//     return (
//         <Route
//       {...rest}
//       render={({ location }) =>
//     //   (loggedInUser.email || isSignedIn()) ? (
//         (userDataInfo.email) ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//     );
// };

// export default PrivateRouteProductBuy;