import React from 'react';
import './Home.css'
import { Box, Button, Container, Grid } from '@material-ui/core';
import { useRef } from 'react';
import './Home.css'
import AllProduct from '../AllProductContent/AllProduct/AllProduct';

const Home = () => {
  // const classes = useStyles();
  const searchRef = useRef(null)
  const handleValue = (e) => {
    console.log(searchRef.current.value)
    fetch(`https://fakestoreapi.com/products/category/${searchRef.current.value}`)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <Container >
      <Box component="main" mt={7} mb={7}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item md={10} xs={10}>
            <input className="search-input-design me-3" placeholder="Search..." ref={searchRef} type="text" />
          </Grid>
          <Grid item md={2}>
            <Button onClick={handleValue} variant="outlined">Search</Button>
          </Grid>
        </Grid>
      </Box>
      <AllProduct />
    </Container>
  );
};

export default Home;