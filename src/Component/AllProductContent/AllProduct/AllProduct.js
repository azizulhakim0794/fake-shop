import React, { useState } from 'react';
import { CardActionArea, CardContent, Card, Grid, Typography, Box } from '@material-ui/core';
import { useEffect } from 'react';
import './AllProduct.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/actions/productActions'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
const AllProduct = () => {
    const history = useHistory()
    const products = useSelector((state) => state.allProducts.products)
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch()
    // const cache = useRef(new CellMeasurerCache({
    //     fixedWidth: true,
    //     defaultHeight: 100
    // }))
    const handleProductDetails = (event) => {
        history.push('/productDetails/' + event)
    }
    useEffect(() => {
        axios.get("https://guarded-badlands-63189.herokuapp.com/products/allProducts", {
            headers: {
                searchItem: searchValue
            }
        })
            .then(res => {
                dispatch(setProducts(res.data))
            })
            .catch(err => {
                console.log("Err: ", err);
            });

    }, [searchValue])
    // const allProductList = ({ index, style }) => {
    //     const product = products[index]
    //     const { image, _id, title, category, price } = product
    //     return (<Grid item style={style}xs={6} sm={6} md={4} lg={3} onClick={() => handleProductDetails(_id)}>
    //         <CardActionArea className="">
    //         <Card className="">
    //                      <LazyLoadImage
    //                          alt={title}
    //                          height={400}
    //                          src={image} // use normal <img> attributes as props
    //                          title={title}
    //                          effect="blur" />
    //                      <CardContent className="Product_cardContent">
    //                          <Typography variant="h6" gutterBottom>{category}</Typography>
    //                          <Typography variant="body2" className="" gutterBottom>{title}</Typography>
    //                          <Typography variant="h6" gutterBottom>$ {price}</Typography>
    //                      </CardContent>
    //                </Card>
    //         </CardActionArea>
    //     </Grid>)
    // };
    
    const allProductList = products.map((product) => {
        const { image, _id, title, category, price } = product
        return (<Grid item key={_id} xs={6} sm={6} md={4} lg={3} onClick={() => handleProductDetails(_id)}>
            <CardActionArea className="">
                <Card className="">
                <LazyLoadImage
                             alt={title}
                             height={400}
                             src={image} // use normal <img> attributes as props
                             title={title}
                             effect="blur" />
                    <CardContent className="Product_cardContent">
                        <Typography variant="h6" gutterBottom>{category}</Typography>
                        <Typography variant="body2" className="" gutterBottom>{title}</Typography>
                        <Typography variant="h6" gutterBottom>$ {price}</Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>)
    });
    return (
        <div>
        <Box component="main" mt={7} mb={7}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item md={12} xs={12}>
                    <input className="search-input-design me-3" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} type="text" />
                </Grid>
                <Grid item md={2}>
                </Grid>
            </Grid>
        </Box>
        <Grid container spacing={4}>
            {
                 products.length ? allProductList : <Grid container justifyContent="center" className="spinnerHeight" alignItems="center"><CircularProgress className="spinnerColor" /></Grid>
            }
        </Grid>
    </div>
    );
};

export default AllProduct;