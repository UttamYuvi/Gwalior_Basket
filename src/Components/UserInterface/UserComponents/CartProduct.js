import React from "react";
import { ServerURL } from "../../Services/ServerServices";
import { Grid, Divider } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartProduct() {

    // alert(JSON.stringify(props.values)) 
    // console.log(values)

    var cart=useSelector(state=>state.cart)
    var values = Object.values(cart)

    const navigate = useNavigate()
    const handleCart=()=>{
        navigate('/home')
    }

    const showCartProduct = () => {
        return values.map((item) => {
            return (
                <Grid container spacing={2} style={{ display: 'flex', padding: '0px' }} >
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} >
                        <img src={`${ServerURL}/images/${item.image}`} alt='ss' style={{ display: 'flex', justifyContent: 'left', width: '70px', margin: '12px 29px', padding: '10px' }} />

                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-start', padding: '17px 0px', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 500, fontSize: '14px', }} >{item.productname}</div>
                        <div style={{ fontWeight: 400, fontSize: '12px', color: 'grey' }} > {item.weight}</div>
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                            <div style={{ display: 'flex', fontWeight: 500, fontSize: '14px', }} >
                                &#8377; {item.offerprice}
                            </div>
                            <div style={{ display: 'flex', fontWeight: 400, fontSize: '12px', color: 'grey', paddingTop: 2, paddingLeft: 5, }} >
                                <s>&#8377; {item.price}</s>
                            </div>

                        </div>

                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button size="small" variant="outlined" style={{ color: '#00d3ff' }}>
                            Add
                        </Button>

                    </Grid>
                    <Divider sx={{ my: 1 }} />
                </Grid>
            )
        })
    }

    return (<div style={{ display: "flex", justifyContent: 'right', flexWrap: 'wrap', width: "84%", height: 'auto' }} >
        <Paper elevation={3} style={{ display: 'flex', width: '100%', flexWrap: 'wrap', }} >
            {/* {showCartProduct()} */}
            {/* <Divider variant="fullWidth" style={{ display: 'flex', textAlign: 'center', height: '30px', color: '#000', marginTop: '8px', backgroundColor: '#fff' }}  /> */}

            {values.length == 0 ? <>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0% 0% 0% 0%',width:'100%',flexDirection:'column' }} >
                    <div  style={{display:'flex',justifyContent:'center'}} >
                        <img src='assets/emp_empty_cart.webp' alt='empty' style={{ width: '200px' }} />
                    </div>
                    <div  style={{display:'flex',justifyContent:'center',margin:5,fontSize:'18px',fontWeight:700}}>
                    You don't have any items in your cart
                    </div>
                    <div  style={{display:'flex',justifyContent:'center',margin:5,fontSize:15,fontWeight:400}}>
                    Your favourite items are just a click away
                    </div>
                    <div style={{display:'flex',justifyContent:'center',margin:'5px 10px 30px'}}>
                        <Button onClick={handleCart} variant="contained" style={{textTransform:"capitalize",padding:'5px 25px'}} >Start Shopping</Button>
                    </div>
                </div>
            </> : values.map((item) => {
                return (
                    <Grid container spacing={2} style={{ display: 'flex', padding: '0px' }} >
                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} >
                            <img src={`${ServerURL}/images/${item.image}`} alt='ss' style={{ display: 'flex', justifyContent: 'left', width: '70px', margin: '12px 29px', padding: '10px' }} />

                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-start', padding: '17px 0px', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 500, fontSize: '14px', }} >{item.productname}</div>
                            <div style={{ fontWeight: 400, fontSize: '12px', color: 'grey' }} > {item.weight}</div>
                            <div style={{ display: 'flex', flexDirection: 'row' }} >
                                <div style={{ display: 'flex', fontWeight: 500, fontSize: '14px', }} >
                                    &#8377; {item.offerprice}
                                </div>
                                <div style={{ display: 'flex', fontWeight: 400, fontSize: '12px', color: 'grey', paddingTop: 2, paddingLeft: 5, }} >
                                    <s>&#8377; {item.price}</s>
                                </div>

                            </div>

                        </Grid>
                        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button size="small" variant="outlined" style={{ color: '#00d3ff' }}>
                                Add
                            </Button>

                        </Grid>
                        <Divider sx={{ my: 1 }} />
                    </Grid>
                )
            })}
        </Paper>




    </div>)
}