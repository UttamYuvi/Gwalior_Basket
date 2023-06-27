import React, { useEffect, useState } from "react"
import { useStyles } from "./ListProductCss"
import { Grid, TextField, Button } from "@mui/material"

import { DropzoneArea } from "material-ui-dropzone"; 
import { postData } from "../Services/ServerServices";

import Swal from "sweetalert2";

export default function BannerImages(props) {

    const [companyId, setCompanyId] = useState('')
    const [status, setStatus] = useState('true')
    const [images, setImages] = useState({ fileName: '/assets/watermark.png', bytes: '' })


    const [error, setError] = useState({})

    var classes = useStyles()


    const handleSubmit = async () => {
        console.log("xxxxxxxxxxx", error)
        if (validation()) {
            alert(companyId)

            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
            var formData = new FormData()
            formData.append('companyid', companyId)            
            images.map((item, i)=>{
                formData.append('picture'+i,item);
            })
            formData.append('status', status)            
            formData.append('createdat', dd)
            formData.append('updateat', dd)
            formData.append('createdby', 'ADMIN')

            var result = await postData('banners/add_images', formData)
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
        
        return isValid
    }

    return (
        <div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }} >
            <div className={classes.box}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle} >
                        <div className={classes.headingStyle}>
                            Banner Images Register
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
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
