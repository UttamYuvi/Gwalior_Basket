import React, { useEffect, useState } from "react"
import { useStyles } from "./ListProductCss"
import { Grid, TextField, IconButton, Avatar, FormControl, InputLabel, Button } from "@mui/material"

import { DropzoneArea } from "material-ui-dropzone"; 
import { getData, postData, ServerURL } from "../Services/ServerServices";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";

export default function ListProduct(props) {

    var ADMIN=JSON.parse(localStorage.getItem('ADMIN'))

    const [categories, setCategories] = useState([])
    const [subcategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])

    const [companyId, setCompanyId] = useState(ADMIN.companyid)
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [product, setProduct] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState({ fileName: '/assets/watermark.png', bytes: '' })


    const [error, setError] = useState({})

    var classes = useStyles()

    const fetchAllCategories = async () => {
        //alert('dd')
        const result = await getData('listproduct/fetch_all_category')

        setCategories(result.data)

    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const fillCategories = () => {
        return categories.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        }) 
    }

    const handleSubCategoryChange = (event) => {

        setSubCategory(event.target.value)
        fetchAllProducts(event.target.value)
    }

    const fillSubCategories = () => {
        return subcategories.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const fetchAllSubCategory = async (categoryid) => {
        var body = { 'categoryid': categoryid }
        const result = await postData('subcategory/fetch_all_subcategory',body)
        //alert(JSON.stringify(result.data))
        setSubCategories(result.data)

    }

    const handleCategoryChange = (event) => {

        setCategory(event.target.value)
        fetchAllSubCategory(event.target.value)

    }

    const fetchAllProducts = async (subcategoryid) => {
        //alert('dd')
        var body = { 'subcategoryid': subcategoryid }
        var result = await postData('listproduct/fetch_all_products_by_subcategory', body)
        setProducts(result.data)

    }

    const fillProduct = () => {
        return products.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const handleProductChange = (event) => {
        setProduct(event.target.value)

    }

    const handleSubmit = async () => {
        console.log("xxxxxxxxxxx", error)
        if (validation()) {
            alert(companyId)

            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
            var formData = new FormData()
            formData.append('companyid', companyId)
            formData.append('categoryid', category)
            formData.append('subcategoryid', subcategory)
            formData.append('productid', product)
            formData.append('weight', weight)
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('description', description)
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')
            images.map((item, i)=>{
                formData.append('picture'+i,item);
            })

            var result = await postData('listproduct/add_list_product', formData)
            if (result.status) {
                Swal.fire({
                    icon: 'success',
                    title: result.message,

                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                })

            }
            handleReset()
        }

    }


    const handleReset = () => {

        setCategory('Choose Category...')
        setProduct('Choose Product...')
        setWeight('')
        setCompanyId('')
        setPrice('')
        setOfferPrice('')
        setDescription('')
        
    }


    const handleImage = (files) => {
        setImages(files)
    }

    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))

    }
    const validation = () => {
        var isValid = true
        if (!companyId) {
            handleError('companyId', 'Invalid Company Id')
            isValid = false
        }
        if (!category) {
            handleError('categories', 'Invalid Categories')
            isValid = false
        }
        if (!product) {
            handleError('products', 'Invalid Products')
            isValid = false
        }
        if (!weight) {
            handleError('weight', 'Invalid Weight')
            isValid = false
        }
        if (!price) {
            handleError('price', 'Invalid Price')
            isValid = false
        }
        if (!offerPrice) {
            handleError('offerPrice', 'Invalid Offer Price')
            isValid = false
        }
        if (!description) {
            handleError('description', 'Invalid Description')
            isValid = false
        }

        return isValid
    }

    return (
        <div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }} >
            <div className={classes.box}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle} >
                        <div className={classes.headingStyle}>
                            List Product Registration
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField inputProps={{readOnly:true}} error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={handleCategoryChange}
                                error={!error.categories ? false : true}
                                onFocus={() => handleError("categories", null)}

                            >
                                <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                                {fillCategories()}
                            </Select>
                            <div style={{ padding: 5, fontSize: 12, color: 'red' }}>{error.categories}</div>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">SubCategories</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subcategory}
                                label="SubCategories"
                                onChange={handleSubCategoryChange}
                                error={!error.subcategory ? false : true}
                                onFocus={() => handleError('subcategory', null)}
                            >
                                <MenuItem value={'Choose SubCategory...'}>Choose SubCategory...</MenuItem>
                                {fillSubCategories()}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={product}
                                label="Product"
                                onChange={handleProductChange}
                                error={!error.products ? false : true}
                                onFocus={() => handleError("products", null)}

                            >
                                <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
                                {fillProduct()}
                            </Select>
                            <div style={{ padding: 5, fontSize: 12, color: 'red' }}>{error.products}</div>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField error={!error.weight ? false : true} helperText={error.weight} onFocus={() => handleError('weight', null)} value={weight} onChange={(event) => setWeight(event.target.value)} fullWidth label="Weight" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.price ? false : true} helperText={error.price} onFocus={() => handleError('price', null)} value={price} onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.offerPrice ? false : true} helperText={error.offerPrice} onFocus={() => handleError('offer price', null)} value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError('description', null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} className={classes.photoStyle}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => handleImage(files)}
                            filesLimit={6}
                            
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained" >Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleReset} fullWidth variant="contained" >Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )

}
