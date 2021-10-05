import { CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { lazy, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import UserOrderedProductsItem from './UserOrderedProductsItem';
const Footer = lazy(() => import('../../CommonComponent/Footer/Footer'));
const UserOrderedProducts = () => {
  const [userOrderProductsData, setUserOrderProductsData] = useState([])
  const [userDataInfo] = useContext(UserContext)
  const [userAddress, setUserAddress] = useState([])
  useEffect(() => {
    axios.get('https://guarded-badlands-63189.herokuapp.com/products/userOrderProducts', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setUserOrderProductsData(res.data)
        // console.log(res.data)
      })
    axios.get('https://guarded-badlands-63189.herokuapp.com/address', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setUserAddress(res.data)
      })
  }, [userDataInfo.email])
  // console.log(userAddress)
  return (
    <div>
      <Container size="md">
      {userOrderProductsData.length === 0 && 
            <Grid container >
            <Grid item sm={6}>
                <Skeleton variant="rectangular" width={300} height={400} />
              </Grid>
              <Grid item sm={6}>
                <CardContent>
                  <Typography variant="h4">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body1">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Typography>
                  <Typography variant="h4">
                  <Skeleton height={40} width="20%">
                      <Typography>.</Typography>
                    </Skeleton>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <Skeleton width="10%">
                      <Typography>.</Typography>
                    </Skeleton>
                  </Typography>
                  <CardActions>
                  <Skeleton height={40} width="20%"/> <Skeleton height={40} width="20%"/> 
                  </CardActions>
                </CardContent>
              </Grid>
            </Grid>
          }
        <Grid container direction="column" alignItems="center" spacing={4}>
          {/* {
            userOrderProductsData.length === 0 && <Typography className="mt-5">Please Order a Product and Come again</Typography>
          } */}
          {
            userOrderProductsData.map(data => <UserOrderedProductsItem data={data} userAddress={userAddress} key={data._id} />)
          }
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default UserOrderedProducts;