import React, { useContext, useEffect, useState,lazy } from 'react';
import {CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import AddToCartSingleProduct from './AddToCartSingleProduct';
import { UserContext } from '../../../App';
import { Skeleton } from '@mui/material';
const Footer = lazy(() => import('../../CommonComponent/Footer/Footer'));
const AddToCartProducts = () => {
  const [data, setData] = useState([])
  const [userDataInfo] = useContext(UserContext)
  useEffect(() => {
    axios.get('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setData(res.data)
      })
  }, [userDataInfo.email])
  // console.log(data)
  return (
    <div>
      <Container size="md">
        <Grid container spacing={4}>
          {data.length === 0 && 
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
          {
            data.map(data => <AddToCartSingleProduct data={data} key={data._id} />)
          }
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default AddToCartProducts;