import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import AllProductItem from './AllProductItem';
import './AllProduct.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
const AllProduct = () => {
    const [allData, setAllData] = useState([])
    const history = useHistory()
    const handleProductDetails = (event) => {
        history.push('/productDetails/' + event)
        // console.log(event)
    }
    useEffect(() => {
        // fetchProducts()
        axios.get("http://localhost:5000/products/allProducts")
            .then(res => {
                setAllData(res.data)
            })
            .catch(err => {
                console.log("Err: ", err);
            });

    }, [])
    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                {
                    allData.length ? allData.map(data => (<AllProductItem key={data._id} handleProductDetails={handleProductDetails} data={data} />)) : <Grid container justifyContent="center"className="spinnerHeight" alignItems="center"><CircularProgress className="spinnerColor"/></Grid>
                }
            </Grid>
        </Container>
    );
};

export default AllProduct;