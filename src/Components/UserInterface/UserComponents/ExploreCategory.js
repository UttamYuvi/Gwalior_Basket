import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ServerURL, getData } from "../../Services/ServerServices";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import CategoryProducts from "./CategoryProducts";

export default function ExplorCategory() {

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'))
    const sm = useMediaQuery(theme.breakpoints.down('sm'))
    const md = useMediaQuery(theme.breakpoints.down('md'))
    const lg = useMediaQuery(theme.breakpoints.down('lg'))
    const xl = useMediaQuery(theme.breakpoints.down('xl'))

    const [categoryList, setCategoryList] = useState([])

    const navigate = useNavigate()

    const fetchCategories = async () => { 
        var result = await getData("userinterface/fetch_all_category");
        setCategoryList(result.data)
    };
    useEffect(function () {
        fetchCategories();
    }, []);
    const handleClick = (categoryid,categoryname) => {
        
        navigate(`/HomeSubCategory`, { state: { categoryid: categoryid,categoryname: categoryname } })

    }

    function ExplorImage() {
        return categoryList.map((item) => {
            return (
            <div onClick={() => handleClick(item.categoryid, item.categoryname )} >
                <div style={{ padding: 2,  margin: 1, display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                
                <img src={`${ServerURL}/images/${item.icon}`} style={{ width: '65%' }} />
                </div>
            </div>
            )
        })
    }





    return (<div>

        <h3>Explore By Categories</h3>
        <div style={{ padding:2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
            {ExplorImage()}
        </div>

        {/* <CategoryProducts categoryid={categoryid}  /> */}

    </div>)





}