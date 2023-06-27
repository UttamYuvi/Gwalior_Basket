import React from "react";
import { Grid } from "@material-ui/core";
import GoogleMap from "./GoogleMap";


export default function Login(props) {



    return(<div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <GoogleMap/>
            </Grid>

            <Grid item xs={6}>
            
            </Grid>
        </Grid>
    </div>)

}