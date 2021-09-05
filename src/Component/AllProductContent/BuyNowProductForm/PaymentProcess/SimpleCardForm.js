import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { UserContext } from '../../../../App';
import paymentImage from '../../../../image/Screenshot_5.png'
const SimpleCardForm = ({ allFunctionalData }) => {
    const [userDataInfo, setUserDataInfo] = useContext(UserContext)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMassage, setErrorMassage] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState();
    const buyNowProduct = useSelector((state) => state.buy_now_product)
    const [userAddressDataForProduct, setUserAddressDataForProduct] = useState({})
    useEffect(() => {

        axios.get('https://guarded-badlands-63189.herokuapp.com/address', {
            headers: {
                email: userDataInfo.email
            }
        })
            .then(res => {
                setUserAddressDataForProduct(res.data)
            })
    }, [userDataInfo.email])
    const deleteProductFromAddToCart = async()=>{
       await axios.delete('https://guarded-badlands-63189.herokuapp.com/cartProduct', {
            headers: {
                id:buyNowProduct._id
            }
        })
            // .then(res => {
            //     console.log(res.data)
            // })
            // .catch(error=>{
            //     console.log(error)
            // })
    }
    const handlePaymentOfOrder = async (data) => {
        // https://guarded-badlands-63189.herokuapp.com
        // const allData = { ...info, date: new Date(), paymentId: paymentId,plans:id,userEmail:userData.email}
        if (data) {
            await axios.post('https://guarded-badlands-63189.herokuapp.com/products/userBuyProduct', {
                id: buyNowProduct.buyNowProductStates ? buyNowProduct.productData._id : buyNowProduct._id,
                date: new Date(),
                paymentId: data,
                email: userDataInfo.email,
                quantity: buyNowProduct.buyNowProductStates ? buyNowProduct.buyNowProductQuantity : buyNowProduct.quantity,
                price: buyNowProduct.buyNowProductStates ? buyNowProduct.buyNowProductPrice : buyNowProduct.price,
                description: buyNowProduct.buyNowProductStates ? buyNowProduct.productData.description : buyNowProduct.description,
                title: buyNowProduct.buyNowProductStates ? buyNowProduct.productData.title : buyNowProduct.title,
                image: buyNowProduct.buyNowProductStates ? buyNowProduct.productData.image : buyNowProduct.image,
                category: buyNowProduct.buyNowProductStates ? buyNowProduct.productData.category : buyNowProduct.category,
                totalPrice: buyNowProduct.buyNowProductStates ? Math.floor(buyNowProduct.buyNowProductPrice + userDataInfo.shippingFee) : Math.floor(buyNowProduct.price + userDataInfo.shippingFee),
                userAddress: userAddressDataForProduct
            })
                .then(res => {
                    if (res) {
                        const updateUserDataInfo = { ...userDataInfo }
                        updateUserDataInfo.buyNowProductQuantity = 0
                        updateUserDataInfo.buyNowProductPrice = 0
                        setUserDataInfo(updateUserDataInfo)
                        deleteProductFromAddToCart()

                    }
                })

        }


    }
    // console.log(userDataInfo)
    const handleSubmitForBuy = async (event) => {
        // Block native form submission.

        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMassage(error.message);
            setPaymentSuccess('')
        } else {
            setPaymentSuccess(paymentMethod.id)
            handlePaymentOfOrder(paymentMethod.id)
            setErrorMassage('')
            allFunctionalData.handleNext()
        }

    };

    return (
        <div className="round p-5 border border-2 h-600" >
            <Typography variant="h4" align="center">
                Place Your Order
            </Typography>
            <Typography variant="h6" className="mt-5" align="center">
                Demo
            </Typography>
            <Typography variant="subtitle1">
                Try this Number
            </Typography>
            <img src={paymentImage} alt="" />
            <br />
            <br /><br />
            <form onSubmit={handleSubmitForBuy}>
                <Box className="p-2 bg-gray round-4">
                    <CardElement />
                </Box>
                <br /><br />
                <div className="text-center">
                    <Button className="" onClick={allFunctionalData.handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit" disabled={!stripe} className="">
                        Place Order
                    </Button>
                </div>

            </form>
            <br /><br />
            {
                errorMassage && <p className="text-danger text-center">{errorMassage}</p>
            }
            {
                paymentSuccess && <p className="text-center text-success">Your payment successfully Done.</p>
            }
        </div>
    );
};

export default SimpleCardForm;