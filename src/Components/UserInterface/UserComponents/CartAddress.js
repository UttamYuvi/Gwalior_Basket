import React, { useState } from "react";
import { ServerURL } from "../../Services/ServerServices";
import { Grid,Divider, dialogActionsClasses } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoginDialog from "./LoginDialog";
import Address from './Address'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartAddress(props) {

    const [dialogOpen,setDialogOpen]=useState(false)
    const [addressState,setAddressState]=useState(false)
    const [btnMsg,setBtnMsg]=useState("Add Address to Proceed")
    const navigate = useNavigate()

    var userdata=null
    try {
        var user=useSelector((state)=>state.user)
        userdata=Object.values(user)[0]

    } catch (error) {
        console.log('errror try catch',error)
    }
    console.log("userdata...:",userdata==undefined)
    
    var cart=useSelector((state)=>state.cart)
    var keys=Object.keys(cart)

    const [userData,setUserData]=useState({userid:'',mobileno:''})
    const [refresh,setRefresh]=useState(false)    

    const handleClick=()=>{
        
        if(btnMsg=='Make Payment')
        navigate('/makepayment')
        else
        setDialogOpen(true)
    }
    

    const pageRefresh=()=>{
        console.log('xxxxxxx userdata....',userdata)
        setRefresh(!refresh)
    
      }

    return (<div style={{ display: "flex", justifyContent: 'left', flexWrap: 'wrap', width: "100%", height: 'auto' }} >
        <Paper elevation={3} style={{ display: 'flex', width: '80%' }} >
            <Grid container spacing={2} style={{ margin: 0, padding: 0 }} >
                <Grid item xs={11} bgcolor="white"  mx="auto" lineHeight={1.5} style={{padding:10, fontSize:15,display:'flex', justifyContent:'center', flexDirection:"column"}} >
                    <div style={{display:'flex', justifyContent:'center'}} >
                    <span>
                        <LocationOnIcon style={{fontSize:30, color:'red'}}/>
                    </span>
                    <span style={{display:'flex',marginTop:'4px'}} >
                        Enter your delivery address
                    </span>                    
                    </div>
                    <div style={{display:'flex', justifyContent:'center',flexDirection:"column",fontSize:13,fontWeight:400,margin:10 }} >
                        {userdata!=undefined?<>
                            <div style={{display:'flex'}} >{userdata[0]?.state}, {userdata[0]?.city}</div>
                            <div style={{display:'flex',flexDirection:'column'}} >
                        <div style={{display:'flex'}} >{userdata[0]?.address}  </div> 
                        <div style={{display:'flex',fontWeight:600}} >{userdata[0]?.zipcode}</div>
                        </div>
                        </>:<></>}
                        
                    </div>
                    <div style={{display:'flex', justifyContent:'center', }} >
                        {keys.length==0?<>
                            <Button disabled='true' onClick={handleClick} variant="contained" fullWidth>{btnMsg}</Button>
                        </>:<>
                        <Button onClick={handleClick} variant="contained" fullWidth>{btnMsg}</Button>
                        </>}
                        
                    </div>
                </Grid>

            </Grid>
        </Paper>
        <LoginDialog setBtnMsg={setBtnMsg}  userData={userData} setUserData={setUserData} setDialogOpen={setDialogOpen} state={dialogOpen} setAddressState={setAddressState} pageRefresh={pageRefresh} />
        <Address setBtnMsg={setBtnMsg} userData={userData} setUserData={setUserData} setDialogOpen={setDialogOpen} setAddressState={setAddressState} addressState={addressState} pageRefresh={pageRefresh}/>

    </div>)

}