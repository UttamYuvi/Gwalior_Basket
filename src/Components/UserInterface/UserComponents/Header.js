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

import Paper from "@mui/material/Paper";
import { StickyContainer, Sticky } from "react-sticky";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from "react-router-dom";
import HomePageDrawer from "./HomePageDrawer";
import Address from "./Address";
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


export default function Header() {

    const [dialogOpen,setDialogOpen]=useState(false)
    const [addressState,setAddressState]=useState(false)
    const [userData,setUserData]=useState({userid:'',mobileno:''})
    const [refresh,setRefresh]=useState(false)    

    const pageRefresh=()=>{
        // console.log('xxxxxxx userdata....',userdata)
        setRefresh(!refresh)
    
      }

    var products=useSelector((state)=>state.cart)
    var totalproducts=Object.keys(products)
    console.log("totalproductssss",totalproducts)

    var location = useLocation()
    const navigate = useNavigate()

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState(false)
    const handleOpenDrawer = () => {

        setOpen(true)
    }

    const handleCart=()=>{
        navigate('/mycart')
    }

    const handleLogin=()=>{
        setDialogOpen(true)
    }

    return (<div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,211,255,1) 100%)', height: '47px', display: 'flex', justifyContent: 'center' }} >

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LocationOnOutlinedIcon />
                        <span style={{ fontFamily: 'Poppins', marginLeft: 5, fontSize: "16px" }}>Gwalior</span>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>

                    <Button color="inherit" style={{ fontSize: '12px', textTransform: 'capitalize' }} >Offers</Button>
                    <Button color="inherit" style={{ fontSize: '12px', textTransform: 'capitalize' }} >Deals</Button>
                    <Button color="inherit" style={{ fontSize: '12px', textTransform: 'capitalize' }} >Coupons</Button>

                </Toolbar>
            </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1 }} >
            {matches ?
                <AppBar position="relative" style={{ background: '#fff', display: 'flex', justifyContent: 'center' }}  >

                    <Toolbar>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>

                                <Button onClick={handleOpenDrawer}><MenuIcon style={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }} /></Button>
                            </Grid>

                            <Grid item xs={7} style={{ display: 'flex', justifyContent: 'center' }} >
                                <img src="/assets/targetlogo.webp" style={{ width: 45, height: 45 }} />
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', margin: '0px', padding: '0px' }}  >
                                <Button onClick={handleLogin} color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: 'black' }} ><AccountCircleIcon /></Button>
                            </Grid>

                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}  >
                            <Button>
                                    <Badge badgeContent={totalproducts.length} color="primary">
                                        <ShoppingCartIcon onClick={handleCart} size='large'  />
                                    </Badge>
                                </Button>
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
                :
                <AppBar position="relative" style={{ background: '#fff', display: 'flex', justifyContent: 'center', }}  >

                    <Toolbar>

                        <Grid container spacing={2}>

                            <Grid item xs={1} >
                                <img src="/assets/targetlogo.webp" style={{ marginLeft: 20, width: 45, height: 45 }} />
                            </Grid>
                            <Grid item xs={5} style={{ display: 'flex' }}  >

                                <Button color="inherit" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }} >Categories</Button>
                                <Button color="inherit" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }} >Deals</Button>
                                <Button color="inherit" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }} >What's New</Button>
                                <Button color="inherit" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }} >Pickups & Delivery</Button>
                            </Grid>

                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >

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

                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', margin: '0px', padding: '0px' }}  >                                
                                <Button onClick={handleLogin} color="inherit" style={{ fontSize: '14px', textTransform: 'capitalize', color: '#000' }} ><AccountCircleIcon />Sign in</Button>
                            </Grid>

                            <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}  >

                                <Button>
                                    <Badge badgeContent={totalproducts.length} color="primary">
                                        <ShoppingCartIcon onClick={handleCart} size='large'  />
                                    </Badge>
                                </Button>


                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>}


        </Box>

<LoginDialog userData={userData} setUserData={setUserData} setDialogOpen={setDialogOpen} state={dialogOpen} setAddressState={setAddressState} pageRefresh={pageRefresh} />
<Address userData={userData} setUserData={setUserData} setDialogOpen={setDialogOpen} setAddressState={setAddressState} addressState={addressState} pageRefresh={pageRefresh}/>
        <HomePageDrawer open={open} setOpen={setOpen} />
    </div>)
}