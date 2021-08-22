import { CardContent, Grid, Typography, CardActions, Button, Card } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';

const AddToCartSingleProduct = ({ data }) => {
    const [userDataInfo,setUserDataInfo] = useContext(UserContext)
    // const [cartProducts, setCartProducts] = useState({})
    // const [cartId, setCartId] = useState('')
    const history = useHistory()
    const handleProductCancel = (data) => {
        document.getElementById(`order${data}`).style.display = 'none'
        console.log(data)
        axios.delete('http://localhost:5000/cartProduct', {
            headers: {
                id: data
            }
        })
            .then(res => {
                console.log(res.data)
            })
    }
    const handleAddToCartFromBuy = (productId) => {
                const updateUserDataInfo = {...userDataInfo}
                updateUserDataInfo.AddToCartProductStates=true
                setUserDataInfo(updateUserDataInfo)
                console.log(userDataInfo)
                if(userDataInfo.AddToCartProductStates){
                    history.push('/buyNow/'+productId)
                }
    }
    return (
        <Card className="mt-5 p-2" id={`order${data._id}`}>
            <Grid container >
                <Grid item sm={6}>
                    <img src={data.image} alt={data.id} title={data.title} style={{ width: '80%', height: "400px", }} />
                </Grid>
                <Grid item sm={6}>
                    <CardContent>
                        <Typography variant="h4">
                            {data.title}<br />
                        </Typography>
                        <Typography variant="body1">
                            {data.description}<br />
                        </Typography>
                        <Typography variant="h4">
                            $ {data.price}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Qty: {data.quantity}
                        </Typography>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={()=>handleAddToCartFromBuy(data.id)}> Buy </Button>
                            <Button variant="contained" onClick={() => handleProductCancel(data._id)}> Cancel </Button>
                        </CardActions>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>

    );
};

export default AddToCartSingleProduct;