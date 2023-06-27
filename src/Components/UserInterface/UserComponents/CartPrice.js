import React,{useState,useEffect }from "react";
import { Grid,Divider } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";

export default function CartPrice(props) {
    console.log("asdfghjkl..",props.data)
    const [totalPrice, setTotalPrice] = useState("");
   
    const price = () => {      
     let total= props.data.reduce((a,b) => {
        return  a+b.offerprice*b.qty;
      },0);
     
      setTotalPrice(total);
      props.pageRefresh()
    };

    useEffect(() => {
      price();
    }, [props]);

    return (<div style={{ display: "flex", justifyContent: 'left', flexWrap: 'wrap', width: "100%", height: 'auto' }} >
        <Paper elevation={3} style={{ display: 'flex', width: '80%' }} >
            <Grid container spacing={2} style={{ margin: 0, padding: 0 }} >
                <Grid item xs={11} bgcolor="white"  mx="auto" lineHeight={1.5} style={{padding:10, fontSize:15}} >
                    <div>
                        <b>Items Total</b>
                        <b style={{ float: "right" }}>&#8377; {totalPrice}</b>
                    </div>
                    <div>
                        <span>Handling Charge</span>
                        <span style={{ float: "right" }}>&#8377; 15</span>
                    </div>
                    <div>
                        <span>Delivery Fee</span>
                        <span style={{ float: "right" }}>&#8377; 40</span>
                    </div>
                    <Divider sx={{ my: 1 }} />
                    <div>
                        <b>Total Fee</b>
                        <b style={{ float: "right" }}>&#8377; {totalPrice+55}</b>
                    </div>
                </Grid>
            </Grid>
        </Paper>


    </div>)

}