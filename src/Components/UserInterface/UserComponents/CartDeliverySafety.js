import React from "react";
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import { ServerURL } from "../../Services/ServerServices";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function CartDeliverySafety() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dialogLearnMore = () => {
        return (<Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogContent style={{ padding: '15px 20px 0px 20px', margin: 0, maxWidth:400 }}>
                <DialogContentText >
                    <div style={{ display: 'flex', flexDirection: 'column', padding: 0, margin: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={`${ServerURL}/images/delivery.png`} alt='ss' style={{ display: 'flex', justifyContent: 'left', width: '100px', padding: '5px 10px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600, fontSize: 18, color: 'black', padding: 5 }}>
                            Here's How We Do It
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, padding: 5 }}>
                            At Tug, Rider's safety is our responsibility
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', background: '#d5f8ff', padding: 10, borderRadius: 8, color: 'black', alignItems: 'center', margin:'10px 0px'}} >
                            <div style={{ display: 'flex' }}>
                                <AlarmOnIcon />
                            </div>
                            <div style={{ display: 'flex', fontSize: 14, paddingLeft:10 }}>
                                Delivery partners ride safely at an average speed of 15kmph per delivery
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', background: '#d5f8ff', padding: 10, borderRadius: 8, color: 'black', alignItems: 'center', margin:'10px 0px' }}>
                            <div style={{ display: 'flex' }}>
                                <DirectionsBikeIcon />
                            </div>
                            <div style={{ display: 'flex', fontSize: 14, paddingLeft:10 }}>
                                No penalties for late deliveries & no incentives for on-time deliveries
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', background: '#d5f8ff', padding: 10, borderRadius: 8, color: 'black', alignItems: 'center', margin:'10px 0px 0px' }}>
                            <div style={{ display: 'flex' }}>
                                <CampaignIcon />
                            </div>
                            <div style={{ display: 'flex', fontSize: 14, paddingLeft:10 }}>
                                Delivery partners are not informed about promised delivery time
                            </div>
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }} >
                <Button variant="contained" style={{backgroundColor:'red'}} fullWidth onClick={handleClose} autoFocus>
                    Close 
                </Button>
            </DialogActions>
        </Dialog>)
    }

    return (<div style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', width: "84%", height: 'auto' }} >
        <Paper elevation={3} style={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: '10px' }} >

            <Grid container spacing={2} style={{ display: 'flex', padding: '0px', margin: '0px' }} >
                <Grid item sx={6} style={{ display: 'flex', padding: '5px 0px', margin: '0px', fontWeight: 'bolder' }}  >
                    <img src={`${ServerURL}/images/delivery.png`} alt='ss' style={{ display: 'flex', justifyContent: 'left', width: '55px', padding: '0px 10px' }} />
                </Grid>
                <Grid item sx={6} style={{ display: 'flex', padding: '5px 0px', margin: '0px', fontWeight: 600, textTransform: 'capitalize', fontSize: 13, letterSpacing: 0 }} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        See how we ensure our delivery partner’s safety
                    </div>
                    <div style={{ paddingLeft: 5, }} >
                        <Button style={{ color: 'red', fontWeight: 500, textTransform: 'capitalize', fontSize: 13 }} variant="text" onClick={handleClickOpen}>
                            Learn more
                        </Button>
                    </div>
                </Grid>


            </Grid>
        </Paper>
        {dialogLearnMore()}


    </div>)
}