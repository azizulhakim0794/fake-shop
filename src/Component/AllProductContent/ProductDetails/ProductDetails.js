import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { UserContext } from '../../../App';
const ProductDetails = () => {
    const [value, setValue] = useState(1)
    const [userDataInfo, setUserDataInfo] = useContext(UserContext)
    const [singleData, setSingleData] = useState({})
    let { id } = useParams()
    const history = useHistory()
    // console.log(id)
    useEffect(() => {
            axios.post('https://blooming-ocean-38409.herokuapp.com/products/singleProduct',{
                id:id
            })
            .then(res => setSingleData(res.data))
            .catch(ex => console.error(ex))
    }, [id])
    // console.log(singleData)
    const PdDetails = makeStyles((theme) => ({
        details: {
            display: 'flex',
            flexDirection: 'row',
        }
    }))
    const classes = PdDetails()
    const handleCountPlus = () => {
        if (value < 5) {
            setValue(value + 1)
        }
    }
    const handleCountMinus = () => {
        if (value > 1) {
            setValue(value - 1)
        }
    }
    const handleAddToCart = () => {
        const {_id,price,description,title,image,category} = singleData 
       if(userDataInfo.isSignedIn){
        axios.post('https://blooming-ocean-38409.herokuapp.com/cartProduct', {
            id: _id,
            description : description,
            category:category,
            title:title,
            price:price*value,
            quantity:value,
            image:image,
            email:userDataInfo.email
          })
          .then(res => {
              if(res){
                history.push('/addToCart')
              }
          }) 
       }
        
       if (!userDataInfo.isSignedIn) {
            history.push('/login')
        }
    }
    const handleBuyNow = (data) => {
        const addBuyData = {...userDataInfo}
        addBuyData.buyNowProductQuantity = value
        addBuyData.buyNowProductPrice = singleData.price*value
        setUserDataInfo(addBuyData)
        // if (userDataInfo.isSignedIn) {

            history.push("/buyNow/"+data)
        // }
        // else if (!userDataInfo.isSignedIn) {
        //     history.push('/login')
        // }
    }
    const initialPrice = '00.0'
    return (
        <Container maxWidth="md" className="mt-5">
            <Card>
               {singleData._id ? <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <img xs={12} src={singleData.image} alt={singleData.id} title={singleData.title} style={{ width: '400px', height: "400px", padding: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CardContent >
                            <Typography variant="h4" gutterBottom>
                                {singleData.category}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {singleData.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><FavoriteBorderOutlinedIcon className="ms-5" />
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <AddIcon onClick={handleCountPlus} className="me-2 cursor" />{value}<RemoveOutlinedIcon onClick={handleCountMinus} className="ms-2 cursor" />
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {singleData.description}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                $ {!singleData.price ? initialPrice : singleData.price * value}
                            </Typography>
                            <CardActions className="text-center">
                                <Button variant="contained" onClick={()=>handleBuyNow(singleData._id)} >Buy Now</Button>
                                <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
                            </CardActions>
                        </CardContent>
                    </Grid>
                </Grid> : <Grid container justifyContent="center"className="spinnerHeight" alignItems="center"><CircularProgress className="spinnerColor"/></Grid>}
            </Card>
        </Container>
    );
};

export default ProductDetails;