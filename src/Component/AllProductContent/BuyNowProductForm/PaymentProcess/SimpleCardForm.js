import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../../../App';
const SimpleCardForm = ({allFunctionalData }) => {
    const [userDataInfo,setUserDataInfo] = useContext(UserContext)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMassage, setErrorMassage] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState();
    const [userAddressDataForProduct,setUserAddressDataForProduct] =useState({})
    useEffect(() => {
    
        axios.get('https://blooming-ocean-38409.herokuapp.com/address', {
          headers: {
            email: userDataInfo.email
          }
        })
          .then(res => {
            setUserAddressDataForProduct(res.data)
          })
      }, [])
    const handlePaymentOfOrder = (data) => {

        // const allData = { ...info, date: new Date(), paymentId: paymentId,plans:id,userEmail:userData.email}
        if (data) {
            axios.post('https://blooming-ocean-38409.herokuapp.com/products/userBuyProduct',{
                id:allFunctionalData.buyNowProduct._id,
                date:new Date(),
                paymentId:data,
                email:userDataInfo.email,
                quantity:userDataInfo.buyNowProductQuantity,
                price:userDataInfo.buyNowProductPrice,
                description:allFunctionalData.buyNowProduct.description,
                title:allFunctionalData.buyNowProduct.title,
                image:allFunctionalData.buyNowProduct.image,
                category:allFunctionalData.buyNowProduct.category,
                userAddress:userAddressDataForProduct
            })
            .then(res=>{
                console.log(res)
                if(res){
                    const updateUserDataInfo = {...userDataInfo}
                    updateUserDataInfo.buyNowProductQuantity = 0
                    updateUserDataInfo.buyNowProductPrice = 0
                    setUserDataInfo(updateUserDataInfo)
                }
            })

        }
        
    }
    console.log(userDataInfo)
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
            console.group(paymentMethod.id)
        }

    };

    return (
        <div className="round p-5 border border-2 h-600" >
            <Typography variant="h4" align="center">
                Place Your Order
            </Typography>
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