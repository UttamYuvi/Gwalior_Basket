import React, { useEffect, useState } from "react"
import { useStyles } from "./SubCategoryCss";
import { Grid, TextField, IconButton, Avatar, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import Tooltip from "@mui/material/Tooltip";
import { postData, getData } from "../Services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function SubCategory(props) {
    
    var ADMIN=JSON.parse(localStorage.getItem('ADMIN'))

    const [icon, setIcon] = useState({ fileName: '/assets/watermark.png', bytes: '' })
    const [companyId, setCompanyId] = useState(ADMIN.companyid)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subcategoryId, setSubCategoryId] = useState('')
    const [subcategoryname, setSubCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState({})
    

    var classes = useStyles()
    var navigate = useNavigate()
 
    const handleSubmit = async () => {
        if (validation()) {
            
            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
            var formData = new FormData()
            formData.append('companyid', companyId)
            formData.append('categoryid', categoryId)
            formData.append('subcategoryname', subcategoryname)
            
            formData.append('icon', icon.bytes)
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')


            var result = await postData('subcategory/add_new_subcategory', formData)
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
        setCategoryId('')
        setSubCategoryName('')
        setIcon({
            fileName: "/assets/watermark.png",
            bytes: ""
        })
    }




    const handleImage = (event) => {
        setIcon({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))

    }

    const handleCategoryChange = (event) => {

        setCategoryId(event.target.value)

    }

    useEffect(function(){
        fetchAllCategory()
    },[])
    const fetchAllCategory = async () => {
        //alert('dd')
        const result = await getData('subcategory/fetch_all_category')
        setCategories(result.data)

    }

    const fillCategories = () => {
        return categories.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }


    const validation = () => {

        var isValid = true
        if (! categoryId=="Choose Category...") {
            handleError('categories', 'Select State')
            isValid = false
        }
        if (!subcategoryname) {
            handleError('subcategoryname', 'Invalid SubCategory Name')
            isValid = false
        }
        if (!companyId) {
            handleError('companyId', 'Invalid Company Id')
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
                            Sub Category Register
                        </div>
                        <div style={{ cursor: 'pointer' }} >
                            <Tooltip title="List SubCategory">
                                <FormatListBulletedIcon onClick={() => navigate('/displayallsubcategories')} />
                            </Tooltip>
                        </div>
                    </Grid>
                    <Grid item xs={6} >
                        <TextField inputProps={{readOnly:true}} error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category"
                                onChange={handleCategoryChange}
                                error={!error.category ? false : true} 
                                onFocus={() => handleError("categories", null)} 
                                
                            >
                                <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                                {fillCategories()}
                            </Select>
                            <div style={{padding:5,fontSize:12,color:'red'}}>{error.category}</div>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <TextField error={!error.subcategoryname ? false : true} helperText={error.subcategoryname} onFocus={() => handleError('subcategoryname', null)} value={subcategoryname} onChange={(event) => setSubCategoryName(event.target.value)} fullWidth label="SubCategory Name" variant="outlined" />
                    </Grid>

                    

                    <Grid item xs={6} className={classes.photoStyle}>
                        <IconButton fullWidth color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>

                        <Avatar
                            alt="Remy Sharp"
                            variant="rounded"
                            src={icon.fileName}
                            sx={{ width: 56, height: 56 }}
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
