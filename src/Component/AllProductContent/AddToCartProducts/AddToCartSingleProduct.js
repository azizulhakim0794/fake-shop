import { CardContent, Grid, Typography, CardActions, Button, Card } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { selectBuyNowProduct, removeBuyNowProduct } from '../../../redux/actions/productActions';
const AddToCartSingleProduct = ({ data }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleProductCancel = (data) => {
        document.getElementById(`order${data}`).style.display = 'none'
        console.log(data)
        axios.delete('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
            headers: {
                id: data
            }
        })
            .then(res => {
                console.log(res.data)
            })
    }
    useEffect(() => {
        dispatch(removeBuyNowProduct())
    }, [data])
    const handleAddToCartFromBuy = (productId) => {
        dispatch(selectBuyNowProduct(data))
        history.push('/buyNow/' + productId)
    }
    return (
        <Card className="mt-5 p-2" id={`order${data._id}`}>
            <Grid container >
                <Grid item sm={6}>
                    <LazyLoadImage
                        alt={data.id}
                        height={400}
                        src={data.image} // use normal <img> attributes as props
                        title={data.title}
                        effect="blur" />
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
                            <Button variant="contained" color="primary" onClick={() => handleAddToCartFromBuy(data.id)}> Buy </Button>
                            <Button variant="contained" onClick={() => handleProductCancel(data._id)}> Cancel </Button>
                        </CardActions>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>

    );
};

export default AddToCartSingleProduct;