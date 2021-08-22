import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { UserContext } from '../../../App';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


const Checkout = ({allFunctionalData }) => {
  const classes = useStyles();
  const [userDataInfo] = useContext(UserContext)
  let {buyNowId} = useParams()
  // console.log(buyNowId)
  useEffect(()=>{
    axios.get('http://localhost:5000/cartProduct/addToCartSingleProduct',{
      headers:{
        id:buyNowId
      }
    })
    .then(res=>{
      console.log(res)
    })
  },[buyNowId])
  return (
    <Container>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Confirm Order
          </Typography>
          <Stepper className={classes.stepper}>
          </Stepper>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Typography gutterBottom>
                <img xs={12} src={allFunctionalData.buyNowProduct.image} alt={allFunctionalData.buyNowProduct._id} title={allFunctionalData.buyNowProduct.title} style={{ width: '150px', height: "200px", padding: '20px 0' }} />
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h5">
                {allFunctionalData.buyNowProduct.title}
              </Typography>
              <br />
              <Typography variant="body1">
                {allFunctionalData.buyNowProduct.description}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between" className="m-auto">
              <Typography variant="h6">
                ${userDataInfo.buyNowProductPrice}
              </Typography>
              <Typography variant="h6" >
                Quantity: {userDataInfo.buyNowProductQuantity}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </main>
      <div className="text-center">
        <Button className="" onClick={allFunctionalData.handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={allFunctionalData.handleNext} color="primary" type="submit" >
          Next
        </Button>
      </div>
    </Container>
  );
}
export default Checkout;