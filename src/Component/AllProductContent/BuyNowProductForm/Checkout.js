import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { UserContext } from '../../../App';



const Checkout = ({ allFunctionalData }) => {
  const [userDataInfo] =useContext(UserContext)
  const buyProduct = useSelector((state) => state.buy_now_product)
  return (
    <div>
      <Container maxWidth="md" className="mt-5">
        <Card>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              {buyProduct.buyNowProductStates ? <img xs={12} src={buyProduct.productData.image} alt={buyProduct.productData._id} title={buyProduct.productData.title} style={{ width: '400px', height: "400px", padding: '20px 0' }} /> : <img xs={12} src={buyProduct.image} alt={buyProduct._id} title={buyProduct.title} style={{ width: '400px', height: "400px", padding: '20px 0' }} />}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardContent >
                <Typography variant="h4" gutterBottom>
                  {allFunctionalData.buyNowProduct.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Quantity: {buyProduct.buyNowProductStates ? buyProduct.buyNowProductQuantity : buyProduct.quantity}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {buyProduct.buyNowProductStates ? buyProduct.productData.description : buyProduct.description}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  $ {buyProduct.buyNowProductStates ? buyProduct.buyNowProductPrice: buyProduct.price}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Shipping Fee:$ {userDataInfo.shippingFee}
                </Typography>
                <Typography variant="h5" gutterBottom>
                 Total Price $ {buyProduct.buyNowProductStates ? Math.floor(buyProduct.buyNowProductPrice+userDataInfo.shippingFee): Math.floor(buyProduct.price+userDataInfo.shippingFee)}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <div className="text-center mt-5">
          <Button className="" onClick={allFunctionalData.handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={allFunctionalData.handleNext} color="primary" type="submit" >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
}
export default Checkout;