import React, { useEffect, useState } from "react"
import { useStyles } from "./CompanyCss"; 
import { Grid, TextField, IconButton, Avatar, Button } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import Tooltip from "@mui/material/Tooltip";
import { postData, } from "../Services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";


export default function Category(props) {
    
    var ADMIN=JSON.parse(localStorage.getItem('ADMIN'))

    const [icon, setIcon] = useState({ fileName: '/assets/watermark.png', bytes: '' })

    const [companyId, setCompanyId] = useState(ADMIN.companyid)
    const [categoryname, setCategoryName] = useState('')
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
            formData.append('categoryname', categoryname)
            formData.append('description', description)
            formData.append('icon', icon.bytes)
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')


            var result = await postData('category/add_new_category', formData)
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
        
        setCategoryName('')
        setDescription('')
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
    const validation = () => {

        var isValid = true
        if (!companyId) {
            handleError('companyId', 'Invalid Company Id')
            isValid = false
        }
        if (!categoryname) {
            handleError('categoryname', 'Invalid Category Name')
            isValid = false
        }
        if (!description) {
            handleError('description', 'Invalid Description')
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
                            Category Register
                        </div>
                        <div style={{ cursor: 'pointer' }} >
                            <Tooltip title="List Category">
                                <FormatListBulletedIcon onClick={() => navigate('/displayallcategories')} />
                            </Tooltip>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField inputProps={{readOnly:true}} error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.categoryname ? false : true} helperText={error.categoryname} onFocus={() => handleError('categoryname', null)} value={categoryname} onChange={(event) => setCategoryName(event.target.value)} fullWidth label="Category Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError('description', null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
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
