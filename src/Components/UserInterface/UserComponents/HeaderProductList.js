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

import Divider from '@mui/material/Divider';

import HomePageDrawer from "./HomePageDrawer";
import LoginDialog from "./LoginDialog";
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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


export default function HeaderProductList() {

    const navigate = useNavigate();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)

    const products=useSelector((state=>state.cart))
    var totalproducts=Object.keys(products)

    const handleOpenDrawer = () => {

        setOpen(true)
    }

    const handleLogin=()=>{
        setLoginOpen(true)
    }

    return (<div>
        <Box sx={{ flexGrow: 1 }}>
            {matches ? <>

                <AppBar position="relative" style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,211,255,1) 100%)', display: 'flex', justifyContent: 'center' }} >

                    <Toolbar>
                        <Grid container spacing={2}>

                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '0px', padding: '0px' }}  >
                                <Button color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff', paddingTop: '10px' }} >Darpan Colony</Button>
                            </Grid>

                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >

                                <Button  color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff', paddingTop: '10px' }} ><AccountCircleIcon size="large" /></Button>
                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2%' }}  >

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

                        </Grid>
                    </Toolbar>
                </AppBar>

            </> : <>

                <AppBar position="relative" style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,211,255,1) 100%)', display: 'flex', justifyContent: 'center', }} >

                    <Toolbar>
                        <Grid container spacing={2}>

                            <Grid item xs={1} >
                                <img src="/assets/targetlogo.webp" style={{ marginLeft: 20, width: 45, height: 45 }} />
                            </Grid>
                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center' }} >
                                <Divider orientation="vertical" style={{ display: 'flex', textAlign: 'center', height: '30px', color: '#fff', marginTop: '8px', backgroundColor: '#fff' }} />
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >
                                <Button color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', }} >Darpan Colony</Button>
                            </Grid>

                            <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >

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

                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', margin: '0px', padding: '0px' }}  >

                                <Button onClick={handleLogin} color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff' }} ><AccountCircleIcon style={{ marginRight: 5 }} />Login</Button>
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}  >
                                <div onClick={() => navigate("/mycart")} >
                                <Button color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#fff' }} >
                                    <Badge badgeContent={totalproducts.length} color="primary">
                                        <ShoppingCartIcon size='large' style={{ marginRight: 5 }} />My Cart
                                    </Badge>
                                </Button>
                                </div>

                            </Grid>

                        </Grid>

                    </Toolbar>
                </AppBar>
            </>}

        </Box>

        <LoginDialog loginOpen={loginOpen} />
        <HomePageDrawer open={open} />
    </div>)
}