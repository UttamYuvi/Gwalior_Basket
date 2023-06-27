import React from "react";
import ProductListHeader from "../UserComponents/HeaderProductList";
import Footer from "../UserComponents/Footer";
import { Grid } from "@mui/material";
import ProductImageComponent from "../UserComponents/ProductImageComponent";
import ProductDetails from "../UserComponents/ProductDetails";
import AboutProduct from "../UserComponents/AboutProduct";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { useLocation } from "react-router-dom";

export default function Product() {

    const location = useLocation() 

    var product = location.state.data
    var productid=JSON.parse(product).productid
    // alert(productid)

    var data = location.state.data
    // alert(location.state.data)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const images =["2.jpg","3.jpg","4.jpg","Aashirvaad Shudh Chakki Atta.webp"]

    return (<div >
        <div style={{ width: '100%' }}>
            <ProductListHeader />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 10, }}>
            {matches ? <>
                <Grid container spacing={0} >
                    <Grid item xs={11}>
                        <ProductImageComponent productid={productid} />
                    </Grid>

                    <Grid item xs={12}>
                        <ProductDetails  data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <AboutProduct data={data} />
                    </Grid>

                </Grid>

            </> : <>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <ProductImageComponent productid={productid}/>

                        <Grid item xs={12}>
                            <AboutProduct data={data} />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <ProductDetails data={data} />
                    </Grid>

                </Grid>
            </>}
        </div>
        <div style={{ width: '100%' }}>
            <Footer />
        </div>

    </div>)
}