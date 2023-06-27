import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@material-ui/core";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F7F7F7',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#434343'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#434343',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
        },
    },
}));


export default function HeaderMyCart() {

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    

    return (<div>
        <Box sx={{ flexGrow: 1 }}>
            {matches ? <>

                <AppBar position="relative" style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,211,255,1) 100%)', display: 'flex', justifyContent: 'center' }} >

                    <Toolbar>
                        <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', }}  >

                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >

                                <Button color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff', paddingTop: '10px' }} ><ArrowBackIcon size="large" /></Button>
                            </Grid>

                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1%', fontSize: '18px', fontWeight: 700 }}  >
                                Cart
                            </Grid>

                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >

                                <Button color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff', paddingTop: '10px' }} >Empty Cart</Button>
                            </Grid>

                        </Grid>

                    </Toolbar>
                </AppBar>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', padding: '0px', background: '#00d3ff' }}    >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#fff' }} >
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'16px', fontWeight:500, lineHeight:'37px' }}  >₹427</span>
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:'14px', marginLeft:'3px' }} >saved on this order</span>
                    </div>
                </div>

            </> : <>

                <AppBar position="relative" style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,211,255,1) 100%)', display: 'flex', justifyContent: 'center', }} >

                    <Toolbar>
                        <Grid container spacing={2}>

                            <Grid item xs={2} >
                                <img src="/assets/targetlogo.webp" style={{ marginLeft: 20, width: 45, height: 45 }} />
                            </Grid>

                            <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >

                                <Search style={{ height: '45px', width: '100%' }} >
                                    <SearchIconWrapper>
                                        <SearchIcon color="#434343" />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >

                                <Button color="inherit" style={{ fontSize: '16px', textTransform: 'capitalize', color: '#fff', fontWeight: 600 }} >My Account</Button>
                            </Grid>

                        </Grid>

                    </Toolbar>
                </AppBar>
            </>}

        </Box>


    </div>)
}