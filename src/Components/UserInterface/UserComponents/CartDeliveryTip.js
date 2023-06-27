import React from "react";
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";
import { ServerURL } from "../../Services/ServerServices";


export default function CartDeliveryTip() {

    return (<div style={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', width: "84%", height: 'auto' }} >
        <Paper elevation={3} style={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: '10px' }} >

            <Grid container spacing={2} style={{ display: 'flex', padding: '0px', margin: '0px' }} >
                <Grid item sx={12} style={{ display: 'flex', padding: '5px 0px', margin: '0px', fontWeight: 'bolder' }}  >
                    Delivery Partner Tip
                </Grid>
                <Grid item sx={12} style={{ display: 'flex', padding: '3px 0px', margin: '0px', fontSize: '15px', fontWeight: '400' }}  >
                    The entire amount will be sent to your delivery partner
                </Grid>

                <Grid item sx={12} style={{ display: 'flex', padding: '5px 0px', margin: '0px', }}  >
                    <Grid item sx={3}  style={{display:'flex', paddingRight:'12px'}}  >

                        <Button variant="outlined" style={{ display: 'flex', justifyContent: 'left' }} >
                            <img src='/assets/coin.png' alt='dd' width={'25px'} />
                            <span style={{ marginLeft: '0px 5px' }} >  10</span>
                        </Button>
                    </Grid>
                    <Grid item sx={3} style={{ display: 'flex', paddingRight:'12px', margin: '0px' }}  >

                        <Button variant="outlined" style={{ display: 'flex', justifyContent: 'left' }} >
                            <img src='/assets/coin.png' alt='dd' width={'25px'} />
                            <span style={{ marginLeft: '0px 5px' }} >  20</span>
                        </Button>
                    </Grid>
                    <Grid item sx={3} style={{ display: 'flex', paddingRight:'12px', margin: '0px' }}  >

                        <Button variant="outlined" style={{ display: 'flex', justifyContent: 'left' }} >
                            <img src='/assets/coin.png' alt='dd' width={'25px'} />
                            <span style={{ marginLeft: '0px 5px' }} >  35</span>
                        </Button>
                    </Grid>
                    <Grid item sx={3} style={{ display: 'flex', paddingRight:'12px', margin: '0px' }}  >

                        <Button variant="outlined" style={{ display: 'flex', justifyContent: 'left' }} >
                            <img src='/assets/coin.png' alt='dd' width={'25px'} />
                            <span style={{ marginLeft: '0px 5px' }} >  40</span>
                        </Button>
                    </Grid>
                    
                </Grid>

            </Grid>
        </Paper>



    </div>)
}