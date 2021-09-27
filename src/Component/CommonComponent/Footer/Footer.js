import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {

    return (
        <div className="footer mt-5">
            <Grid container direction="row" justifyContent="space-between">
                <Grid item>
                    <Grid container direction="column">
                        <Typography variant="h5">Fake-Shop</Typography><br />
                        <Link className="footer_link" to="">About Fake-Shop</Link>
                        <Link className="footer_link" to="">Digital Payments</Link>
                        <Link className="footer_link" to="">Careers</Link>
                        <Link className="footer_link" to="">Fake-Shop Blog</Link>
                        <Link className="footer_link" to="">Terms & Conditions</Link>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Typography variant="h5">Earn With Fake-Shop</Typography><br />
                        <Link className="footer_link" to="">Fake-Shop Anniversary</Link>
                        <Link className="footer_link" to="">Sell on Fake-Shop</Link>
                        <Link className="footer_link" to="">Code of Conduct</Link>
                        <Link className="footer_link" to="">Join the Fake-Shop Affiliate Program</Link>
                        <Link className="footer_link" to="">Terms & Conditions</Link>
                    </Grid>
                </Grid>
                <Grid item className="">
                    <Grid container direction="column">
                        <Typography variant="h5"> Customer Care</Typography><br />
                        <Link className="footer_link" to=""> Help Center</Link>
                        <Link className="footer_link" to="">How to Buy</Link>
                        <Link className="footer_link" to="">Returns & Refunds</Link>
                        <Link className="footer_link" to="">Contact Us</Link>
                    </Grid>
                </Grid>
            </Grid>
            <Typography className="text_footer" variant="subtitle1">Copyright © {new Date().getFullYear()} fake-shop.com</Typography>
        </div>
    );
};

export default Footer;