import React, { lazy } from 'react';
import './Home.css'
import {Container } from '@material-ui/core';
const Footer = lazy(() => import('../CommonComponent/Footer/Footer'));
const AllProduct = lazy(() => import('../AllProductContent/AllProduct/AllProduct'));
const Home = () => {
  // const searchRef = useRef("")
  // const handleValue = (e) => {
  //   // console.log(searchRef.current.value)
  //   const searchValue = searchRef.current.value
  //   console.log(searchValue)
  //   axios.get(`https://guarded-badlands-63189.herokuapp.com/products/category/${searchValue}`)
  //     .then(res => console.log(res.data))

  // }
  return (
    <div className="">
      <Container maxWidth="lg">
      <AllProduct />
    </Container>
    <Footer/>
    </div>
  );
};

export default Home;