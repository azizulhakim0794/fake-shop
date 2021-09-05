import React from 'react';
import './Home.css'
import {Container } from '@material-ui/core';
import './Home.css'
import AllProduct from '../AllProductContent/AllProduct/AllProduct';
import Footer from '../CommonComponent/Footer/Footer'
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
    <div>
      <Container maxWidth="lg">
      <AllProduct />
    </Container>
    <Footer/>
    </div>
  );
};

export default Home;