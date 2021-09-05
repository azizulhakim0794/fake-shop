import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { UserContext } from '../../../App';
import { useDispatch } from 'react-redux';
import { selectedProduct, removeSelectedProduct, selectBuyNowProduct, removeBuyNowProduct } from '../../../redux/actions/productActions';
import { useSelector } from 'react-redux';
import Footer from '../../CommonComponent/Footer/Footer';
const ProductDetails = () => {
    const [value, setValue] = useState(1)
    const [userDataInfo] = useContext(UserContext)
    const [addOrderProduct, setAddOrderProduct] = useState({
        buyNowProductQuantity: 1,
        buyNowProductPrice: 0,
        buyNowProductStates: false,
        productData: {},


    })
    const dispatch = useDispatch()
    let { id } = useParams()

    const history = useHistory()
    const product = useSelector((state) => state.product)
    // console.log(product)
    const loadSingleProduct = async () => {
        const response = await axios.post('https://guarded-badlands-63189.herokuapp.com/products/singleProduct', {
            id: id
        }).catch(err => console.log(err))
        dispatch(selectedProduct(response.data))
    }
    useEffect(() => {
        if (id && id !== '') loadSingleProduct()
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [id])

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
    const handleAddToCart = async () => {
        const { _id, price, description, title, image, category } = product
        if (userDataInfo.isSignedIn) {
            await axios.post('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
                id: _id,
                description: description,
                category: category,
                title: title,
                price: price * value,
                quantity: value,
                image: image,
                email: userDataInfo.email
            })
                .then(res => {
                    if (res) {
                        history.push('/addToCart')
                    }
                })
        }

        if (!userDataInfo.isSignedIn) {
            history.push('/login')
        }
    }
    useEffect(()=>{
        dispatch(removeBuyNowProduct())
    },[])
    useEffect(() => {
        const addData = { ...addOrderProduct }
        addData.buyNowProductPrice = product.price * value
        addData.buyNowProductQuantity = value
        addData.buyNowProductStates = true
        addData.productData = product
        setAddOrderProduct(addData)
    }, [value,product])
    const handleBuyNow = (data) => {
        if(userDataInfo.isSignedIn){
        dispatch(selectBuyNowProduct(addOrderProduct))
        if (addOrderProduct.buyNowProductStates) history.push("/buyNow/" + data)
        }
        else {
            history.push('/login')
        }
    }
    const initialPrice = '00.0'
    return (
       <div>
            <Container maxWidth="md" className="mt-5">
            <Card>
                {product._id ? <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <img xs={12} src={product.image} alt={product.id} title={product.title} style={{ width: '400px', height: "400px", padding: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <CardContent >
                            <Typography variant="h4" gutterBottom>
                                {product.category}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {product.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><StarOutlinedIcon /><FavoriteBorderOutlinedIcon className="ms-5" />
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                <AddIcon onClick={handleCountPlus} className="me-2 cursor" />{value}<RemoveOutlinedIcon onClick={handleCountMinus} className="ms-2 cursor" />
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                {product.description}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                $ {!product.price ? initialPrice : product.price * value}
                            </Typography>
                            <CardActions className="text-center">
                                <Button variant="contained" onClick={() => handleBuyNow(product._id)} >Buy Now</Button>
                                <Button variant="outlined" onClick={handleAddToCart}>Add to Cart</Button>
                            </CardActions>
                        </CardContent>
                    </Grid>
                </Grid> : <Grid container justifyContent="center" className="spinnerHeight" alignItems="center"><CircularProgress className="spinnerColor" /></Grid>}
            </Card>
        </Container>
        <Footer/>
       </div>
    );
};

export default ProductDetails;