import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import AddToCartSingleProduct from './AddToCartSingleProduct';
import { UserContext } from '../../../App';
import Footer from '../../CommonComponent/Footer/Footer';
const AddToCartProducts = () => {
const [data, setData] = useState([])
const [userDataInfo] = useContext(UserContext)
  useEffect(()=>{
    axios.get('https://guarded-badlands-63189.herokuapp.com/cartProduct',{
      headers:{
        email:userDataInfo.email
      }
    })
    .then(res =>{
      setData(res.data)
    })
  },[userDataInfo.email])
  // if(data.length===0){
  //   history.push('/')
  // }
    return (
        <div>
          <Container size="md">
          <Grid container direction="column" alignItems="center" spacing={4}>
            {
              data.length===0 && <Typography className="mt-5 notice">Please Add Order On your Cart and Come again</Typography>
            }
          {
            data.map(data=><AddToCartSingleProduct data={data} key={data._id}/>)
          }
          </Grid> 
        </Container>
        <Footer/>
        </div>
    );
};

export default AddToCartProducts;