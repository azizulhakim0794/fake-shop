import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import UserOrderedProductsItem from './UserOrderedProductsItem';

const UserOrderedProducts = () => {
    const [userOrderProductsData,setUserOrderProductsData] = useState([])
    const [userDataInfo] = useContext(UserContext)
    const [userAddress,setUserAddress] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/products/userOrderProducts',{
            headers:{
                email:userDataInfo.email
              }
            })
           .then(res=>{
            setUserOrderProductsData(res.data)
            console.log(res.data)
        })
        axios.get('http://localhost:5000/address', {
          headers: {
            email: userDataInfo.email
          }
        })
          .then(res => {
            setUserAddress(res.data)
          })
    },[])
    console.log(userAddress)
    return (
        <Container size="md">
        <Grid container direction="column" alignItems="center" spacing={4}>
        {
              userOrderProductsData.length==0 && <Typography className="mt-5">Please Order a Product and Come again</Typography>
            }
        {
          userOrderProductsData.map(data=><UserOrderedProductsItem data={data} userAddress={userAddress} key={data._id}/>)
        }
        </Grid> 
      </Container>
    );
};

export default UserOrderedProducts;