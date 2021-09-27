import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import './Loading.css'

const Loading = () => {
    return (
        <Grid container justifyContent="center" className="spinnerHeight Loading" alignItems="center"><CircularProgress className="spinnerColor" /></Grid>
    );
};

export default Loading;