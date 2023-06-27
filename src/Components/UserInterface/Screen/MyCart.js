import React,{useState,useEffect} from "react";
import Footer from "../UserComponents/Footer";
import { Grid } from "@mui/material";
import HeaderMyCart from "../UserComponents/HeaderMyCart";
import CartProduct from "../UserComponents/CartProduct";
import CartOffer from "../UserComponents/CartOffer";
import { Button } from "@material-ui/core";
import CartPrice from "../UserComponents/CartPrice";
import CartLeftPart from "../UserComponents/CartLeftPart";
import CartRightPart from "../UserComponents/CartRightPart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


export default function MyCart(props) {

    const [saveMoney, setSaveMoney] = useState("");
   
    const price = () => {      
     let total= values.reduce((a,b) => {
        return  (a+b.price*b.qty)-(a+b.offerprice*b.qty);
      },0);
     
      setSaveMoney(total);
      pageRefresh()
    };

    useEffect(() => {
      price();
    }, [props]);

    const [refresh, setRefresh] = useState(false);
    var product = useSelector(state=>state.cart)
    var values = Object.values(product)
    var keys = Object.keys(product)
    console.log('asdasa',keys.length)
    const pageRefresh=()=>{
        console.log('xxxxxxx userdata....',values)
        setRefresh(!refresh)
    
      }

    const dispatch = useDispatch()

    const handleDelete = () => {
        keys.forEach((key) => {
          dispatch({ type: "DELETE_CART", payload: [key] });
        });
        setRefresh(!refresh);
      };

    // console.log(values)
    return (<div style={{ background: '#d5f8ff',minHeight:'100vh' }} >
        <div style={{ width: '100%' }}>
            <HeaderMyCart />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '3% 10%', }}>
            <Grid container spacing={2} >
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginLeft: '9%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '17px', fontWeight: 630, letterSpacing: 1 }} >
                        Cart ({keys.length} Items)
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px', padding: '0px', background: '#00d3ff', width: '300px', marginLeft: '3%' }}    >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }} >
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 500, lineHeight: '37px' }}  >₹ {saveMoney}</span>
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', marginLeft: '3px' }} >saved on this order</span>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={2}  style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                    <Button onClick={handleDelete} variant="outlined" color="error" style={{marginRight:'1rem', textTransform:'capitalize', color:'red'}}  >Empty Cart</Button>
                    
                </Grid>
            </Grid>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '3% 0%', }}>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'left', width:'99%', }} >
                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'right', marginLeft: '8%',flexWrap:'wrap', padding:'6px',                
                //   background: 'red' 
                 }}>
                    <div style={{ display: 'flex',justifyContent:'right'}} >
                        <CartLeftPart values={values} />
                     </div>
                                        
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'left',flexWrap:'wrap',margin:0, padding:'6px',
                //  background: 'blue' 
                }}>
                    
                    <div style={{ display: 'flex',justifyContent:'left'}} >
                        <CartRightPart values={values} pageRefresh={pageRefresh} />
                    </div>
                    
                </Grid>

                

            </Grid>
        </div>

    </div>)
}