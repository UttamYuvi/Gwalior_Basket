import React, { useEffect, useState } from "react"
import { useStyles } from "./DisplayAllCategoryCss"
import MaterialTable from "@material-table/core";
import { useNavigate } from 'react-router-dom';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,
    TextField,
    Grid,
    IconButton,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { getData, postData, ServerURL } from "../Services/ServerServices";
import Swal from "sweetalert2";

export default function DisplayAllCategory(props) {

    var navigate = useNavigate()
    var classes = useStyles();
    
    const [categories, setCategories] = useState([])
    const [companyId, setCompanyId] = useState('')
    const [category, setCategory] = useState('')
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture, setOldPicture] = useState('')
    const [message, setMessage] = useState("")
    const [error, setError] = useState({})

    const [icon, setIcon] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
    });

    const fetchAllCategories = async () => {
        const result = await getData('category/fetch_all_category')
        //alert(JSON.stringify(result))
        //console.log('result company', result)
        setCategories(result.data)
    }

    useEffect(function () {
        fetchAllCategories()
    }, [])

    const handleDelete = async (rowData) => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete this category?',
            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(async (result) => {
            if (result.isConfirmed) {
                var reslt = await postData('category/delete_category', { categoryid: rowData.categoryid })

                if (reslt.status) {
                    Swal.fire('Deleted!', '', 'Success')
                    fetchAllCategories()
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
        setCategoryId(rowData.categoryid)
        setCompanyId(rowData.companyid)
        setCategory(rowData.categoryname)
        setDescription(rowData.description)

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
                title="Categories List"
                columns={[
                    {
                        title: 'Company id', field:'Company Id',
                        render: rowData => <div>{rowData.companyid}</div>
                    },
                    {
                        title: 'Category', field:'Category',
                        render: rowData => <div>{rowData.categoryname}</div>
                    },
                    {
                        title: 'Description', field:'Description',
                        render: rowData => <div>{rowData.description}</div>
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
                data={categories}
                actions={[
                    {
                        icon: 'add',
                        isFreeAction: true,
                        tooltip: 'Add Category',
                        onClick: (event) => navigate('/dashboard/category')

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
        if (validation()) {
            
            var cd = new Date()
            var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()

            var body = {
                'categoryid': categoryId,
                'companyid': companyId,
                'categoryname': category,
                'description': description,
                'updateat': dd,
                'createdby': 'ADMIN'
            }

            var result = await postData('category/edit_category', body)
            if (result.status) {
                setOpen(false)
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                })
            }
            else {
                setOpen(false)
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                })

            }
            
            fetchAllCategories()
        }

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
    const validation = () => {

        var isValid = true
        if (!companyId) {
            handleError('companyId', 'Invalid Company Id')
            isValid = false
        }
        if (!category) {
            handleError('category', 'Invalid Category Name')
            isValid = false
        }
        if (!description) {
            handleError('description', 'Invalid Description')
            isValid = false
        }
        return isValid
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
        fetchAllCategories()
        setBtnStatus(false)

    }

    const handleCancel = () => {
        setIcon({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
        setOldPicture('')
        setBtnStatus(false)
        setMessage('')
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
                        Edit Category
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
                            <TextField error={!error.category ? false : true} helperText={error.category} onFocus={() => handleError('category', null)} value={category} onChange={(event) => setCategory(event.target.value)} fullWidth label="Category" variant="outlined" />
                        </Grid>

                        <Grid item xs={6} >
                            <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError('description', null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                        </Grid>

                        <Grid item xs={6} className={classes.rowStyle}>
                            <IconButton
                                fullWidth
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleImage}
                                />
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
        <div className={classes.mainContainer} style={{display:'flex',width:'1120px'}}>
            <div className={classes.box} >

                {showTable()}
                {categoryDialog()}

            </div>
        </div>
    )

}
