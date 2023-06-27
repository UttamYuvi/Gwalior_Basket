import React, { useEffect, useState } from "react"
import { useStyles } from "./CompanyCss"
import { Grid, TextField, IconButton, Avatar, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getData, postData, ServerURL } from "../Services/ServerServices";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DropzoneArea } from "material-ui-dropzone"; 


export default function Products(props) {

    var ADMIN=JSON.parse(localStorage.getItem('ADMIN'))

    const [images, setImages] = useState({ fileName: '/assets/watermark.png', bytes: '' })
    const [image, setImage] = useState({ fileName: '/assets/watermark.png', bytes: '' })


    const [categories, setCategories] = useState([])
    const [subcategories, setSubCategories] = useState([])
    const [category, setCategory] = useState('')
    const [companyId, setCompanyId] = useState(ADMIN.companyid)
    const [subcategory, setSubCategory] = useState('')
    const [productName, setProductName] = useState('') 
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [trending, setTrending] = useState('')
    const [deals, setDeals] = useState('')
    const [priceType, setPriceType] = useState('')

    const [error, setError] = useState({})

    var classes = useStyles()


    const fillCategories = () => {
        return categories.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
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
        // alert(event.target.value)
    }

    const fillSubCategories = () => {
        return subcategories.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }
    const handleSubCategoryChange = (event) => {

        setSubCategory(event.target.value)

    }

    const handleStatusChange = (event) => {

        setStatus(event.target.value)

    }

    const fetchAllCategory = async () => {
        //alert('dd')
        const result = await getData('category/fetch_all_category')
        //alert(JSON.stringify(result.data))
        setCategories(result.data)

    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleSubmit = async () => {
        if (validation()) {
            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
            var formData = new FormData()
            formData.append('companyid', companyId)
            formData.append('categoryid', category)
            formData.append('subcategoryid', subcategory)
            formData.append('productname', productName)
            formData.append('description', description)
            formData.append('status', status)
            formData.append('trending', trending)
            formData.append('deals', deals)
            formData.append('pricetype', priceType)
            formData.append('image', image.bytes)
            images.map((item, i)=>{
                formData.append('picture'+i,item);
            })
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')


            var result = await postData('product/add_new_product', formData)
            console.log(result.status)
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
        setCompanyId('')
        setCategory('')
        setProductName('')
        setDescription('')
        setStatus('')
        setPriceType('')
        setImage({
            fileName: "/assets/watermark.png",
            bytes: ""
        })
    }


    const handlePriceChange = (event) => {
        setPriceType(event.target.value)
    }

    const handleImage = (event) => {
        setImage({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleImages = (files) => {
        setImages(files)
    }

    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))

    }
    const validation = () => {
        var isValid = true
        if (!companyId) {
            handleError('companyId', 'Invalid Company')
            isValid = false
        }
        if (!category) {
            handleError('category', 'Invalid Category')
            isValid = false
        }
        if (!subcategory) {
            handleError('subcategory', 'Invalid SubCategory')
            isValid = false
        }
        if (!productName) {
            handleError('productName', 'Invalid Product Name')
            isValid = false
        }
        if (!description) {
            handleError('description', 'Invalid Description')
            isValid = false
        }
        if (!status) {
            handleError('status', 'Invalid Status')
            isValid = false
        }
        if (!priceType) {
            handleError('priceType', 'Invalid Price Type')
            isValid = false
        }
        if (!trending) {
            handleError('trending', 'Invalid Trending')
            isValid = false
        }
        if (!deals) {
            handleError('deals', 'Invalid Deal')
            isValid = false
        }

        return isValid
    }
    return (
        <div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle} >
                        <div><img src="/assets/logo.png" width="40" alt="company logo" /></div>
                        <div className={classes.headingStyle}>
                            Product Registration
                        </div>
                    </Grid>
                    <Grid item xs={6} >
                        <TextField  inputProps={{readOnly:true}} error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
                    </Grid>



                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Categories"
                                onChange={handleCategoryChange}
                                error={!error.category ? false : true}
                                onFocus={() => handleError('category', null)}
                            >
                                <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                                {fillCategories()}
                            </Select>
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

                    <Grid item xs={6} >
                        <TextField error={!error.productName ? false : true} helperText={error.productName} onFocus={() => handleError('productName', null)} value={productName} onChange={(event) => setProductName(event.target.value)} fullWidth label="Product Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError('description', null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Categories"
                                onChange={handleStatusChange}
                                error={!error.status ? false : true}
                                onFocus={() => handleError('status', null)}
                            >

                                <MenuItem onChange={(event) => setTrending(event.target.value)} value={'Available'}>Available</MenuItem>
                                <MenuItem onChange={(event) => setTrending(event.target.value)} value={'Unavilable'}>Unavilable</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>

                        <FormControl error={!error.trending ? false : true}>
                            <FormLabel id="trending">Trending:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="trending"
                                name="trending"
                                value={trending}
                                helperText={error.trending} onFocus={() => handleError("trending", null)}
                                onChange={(event) => setTrending(event.target.value)}

                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={trending === 'yes'} />
                                <FormControlLabel value="no" control={<Radio />} label="No" checked={trending === 'no'} />

                            </RadioGroup>
                            <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.trending}</div>

                        </FormControl>

                    </Grid>

                    <Grid item xs={3}>

                        <FormControl error={!error.deals ? false : true}>
                            <FormLabel id="deals">Deals:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="deals"
                                name="deals"
                                value={deals}
                                helperText={error.deals} onFocus={() => handleError("deals", null)}
                                onChange={(event) => setDeals(event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={deals === 'yes'} />
                                <FormControlLabel value="no" control={<Radio />} label="No" checked={deals === 'no'} />

                            </RadioGroup>
                            <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.deals}</div>
                        </FormControl>

                    </Grid>



                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Price Type</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priceType}
                                label="Price Type"
                                onChange={handlePriceChange}
                                error={!error.priceType ? false : true}
                                onFocus={() => handleError('priceType', null)}
                            >
                                <MenuItem value={'Kg'}>Kg</MenuItem>
                                <MenuItem value={'ml'}>ml</MenuItem>
                                <MenuItem value={'Liter'}>Liter</MenuItem>
                                <MenuItem value={'Pieces'}>Pieces</MenuItem>

                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={6} className={classes.photoStyle}>
                        <IconButton fullWidth color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>

                        <Avatar
                            alt="Remy Sharp"
                            variant="rounded"
                            src={image.fileName}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.photoStyle}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => handleImages(files)}
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
