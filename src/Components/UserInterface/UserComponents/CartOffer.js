import React from "react";
import { ServerURL } from "../../Services/ServerServices";
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CartOffer() {

    return (<div style={{display:"flex", justifyContent:'left', flexWrap:'wrap', width:"100%", height:'auto'}} >
    <Paper elevation={3} style={{display:'flex', width:'80%'}} >
        <Grid container spacing={2} style={{margin:0, padding:0}} >
            <Grid item xs={3} style={{display:'flex', justifyContent:'center', alignItems:'center', margin:0, padding:0 }} >
                <img src="/assets/coupon.png" alt='ss' style={{ display: 'flex', justifyContent: 'left', width: '60%', padding: '6px 10px' }} />

            </Grid>
            <Grid item xs={7} style={{display:'flex', justifyContent:'left', alignItems:'center', margin:0, padding:0 }}>
                <div style={{ display:'flex',fontWeight: 500, fontSize: '14px' }} >Available Offers / Coupons</div>

            </Grid>
            <Grid item xs={2} style={{display:'flex', justifyContent:'right', alignItems:'center' }}>
                <Button size="small" variant="text" style={{ color: '#00d3ff' }}>
                    <ArrowForwardIcon/>
                </Button>

            </Grid>
        </Grid>
    </Paper>


</div>)
}