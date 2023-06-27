import React, { useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function AboutProduct(props) {

    var data = JSON.parse(props.data)

    const [state, setState]=useState(false)

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
            {matches?<>
            <div onClick={() => setState(!state)} style={{ display:'flex',width: '100%',  margin: '3% 3% 1%', fontWeight:500, cursor:'pointer' }}>
                <div style={{display:'flex', flexGrow:1}} >
                About Product
                </div>
                <div style={{display:'flex', marginRight:'4%'}}>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>
            {state?<div style={{ width: '100%', margin: '0%',color:'#b2bec3', fontSize:'12px' }} >
                <ul>
                    <li>Description : {data.description}</li>
                    <li>Country of Origin : India</li>
                    <li>Shelf Life : 12 months</li>
                    <li>Ingredients : Peas</li>
                    <li>Manufacturer Name : Mother Dairy Fruit & Vegetable Pvt Ltd</li>
                    <li>Manufacturer Address : Mother Dairy Fruit & Vegetable Pvt Ltd, Fruit And Vegetable Unit, Mangolpuri, Industrial Area, Phase 1, Delhi -110083.</li>
                </ul>
                
            </div>:<></>}

            </>:<>
            
            <div style={{ width: '100%',  margin: '3% 3% 1%', fontWeight:500,  }}>
                About Product
            </div>
            <div style={{ width: '100%', margin: '0%',color:'#b2bec3' }} >
                <ul>
                    <li>Description : {data.description}</li>
                    <li>Country of Origin : India</li>
                    <li>Shelf Life : 12 months</li>
                    <li>Ingredients : Peas</li>
                    <li>Manufacturer Name : Mother Dairy Fruit & Vegetable Pvt Ltd</li>
                    <li>Manufacturer Address : Mother Dairy Fruit & Vegetable Pvt Ltd, Fruit And Vegetable Unit, Mangolpuri, Industrial Area, Phase 1, Delhi -110083.</li>
                </ul>
                
            </div>
            </>}
        </div >



    )
}