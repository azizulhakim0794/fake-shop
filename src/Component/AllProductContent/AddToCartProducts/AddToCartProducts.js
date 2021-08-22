import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import AddToCartSingleProduct from './AddToCartSingleProduct';
import { UserContext } from '../../../App';

const AddToCartProducts = () => {
const [data, setData] = useState([])
// const [cartProducts, setCartProducts] = useState({})
// const [cartId,setCartId] = useState(null)
// const history = useHistory()
const [userDataInfo] = useContext(UserContext)
  useEffect(()=>{
    axios.get('https://blooming-ocean-38409.herokuapp.com/cartProduct',{
      headers:{
        email:userDataInfo.email
      }
    })
    .then(res =>{
      setData(res.data)
    })
    // axios.get('https://blooming-ocean-38409.herokuapp.com/products/addToCartSingleProduct',{
    //     headers:{
    //       id:cartId
    //     }
    //   })
    //   .then(res=>{
    //     setCartProducts(res.data)

    //   })
  },[])
  // const handleAddToCartFromBuy = (productId , product_id)=>{
  //     history.push('/buyNow/'+productId)
  //     console.log(productId , product_id)
  //     setCartId(()=>product_id)
  //     // const updateUserDataInfo = {...userDataInfo}
  //     // updateUserDataInfo.AddToCartProductQuantity = cartProducts.quantity
  //     // updateUserDataInfo.AddToCartProductPrice = cartProducts.price
  //     // setUserDataInfo(updateUserDataInfo)
  //     console.log(userDataInfo)
  //     console.log(cartProducts)
  // }
  // console.log(cartProducts)
  // console.log(cartId)
    return (
        <Container size="md">
          <Grid container direction="column" alignItems="center" spacing={4}>
            {
              data.length==0 && <Typography className="mt-5">Please Add Order On your Cart and Come again</Typography>
            }
          {
            data.map(data=><AddToCartSingleProduct data={data} key={data._id}/>)
          }
          </Grid> 
        </Container>
    );
};

export default AddToCartProducts;