import React, { useEffect, useState } from "react"
import { useStyles } from "./CompanyCss"
import { Grid, TextField, IconButton, Avatar, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getData, postData, ServerURL } from "../Services/ServerServices";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";

export default function Company(props) {

    var ADMIN=JSON.parse(localStorage.getItem('ADMIN'))

    const [showPassword, setShowPassword] = useState(false);
    const [companyLogo, setCompanyLogo] = useState({ fileName: '/assets/watermark.png', bytes: '' })
    const [state, setState] = useState('')
    const [city, setCity] = useState('')

    const [ownerName, setOwnerName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    
    const [error, setError] = useState({})

    var classes = useStyles()

    const fetchAllStates = async () => {
        //alert('dd')
        const result = await getData('statecity/fetch_all_states')
        setStates(result.data)

    }

    useEffect(function () {
        fetchAllStates()
    }, [])

    const fillStates = () => {
        return states.map((item) => {
            return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        })
    }

    const handleStateChange = (event) => {

        setState(event.target.value)
        fetchAllCities(event.target.value)

    }
    const fetchAllCities = async (stateid) => {

        var body = { 'stateid': stateid }
        var result = await postData('statecity/fetch_all_cities', body)
        setCities(result.data)

    }

    const fillCities = () => {
        return cities.map((item) => {
            return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        })
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)

    }

    const handleSubmit = async () => {
        console.log("xxxxxxxxxxx", error)
        if (validation()) {

            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
            var formData = new FormData()
            formData.append('companyname', companyName)
            formData.append('ownername', ownerName)
            formData.append('emailaddress', emailAddress)
            formData.append('mobilenumber', mobileNumber)
            formData.append('address', address)
            formData.append('state', state)
            formData.append('city', city)
            formData.append('password', password)
            formData.append('logo', companyLogo.bytes)
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')
            formData.append('status', 'Pending')

            var result = await postData('company/add_new_company', formData)
            if (result.status) {
                Swal.fire({
                    icon: 'success',
                    title: result.message,

                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                })

            }
            handleReset()
        }

    }


    const handleReset = () => {
        setCompanyName('')
        setOwnerName('')
        setEmailAddress('')
        setMobileNumber('')
        setAddress('')
        setPassword('')
        setState('Choose State...')
        setCity('Choose City...')
        setCompanyLogo({
            fileName: "/assets/watermark.png",
            bytes: ""
        })
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleImage = (event) => {
        setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))

    }
    const validation = () => {
        var isValid = true
        if (!companyName) {
            handleError('companyName', 'Invalid Company Name')
            isValid = false
        }
        if (!ownerName) {
            handleError('ownerName', 'Invalid Owner Name')
            isValid = false
        }
        if (!emailAddress) {
            handleError('emailAddress', 'Invalid Email Address')
            isValid = false
        }
        if (!mobileNumber || !(/^[0-9]{10}$/.test(mobileNumber))) {
            handleError('mobileNumber', 'Invalid Mobile Number')
            isValid = false
        }
        if (!address) {
            handleError('address', 'Invalid Address')
            isValid = false
        }

        if (!address || state=="Choose State...") {
            handleError('state', 'Select State')
            isValid = false
        }
        if (!address || city=="Choose City...") {
            handleError('city', 'Select City')
            isValid = false
        }
        if (!password ) {
            handleError('password', 'Invalid Password')
            isValid = false
        }

        return isValid
    }
    return (
        <div className={classes.mainContainer}  style={{display:'flex',width:'1120px'}}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle} >
                        <div><img src="/assets/logo.png" width="40" alt="company logo" /></div>
                        <div className={classes.headingStyle}>
                            Company Registration
                        </div>
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            error={!error.companyName ? false : true}
                            label="Company Name"
                            helperText={error.companyName}
                            onFocus={() => handleError('companyName', null)}
                            value={companyName}
                            onChange={(event) => setCompanyName(event.target.value)}
                            fullWidth

                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.ownerName ? false : true} helperText={error.ownerName} onFocus={() => handleError('ownerName', null)} value={ownerName} onChange={(event) => setOwnerName(event.target.value)} fullWidth label="Owner Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField error={!error.emailAddress ? false : true} helperText={error.emailAddress} onFocus={() => handleError("emailAddress", null)} value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} fullWidth label="Email Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.mobileNumber ? false : true} helperText={error.mobileNumber} onFocus={() => handleError("mobileNumber", null)} value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} fullWidth label="Mobile Number" variant="outlined" />
                    </Grid>
 
                    <Grid item xs={12} >
                        <TextField  error={!error.address ? false : true} helperText={error.address} onFocus={() => handleError("address", null)} value={address} onChange={(event) => setAddress(event.target.value)} fullWidth label="Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                label="State"
                                onChange={handleStateChange}
                                error={!error.state ? false : true} 
                                onFocus={() => handleError("state", null)} 
                                
                            >
                                <MenuItem value={'Choose State...'}>Choose State...</MenuItem>
                                {fillStates()}
                            </Select>
                            <div style={{padding:5,fontSize:12,color:'red'}}>{error.state}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="City"
                                onChange={handleCityChange}
                                error={!error.city ? false : true} 
                                onFocus={() => handleError("city", null)} 
                            >
                                <MenuItem value={'Choose City...'}>Choose City...</MenuItem>
                                {fillCities()}
                            </Select>
                            <div style={{padding:5,fontSize:12,color:'red'}}>{error.city}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.photoStyle}>
                        <IconButton fullWidth color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>

                        <Avatar
                            alt="Remy Sharp"
                            variant="rounded"
                            src={companyLogo.fileName}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                value={password}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(event) => setPassword(event.target.value)}
                                error={!error.password ? false : true} 
                                onFocus={() => handleError("password", null)} 
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>


                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained" >Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleReset} fullWidth variant="contained" >Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}
