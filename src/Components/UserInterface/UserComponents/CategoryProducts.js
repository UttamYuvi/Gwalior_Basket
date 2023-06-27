import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../../Services/ServerServices";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function CategoryProducts(props) {

    // alert(props.categoryid)
    let location = useLocation()
    const dispatch = useDispatch()

    console.log("LOCATION:", location)
    const matches = useMediaQuery("(max-width:600px)");
    const [tabIdx, setTabIdx] = useState(""); // to highlight selected category

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    const [products, setProducts] = useState([]);
    const [subcategoryId, setSubCategoryId] = useState(location.state.subcategoryid);

    async function getSubCategories() {
        let result = await getData("userinterface/fetch_all_subcategory");

        setSubCategories(result.data);

    }

    useEffect(() => {

        getSubCategories();
    }, [props.categoryid]);

    async function getProducts() {
        let result = await postData("userinterface/fetch_products", { subcategoryid: subcategoryId });
        setProducts(result.data);
    }

    useEffect(() => {

        getProducts();
    }, [subcategoryId]);

    const displaySubCategory = () => {
        return subcategories.map((item, i) => {

            return (
                <Box
                    onClick={() => {
                        setTabIdx(i);
                        setSubCategoryId(item.subcategoryid);
                    }}
                    key={i}
                    sx={{ cursor: "pointer" }}
                    display="flex"
                    mb={0.5}
                    flexDirection="column"
                    borderRadius={1}
                    bgcolor={tabIdx == i && "#d1e6ff"}>
                    <Box display="flex" gap={1} fontFamily="arial" textAlign="center" alignItems="center" justifyContent="left" fontSize={matches ? 13 : 15} p={1.5} flexDirection={matches ? "column" : "row"}>
                        <Avatar alt="Logo" variant="circular" src={`${ServerURL}/images/${item.icon}`} sx={{ width: 50, height: 50 }} />
                        <p style={{ margin: matches && 0, textDecoration: "none" }}>{item.subcategoryname}</p>
                    </Box>
                </Box>
            );
        })
    }

    const handleCart=(item)=>{

        dispatch({type:'ADD_CART',payload:[item.productid,item]})
    }

    const showProducts = () => {

        return products.map((item, i) => {
            return (
                <Grid key={i} item xs={6} md={2.8} style={{ height: matches ? 240 : 300 }}>
                    <Card sx={{ border: "1px solid #ced4d6", height: "100%", width: "100%", boxShadow: "none", cursor: "pointer" }}>
                        <div style={{ height: "45%", marginTop: 10 }}>
                            <img src={`${ServerURL}/images/${item.image}`} alt="product" style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                        </div>
                        <CardContent sx={{ p: matches ? "2px 2px 2px 4px" : "",  height:'18%' }}>
                            <Typography gutterBottom variant="h5" sx={{ fontWeight: 600, fontSize: "0.86rem" }}>
                                {item.productname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {"750 g"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div style={{ fontSize: 15, marginRight: "auto", padding: "0 2px" }}>
                                <s style={{ color: "gray", display: "block", fontSize: 12 }}> &#x20B9; {299}</s>
                                <b> &#x20B9; {199}</b>
                            </div>
                            <Button onClick={()=>handleCart(item)} size="small" variant="outlined" style={{color:'#00d3ff'}}  >
                                Add
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        })
    }




    return (
        <>
            <Grid container maxWidth={1300} mx="auto">

                {/* Left Part */}
                <Grid item xs={2} position="sticky" top={0} overflow="auto" maxHeight="100vh" borderRight="1px solid #ced4d6" style={{display:'flex', flexDirection:'column'}} >
                    {displaySubCategory()}
                </Grid>

                {/* Right Part */}
                <Grid item xs={10} py={2} container spacing={matches ? 1 : 2} overflow="hidden" justifyContent="center">
                    {showProducts()}
                </Grid>
            </Grid>
        </>
    );
};


