import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from '../../style'
const Footer = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () =>{
        history.push('/login')
    }
    return (
        <div>
            this kdsfjsds
            <Button onClick={handleClick}>LOgin</Button>
        </div>
    );
};

export default Footer;