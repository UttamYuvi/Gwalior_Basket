import React from "react";
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}



export default function Location(props) {


  return (
    // <div style={{display:'flex',justifyContent:'left',alignItem:'center',width:'100%',background:'#fff',height:'auto',flexWrap:'wrap' }}>

    //     <div style={{ width:'100%' }}>
    //         <ul style={{listStyle:'none',margin:0,padding:'0% 3%',fontSize:'10px',letterSpacing:'1px',fontWeight:'400'}}>                    
    //             <li style={{display:'inline-block',margin:'0px 6px'}} >
    //                 <a style={{textDecoration:'none',color:'#515151'}} href="/home" >HOME</a>

    //             </li>
    //             <span style={{marginTop:'2px'}}><ArrowForwardIosIcon style={{width:'10px',color:'#515151',margin:'-7px 0px'}} /></span>
    //             <li style={{display:'inline-block',margin:'0px 6px'}}>
    //                 <a style={{textDecoration:'none',color:'#515151'}} href="/#" >Frozen Veggies</a>
    //             </li>
    //             <span style={{marginTop:'2px'}}><ArrowForwardIosIcon style={{width:'10px',color:'#515151',margin:'-7px 0px'}} /></span>
    //             <li style={{display:'inline-block',margin:'0px 6px'}}>
    //                 <a style={{textDecoration:'none',color:'#515151'}} href="/#" >Safal Frozen Green Peas</a>
    //             </li>
    //         </ul>
    //     </div >



    // </div>

    <div style={{ display: 'flex', justifyContent: 'left', alignItem: 'center', width: '100%', background: '#fff', height: 'auto', flexWrap: 'wrap' }}>

      <div style={{ width: '100%',paddingLeft:"4%" }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
      </div>
    </div>
  )
}