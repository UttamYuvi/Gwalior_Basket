import React from "react";
import { Grid } from "@mui/material";
import CartProduct from "../UserComponents/CartProduct";
import CartDeliveryTip from "./CartDeliveryTip";
import CartDeliverySafety from "./CartDeliverySafety"; 

export default function CartLeftPart(values) {

    console.log(values)

    return (<div style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }} >

        <Grid container spacing={2}  style={{ display: 'flex' }} >
            <Grid item xs={12}  style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }} >
                <CartProduct values={values} />

            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }} >
                <CartDeliveryTip/>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }} >
                <CartDeliverySafety/>
            </Grid>
        </Grid>


    </div>)
}