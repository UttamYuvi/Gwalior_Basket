import React, { useEffect, useState } from "react"
import { useStyles } from "./DisplayAllSubCategoryCss"
import MaterialTable from "@material-table/core";
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, IconButton, Avatar, FormControl, InputLabel,  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Button, Select } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { getData, postData, ServerURL } from "../Services/ServerServices";
import Swal from "sweetalert2";

export default function DisplayAllSubCategory(props) {

    var navigate = useNavigate()
    var classes = useStyles();

    const [subcategories, setSubCategories] = useState([])
    const [companyId, setCompanyId] = useState('')
    const [subcategoryname, setSubCategoryName] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('')

    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture, setOldPicture] = useState('')
    const [message, setMessage] = useState("")
    const [error, setError] = useState({})

    const [icon, setIcon] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
    });

    const fetchAllSubCategories = async () => {
        const result = await getData('subcategory/fetch_all_subcategory')
        //alert(JSON.stringify(result))
        //console.log('result company', result)
        setSubCategories(result.data)
    }

    useEffect(function () {
        fetchAllSubCategories()
    }, [])

    const handleDelete = async (rowData) => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete this category?',
            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(async (result) => {
            if (result.isConfirmed) {
                var reslt = await postData('subcategory/delete_subcategory', { subcategoryid: rowData.subcategoryid })

                if (reslt.status) {
                    Swal.fire('Deleted!', '', 'Success')
                    fetchAllSubCategories()
                }
                else
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                    })

            }
        })

    }

    const handleOpenDialog = (rowData) => {
        fetchAllCategory()
        setCategoryId(rowData.categoryid)
        setCompanyId(rowData.companyid)
        setSubCategoryName(rowData.subcategoryname)

        setIcon({
            fileName: `${ServerURL}/images/${rowData.icon}`,
            bytes: "",
        })
        setOldPicture(rowData.icon)

        setOpen(true)
    }

    const showTable = () => {
        return (

            <MaterialTable
                title="SubCategories List"
                columns={[
                    {
                        title: 'Company id', field: 'Company Id',
                        render: rowData => <div>{rowData.companyid}</div>
                    },
                    {
                        title: 'Category', field: 'category',
                        render: rowData => <div>{rowData.category}</div>
                    },
                    {
                        title: 'SubCategory', field: 'Subcategory',
                        render: rowData => <div>{rowData.subcategoryname}</div>
                    },
                    {
                        title: 'Last Updation', field: 'createdby',
                        render: rowData => <div>{rowData.createdat}<br />{rowData.updateat}<br />{rowData.createdby}</div>
                    },
                    {
                        title: 'Logo',
                        render: rowData => <div><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, height: 70, borderRadius: '35px' }} variant="rounded" /></div>
                    },
                ]}
                data={subcategories}
                actions={[
                    {
                        icon: 'add',
                        isFreeAction: true,
                        tooltip: 'Add Category',
                        onClick: (event) => navigate('/dashboard/subcategory')

                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    

    const handleEditData = async () => {
        
        // if (validation()) {
            alert('kk')
            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()

            var body = {                
                'companyid': companyId,
                'categoryid': categoryId,
                'subcategoryname': subcategoryname,
                'updateat': dd,
                'createdby': 'ADMIN'
            }

            var result = await postData('subcategory/edit_subcategory', body)
            if (result.status) {
                setOpen(false)
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                })
                fetchAllSubCategories()
            }
            else {
                setOpen(false)
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                })

            }

            
        // }

    }
    const validation = () => {

        var isValid = true
        if (!companyId) {
            handleError('companyId', 'Invalid Company Id')
            isValid = false
        }
        if (!category) {
            handleError('categories', 'Invalid Category Name')
            isValid = false
        }
        if (!subcategoryname) {
            handleError('subcategoryname', 'Invalid SubCategory Name')
            isValid = false
        }
        return isValid
    }

    const handleImage = (event) => {
        setIcon({
            fileName: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0],
        });
        setBtnStatus(true)
    };


    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))

    }
    

    const PictureButton = () => {
        return (<div>
            {btnStatus ? <div style={{ display: 'flex', padding: 10 }}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSaveLogo}>Save</Button>
            </div> : <div style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }} ><img src={`${message}`} width="60" /></div>}
        </div>)

    }

    const handleSaveLogo = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('logo', icon.bytes)
        var result = await postData('category/edit_category_icon', formData)
        if (result.status) {
            setMessage("assets/tick.gif")
        }
        else {
            setMessage("")
        }
        fetchAllSubCategories()
        setBtnStatus(false)

    }

    const handleCancel = () => {
        setIcon({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
        setOldPicture('')
        setBtnStatus(false)
        setMessage('')
    }

    
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

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
    }



    const categoryDialog = () => {
        return (
            <Dialog

                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/logo.png" width="40" />
                        Edit Sub Category
                    </div>
                    <div>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                    </div>
                </DialogTitle>
                <DialogContent >
                    <Grid container spacing={2} style={{ marginTop: 5 }}>
                        <Grid item xs={6} >
                            <TextField error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
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
                                <div style={{ padding: 5, fontSize: 12, color: 'red' }}>{error.category}</div>
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
                            <PictureButton />
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditData} >Edit</Button>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog >
        )
    }


    return (
        <div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }}>
            <div className={classes.box} >

                {showTable()}
                {categoryDialog()}

            </div>
        </div>
    )

}
