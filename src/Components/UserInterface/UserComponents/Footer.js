import React, { useState } from "react";
import { useStyles } from "./FooterCss";
import { Divider } from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import StoreIcon from '@mui/icons-material/Store';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VisibilityIcon from '@mui/icons-material/Visibility';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Grid } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Footer() {

    const classes = useStyles();
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.down('sm'))

    const [aboutState, setAboutState] = useState(false)
    const [helpState, setHelpState] = useState(false)
    const [storeState, setStoreState] = useState(false)
    const [serviceState, setServiceState] = useState(false)


    return (

        <body style={{ background: '#f7f7f7' }} >
            <Divider fullWidth style={{ width: '99%', marginTop: '10px' }} />
            <Grid container spacing={2} >
                {matches ? <>

                    <Grid item xs={12} className={classes.linkContainer} style={{ marginLeft: '12px' }}>
                        <Grid item xs={12} onClick={() => setAboutState(!aboutState)} style={{ flexWrap: 'wrap', display: 'flex', cursor: 'pointer', }} >
                            <div style={{ display: 'flex', width: "100%" }}>
                                <div style={{ display: 'flex', flexGrow: 1, }} >
                                    <h3 style={{ color: 'rgb(51, 51, 51)' }}>About Us</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >
                                    <KeyboardArrowDownIcon />
                                </div>
                            </div>
                            {aboutState ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column' }}  >
                                <div >
                                    <a href="#" className={classes.aStylesSM} >About</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStylesSM} >Career</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStylesSM} >News And Blogs</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStylesSM} >Brands</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStylesSM} >Press Center</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStylesSM} >Investors</a>
                                </div>
                            </div> : <></>}

                        </Grid>
                        <Divider fullWidth style={{ width: '99%', marginTop: '10px' }} />


                        <Grid item xs={12} onClick={() => setHelpState(!helpState)} style={{ flexWrap: 'wrap', display: 'flex', cursor: 'pointer', }} >
                            <div style={{ display: 'flex', width: "100%" }}>
                                <div style={{ display: 'flex', flexGrow: 1 }} >
                                    <h3 style={{ color: 'rgb(51, 51, 51)' }}>NEED HELP</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >
                                    <KeyboardArrowDownIcon />
                                </div>
                            </div>
                            {helpState ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column' }}  >
                                <div>
                                    <a href="#" className={classes.aStyles} >Help</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles}>Returns</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles}>Track Order</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles}>Recalls</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >Contact us</a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >Security and Fraud</a>
                                </div>
                            </div> : <></>}

                        </Grid>
                        <Divider fullWidth style={{ width: '99%', marginTop: '10px' }} />


                        <Grid item xs={12} onClick={() => setStoreState(!storeState)} style={{ flexWrap: 'wrap', display: 'flex', cursor: 'pointer', }} >

                            <div style={{ display: 'flex', width: "100%" }}>
                                <div style={{ display: 'flex', flexGrow: 1 }} >
                                    <h3 style={{ color: 'rgb(51, 51, 51)' }}>Stores</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >
                                    <KeyboardArrowDownIcon />
                                </div>
                            </div>

                            {storeState ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column' }}  >
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><StoreIcon style={{ marginRight: 3 }} /><span style={{}}>Find a Store</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalHospitalIcon style={{ marginRight: 3 }} /><span style={{}}>Clinic</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalPharmacyIcon style={{ marginRight: 3 }} /><span style={{}}>Pharmacy</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><VisibilityIcon style={{ marginRight: 3 }} /><span style={{}}>Optical</span></div>
                                    </a>
                                </div>
                            </div> : <></>}


                        </Grid>
                        <Divider fullWidth style={{ width: '99%', marginTop: '10px' }} />


                        <Grid item xs={12} onClick={() => setServiceState(!serviceState)} style={{ flexWrap: 'wrap', display: 'flex', cursor: 'pointer', }} >
                            <div style={{ display: 'flex', width: "100%" }}>
                                <div style={{ display: 'flex', flexGrow: 1 }} >
                                    <h3 style={{ color: 'rgb(51, 51, 51)' }}>Services</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >
                                    <KeyboardArrowDownIcon />
                                </div>
                            </div>
                            {serviceState ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column' }}  >
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><CreditCardIcon style={{ marginRight: 3 }} /><span style={{}}>RedCard</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><PhoneAndroidIcon style={{ marginRight: 3 }} /><span style={{}}>Mobile App</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><CardGiftcardIcon style={{ marginRight: 3 }} /><span style={{}}>Registry</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><DeliveryDiningIcon style={{ marginRight: 3 }} /><span style={{}}>Same Day Delivery</span></div>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" className={classes.aStyles} >
                                        <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalShippingIcon style={{ marginRight: 3 }} /><span style={{}}>Shipping Delivery</span></div>
                                    </a>
                                </div>
                            </div> : <></>}

                        </Grid>
                        <Divider fullWidth style={{ width: '99%', marginTop: '10px' }} />

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: "center" }} >
                            <img src={'/assets/gwaliorbasket.png'} alt='logo' width={'100%'} />

                        </Grid>

                    </Grid>

                </> :
                    <Grid item xs={12} className={classes.linkContainer} style={{ marginLeft: '16px' }}>

                        <Grid item xs={3}  >
                            <h3 style={{ color: 'rgb(51, 51, 51)' }}>About Us</h3>
                            <div>
                                <a href="#" className={classes.aStyles} >About</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Career</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >News And Blogs</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Brands</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Press Center</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Investors</a>
                            </div>

                        </Grid>


                        <Grid item xs={3} >
                            <h3 style={{ color: 'rgb(51, 51, 51)' }}>NEED HELP</h3>
                            <div>
                                <a href="#" className={classes.aStyles} >Help</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles}>Returns</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles}>Track Order</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles}>Recalls</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Contact us</a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >Security and Fraud</a>
                            </div>
                        </Grid>

                        <Grid item xs={3} >
                            <h3 style={{ color: 'rgb(51, 51, 51)' }}>Stores</h3>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><StoreIcon style={{ marginRight: 3 }} /><span style={{}}>Find a Store</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalHospitalIcon style={{ marginRight: 3 }} /><span style={{}}>Clinic</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalPharmacyIcon style={{ marginRight: 3 }} /><span style={{}}>Pharmacy</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><VisibilityIcon style={{ marginRight: 3 }} /><span style={{}}>Optical</span></div>
                                </a>
                            </div>

                        </Grid>

                        <Grid item xs={3} >
                            <h3 style={{ color: 'rgb(51, 51, 51)' }}>Services</h3>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><CreditCardIcon style={{ marginRight: 3 }} /><span style={{}}>RedCard</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><PhoneAndroidIcon style={{ marginRight: 3 }} /><span style={{}}>Mobile App</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><CardGiftcardIcon style={{ marginRight: 3 }} /><span style={{}}>Registry</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><DeliveryDiningIcon style={{ marginRight: 3 }} /><span style={{}}>Same Day Delivery</span></div>
                                </a>
                            </div>
                            <div>
                                <a href="#" className={classes.aStyles} >
                                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: '40px' }} ><LocalShippingIcon style={{ marginRight: 3 }} /><span style={{}}>Shipping Delivery</span></div>
                                </a>
                            </div>
                        </Grid>

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: "center" }} >
                            <img src={'/assets/gwaliorbasket.png'} alt='logo' />

                        </Grid>

                    </Grid>}
            </Grid>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: "center", background: '#333333', marginTop: '0px' }}  >
                {matches ? <>

                    <Grid container spacing={2} style={{ display: 'flex', justifyContent: "space-between", marginLeft: '16px', padding: '10px', }} >

                        <Grid item xs={12} style={{ display: 'flex' }} >

                            <Grid item xs={2} style={{ margin: '0px 30px' }} >
                                <a href="#" className={classes.iconStyles} ><FacebookIcon fontSize="medium" /></a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 30px' }} >
                                <a href="#" className={classes.iconStyles}><TwitterIcon fontSize="medium" /></a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 30px' }} >
                                <a href="#" className={classes.iconStyles}><InstagramIcon fontSize="medium" /></a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 30px' }} >
                                <a href="#" className={classes.iconStyles}><LinkedInIcon fontSize="medium" /></a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 30px' }} >
                                <a href="#" className={classes.iconStyles}><YouTubeIcon fontSize="medium" /></a>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{ display: 'flex', justifyContent: "space-between", marginLeft: '16px', padding: '10px', }} >
                        <Grid item xs={12} style={{ display: 'flex', fontSize: '12px' }} >
                            <Grid item xs={2} style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.aStylesFoot} >Terms</a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >CA Supply Chain</a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >Privacy</a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} > CA Privacy Rights </a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >Interest Based Ads</a>
                            </Grid>
                            <Grid item xs={2} style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >TM & c 2023 Brands, Inc. </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                    :
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: "space-between", marginLeft: '16px', padding: '10px' }} >

                        <div style={{ display: 'flex' }} >

                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.iconStyles} ><FacebookIcon fontSize="medium" /></a>
                            </div>
                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.iconStyles}><TwitterIcon fontSize="medium" /></a>
                            </div>
                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.iconStyles}><InstagramIcon fontSize="medium" /></a>
                            </div>
                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.iconStyles}><LinkedInIcon fontSize="medium" /></a>
                            </div>
                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.iconStyles}><YouTubeIcon fontSize="medium" /></a>
                            </div>
                        </div>


                        <div style={{ display: 'flex', fontSize: '12px' }} >

                            <div style={{ margin: '0px 5px' }} >
                                <a href="#" className={classes.aStylesFoot} >Terms</a>
                            </div>
                            <div style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >CA Supply Chain</a>
                            </div>
                            <div style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >Privacy</a>
                            </div>
                            <div style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} > CA Privacy Rights </a>
                            </div>
                            <div style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >Interest Based Ads</a>
                            </div>
                            <div style={{ margin: '0px 5px' }}>
                                <a href="#" className={classes.aStylesFoot} >TM & c 2023 Brands, Inc. </a>
                            </div>


                        </div>
                    </Grid>}

            </Grid>

        </body>
    )
}