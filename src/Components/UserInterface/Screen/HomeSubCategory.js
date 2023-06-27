import React, { useEffect, useState } from "react";
import ProductListHeader from "../UserComponents/HeaderProductList";
import Footer from "../UserComponents/Footer";
import { Grid } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { postData, getData } from "../../Services/ServerServices";
import { ServerURL } from "../../Services/ServerServices";
import { useNavigate } from "react-router-dom";

export default function HomeSubCategory(props) {


    const location = useLocation()

    const navigate = useNavigate()


    // var data = location.state.data
    // alert(location)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const [subCategories, setSubCategories] = useState([])
    const [categoryId, setCategoryId] = useState(location.state.categoryid)
    const [categoryname, setCategoryname] = useState(location.state.categoryname)

    const handleClick = (subcategoryid, categoryid) => {
        // alert(subcategoryid)
        navigate(`/ProductsList`, { state: { subcategoryid: subcategoryid, categoryid: categoryid } })

    }

    const fetchAllSubCategory = async () => {
        var body = { categoryid: categoryId, categoryname: categoryname }
        // alert(JSON.stringify(body))
        const result = await postData('userinterface/fetch_all_subcategory', body)
        // alert(JSON.stringify(result.data))
        setSubCategories(result.data)
    }

    useEffect(function () {
        fetchAllSubCategory()
    }, [props.categoryid,props.categoryname])

    function handleSubCategories() {

        return subCategories.map((item) => {

            return (

                <Grid onClick={() => handleClick(item.subcategoryid, item.categoryid)} item xs={12} style={{ display: '-webkit-inline-flex', cursor: 'pointer' }} >

                    <div style={{ display: 'flex', flexDirection: 'column', padding: 25, }}>
                        <div style={{ display: 'flex', padding: 10 }}>
                            <img src={`${ServerURL}/images/${item.icon}`} style={{ width: '180px', height: '180px', borderRadius: 100 }} width={'150px'} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ fontSize: 18, fontWeight: 500, padding: 10 }} >{item.subcategoryname}</div>
                        </div>
                    </div>


                </Grid>
            )
        })
    }

    return (<div >
        <div style={{ width: '100%' }}>
            <ProductListHeader />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: 10, }}>

            <Grid container spacing={2} maxWidth={1300} mx="auto" style={{ display: 'flex', justifyContent: 'center', }} >
                <Grid item xs={10} style={{ display: 'flex', flexDirection: "column" }} >
                    <div style={{display:'flex', justifyContent:'center',marginTop:'3%'}} >
                        <div style={{fontSize:20, fontWeight:500}}>
                                {categoryname}
                            
                        </div>
                    </div>
                    <div style={{}} >
                        {handleSubCategories()}
                    </div>
                </Grid>
            </Grid>

        </div>
        <div style={{ width: '100%' }}>
            <Footer />
        </div>

    </div>)
}