import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import { Container } from '@material-ui/core';
const stripePromise = loadStripe('pk_test_51IiFbLIQFxvnZ35y7eTLeRzag9eGJ4qtO7eaxQJARldO2fuuYoDadBNWHmLG3nflwXssUSuCC0a3STeZlW2TYjlQ00qhbOwsz2');
const PaymentProcess = ({allFunctionalData}) => {
   
    return (
            <Container>
                <Elements stripe={stripePromise}>
                    <SimpleCardForm  allFunctionalData={allFunctionalData}/>
                </Elements>
            </Container>
    );
};

export default PaymentProcess;