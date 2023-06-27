import React from "react";
import Footer from "../UserComponents/Footer";
import { Grid } from "@mui/material";
import HeaderMyCart from "../UserComponents/HeaderMyCart";
import CartProduct from "../UserComponents/CartProduct";
import CartOffer from "../UserComponents/CartOffer";
import { Button } from "@material-ui/core";
import CartPrice from "../UserComponents/CartPrice";
import CartAddress from "./CartAddress";

export default function CartRightPart(props) {

    return (<div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }} >

    <Grid container spacing={2}  style={{ display: 'flex',height:'80px' }} >
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }} >
            <CartOffer />

        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }} >
            <CartPrice data={props.values} pageRefresh={props.pageRefresh} />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }} >
            <CartAddress />
        </Grid>
    </Grid>


</div>)
}