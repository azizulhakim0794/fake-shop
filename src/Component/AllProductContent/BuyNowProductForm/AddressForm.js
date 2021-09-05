import React, { useContext, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { Box, Grid, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { Input, InputLabel } from '@material-ui/core';
import { UserContext } from '../../../App'
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  mt4:{
    marginTop: "40px",
  }
})

const AddressForm = ({ handleSubmit, formSetValue, formErrValue,addressPost,allFunctionalData }) => {
  const classes = useStyles()
  const [userDataInfo] = useContext(UserContext)
  const [userAddressData, setUserAddressData] = useState({})
  const [editAdderssResponse,setEditAddressResponse] =  useState(false)

  // const [btnNone,setBtnNone] = useState('d-none')
  useEffect(() => {
    
    axios.get('https://guarded-badlands-63189.herokuapp.com/address', {
      headers: {
        email: userDataInfo.email
      }
    })
      .then(res => {
        setUserAddressData(res.data)
      })
  }, [editAdderssResponse,addressPost,userDataInfo.email])
  const handleBtnEdit = () => {
    axios.delete('https://guarded-badlands-63189.herokuapp.com/address',{
      headers:{
        email:userDataInfo.email
      }
    })
    .then(res=>{
      setEditAddressResponse(res)

    })
  }

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const handleAddressBack=()=>{
    history.replace(from);
  }
  return (
    <Container size="sm" className="mt-5">

      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Your Address
      </Typography>

      {!userAddressData.zip && <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField className={classes.field}
              onChange={(e) => formSetValue.setCountry(e.target.value)}
              label="Country"
              // variant="outlined" 
              color="secondary"
              fullWidth
              required
              error={formErrValue.countryError}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.field}
              onChange={(e) => formSetValue.setCity(e.target.value)}
              label="City"
              // variant="outlined" 
              color="secondary"
              fullWidth
              required
              error={formErrValue.cityError}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.field}
              onChange={(e) => formSetValue.setState(e.target.value)}
              label="State"
              // variant="outlined" 
              color="secondary"
              fullWidth
              required
              error={formErrValue.stateError}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.field}
              onChange={(e) => formSetValue.setZip(e.target.value)}
              label="Zip code"
              // variant="outlined" 
              color="secondary"
              fullWidth
              required
              error={formErrValue.zipError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.field}
              onChange={(e) => formSetValue.setAddress(e.target.value)}
              label="Home Address"
              // variant="outlined"
              color="secondary"
              multiline
              fullWidth
              required
              error={formErrValue.addressError}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          // color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          save
        </Button>
      </form>}
      {userAddressData.zip && <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputLabel htmlFor="">Country</InputLabel>
            <Input inputComponent="input" fullWidth name="country" placeholder="Country Name"  type="text" value={userAddressData.country} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel  htmlFor="">City Name</InputLabel>
            <Input  inputComponent="input"name="city" fullWidth placeholder="City Name"  type="text" value={userAddressData.city} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel htmlFor="">State Name</InputLabel>
            <Input inputComponent="input"name="city" fullWidth placeholder="State Name"  type="text" value={userAddressData.state} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel htmlFor="">Zip code</InputLabel>
            <Input inputComponent="input"name="city" fullWidth placeholder="Zip code" type="text" value={userAddressData.zip} />
          </Grid>
          <Grid item  md={12}>
            <InputLabel htmlFor="">Home Address</InputLabel>
            <Input inputComponent="input"name="city" fullWidth placeholder="Home Address"  type="text" value={userAddressData.address} />
          </Grid>
        </Grid>
       <Box component="div" className="mt-3">
       {userAddressData.zip && <Box component="span" mr={3}>
          <Button
            className="me-3"
            // color="secondary" 
            variant="outlined"
            onClick={handleBtnEdit}>
            edit
          </Button>
        </Box>}
       </Box>
      </form>}
      <div className="text-center">
        <Button className="" onClick={handleAddressBack}>
          Back
        </Button>
        <Button variant="contained" onClick={allFunctionalData.handleNext} color="primary" type="submit" >
          Next
        </Button>
      </div>
    </Container>
  );
}
export default AddressForm;