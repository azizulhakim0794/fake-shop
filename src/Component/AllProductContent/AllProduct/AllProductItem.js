import { CardActionArea, CardContent, Typography,Card, Grid  } from '@material-ui/core';
import React from 'react';
import useStyles from '../../style'
import '../AllProduct/AllProduct.css'

const AllProductItem = ({ data,handleProductDetails }) => {
    const classes = useStyles();
   
    return (

        <Grid item  xs={12} sm={6} md={4} onClick={()=> handleProductDetails(data._id)}>
            <CardActionArea className={classes.cardActionArea}>
                <Card className={classes.card}>
                    {/* <CardMedia
                        component="img"
                        image={data.image}
                        title={data.title}
                        className="img-208"
                        alt={data.title}
                    /> */}
                    <img src={data.image} alt={data.id} title={data.title} style={{width: '100%',height:"300px",}}/>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" gutterBottom>{data.category}</Typography>
                        <Typography variant="body2" className={classes.height100} gutterBottom>{data.title}</Typography>
                        <Typography variant="h6" gutterBottom>$ {data.price}</Typography>
                    </CardContent>

                </Card>
            </CardActionArea>
        </Grid>

    );
};

export default AllProductItem;