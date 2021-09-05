import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

const UserOrderedProductsItem = ({data}) => {
    
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
                {/* <Typography variant="subtitle1" gutterBottom>
                  Qty: {data.quantity}
                </Typography> */}
                <Typography variant="h6">
                Subtotal ({data.quantity} Items) : ${data.price}
                </Typography>
                <Typography variant="h5">
                  Total : ${data.totalPrice}
                </Typography>
                <Typography variant="h6">
                   <u>Address:</u> {data.userAddress.country}-{data.userAddress.city}, {data.userAddress.address}
                </Typography>
                </CardContent>
            </Grid>
        </Grid>
        </Card>
    );
};

export default UserOrderedProductsItem;