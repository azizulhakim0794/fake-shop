import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AddressForm from './AddressForm';
import Checkout from './Checkout';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../App';
import PaymentProcess from './PaymentProcess/PaymentProcess';
import Login from '../../Login/Login';
// import { Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
const BuyNowProductForm = () => {
  const history = useHistory()
  let {buyNowId} = useParams()
  const [userDataInfo] = useContext(UserContext)
  const [addressPost,setAddressPost] = useState(true)
  const [country, setCountry] = useState('')
  const [userAddressDataCheck, setUserAddressDataCheck] = useState({})
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')
  const [countryError, setCountryError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [zipError, setZipError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const formSetValue = {setCountry,setCity,setState,setZip,setAddress}
  const formErrValue = {countryError,cityError,stateError,zipError,addressError}
  const valueCheck = (value ,setValue) =>{
   return()=>{ if (value == '') {
      setValue(true)
    }}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCountryError(false)
    setCityError(false)
    valueCheck(country,setCountryError)
    valueCheck(city,setCityError)
    valueCheck(state,setStateError)
    valueCheck(zip,setZipError)
    valueCheck(address,setAddressError)
    if (country.length && city.length && state.length && zip.length && address.length) {
      axios.post('https://blooming-ocean-38409.herokuapp.com/address',{
        country:country,
        city:city,
        state:state,
        zip:zip,
        address:address,
        email:userDataInfo.email
      })
      .then(res=>{
        if(res){
          setAddressPost(res)
        }
      })
    }
    if (!(country && city && state && zip && address)) {
      alert('Please fill the Form')
    }

  }
  useEffect(()=>{
    axios.get('https://blooming-ocean-38409.herokuapp.com/address', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setUserAddressDataCheck(res.data)
      })
      // return setUserAddressDataCheck({})
  })
  const [buyNowProduct,setBuyNowProduct] = useState({})
  useEffect(()=>{
    axios.post('https://blooming-ocean-38409.herokuapp.com/products/singleProduct',{
      id:buyNowId
  })
  .then(res => setBuyNowProduct(res.data))
  .catch(ex => console.error(ex))


  },[buyNowId])

  const getSteps = () =>{
  
    return ['Shipping Address', 'Order Confirm', 'Payment information'];
  }
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return userDataInfo.email? <AddressForm handleSubmit={handleSubmit} formSetValue={formSetValue} formErrValue={formErrValue} addressPost={addressPost} allFunctionalData={allFunctionalData}/> : history.push('/login');
          case 1:
        return <Checkout data={buyNowProduct} allFunctionalData={allFunctionalData}/>;
      case 2:
        return <PaymentProcess allFunctionalData={allFunctionalData}/>;
      default:
        return 'Unknown stepIndex';
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(userAddressDataCheck.email){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else if(!userAddressDataCheck.email){
      alert('Please Fill and save the the Form')
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const allFunctionalData = {handleBack,handleNext,buyNowProduct}

  
  return (
    <Container className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <div>
        {activeStep === steps.length ? (
          <div>
            <Box className={classes.instructions} variant="" align="center" >Your Order is SuccessFully done!!!</Box>
            <Box align="center"  className="mt-5">
            <Button onClick={()=> history.push('/myOrderedProducts')}>Go My Orders</Button>
            </Box>
          </div>
        ) : (
          <div>
            <Box className={classes.instructions}>{getStepContent(activeStep)}</Box>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BuyNowProductForm;