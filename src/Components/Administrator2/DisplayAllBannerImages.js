import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from '../Services/ServerServices';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,
  TextField,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useStyles } from "./DisplayAllCompanyCss"


export default function DisplayAllBannerImages(props) {
  var classes = useStyles()
  var navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [bannerimages, setBannerImages] = useState([])
  const [productListId, setProductListId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState({ fileName: '/assets/watermark.png', bytes: '' })

  const [error, setError] = useState({})
  const [open, setOpen] = useState(false)


  const handleOpenDialog = (rowData) => {

    setCompanyId(rowData.companyid)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditData = async () => {

    if (validation()) {
      var cd = new Date()
      var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()

      var body = {
        'companyid': companyId,

        'updateat': dd,
        'createdby': 'ADMIN',

      }
      var result = await postData('', body)

      if (result.status) {
        setOpen(false)
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
      fetchAllBannerImages()
    }
  }


  const handleDelete = async (rowData) => {


    setOpen(false)
    Swal.fire({
      title: 'Do you want to delete company?',

      showCancelButton: true,
      confirmButtonText: 'Delete',

    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var res = await postData('listproduct/delete_product_list', { companyid: rowData.productlistid })

        if (res.status) {
          Swal.fire('Deleted!', '', 'Success')
          //fetchAllCompanies()
        }
        else
          Swal.fire({
            icon: 'error',
            title: result.message,
          })

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })




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

  

  const showDialog = () => {
    return (
      <div>
        <Dialog

          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/logo.png" width="40" />
              Edit Product List
            </div>
            <div>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={2} style={{marginTop:5}} >
              <Grid item xs={6}>
                <TextField error={!error.companyId ? false : true} helperText={error.companyId} onFocus={() => handleError('companyId', null)} value={companyId} onChange={(event) => setCompanyId(event.target.value)} fullWidth label="Company Id" variant="outlined" />
              </Grid>
              
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData} >Edit</Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const fetchAllBannerImages = async () => {
    var result = await getData('banners/fetch_all_banner_images')
    setBannerImages(result.data)
  }
  useEffect(function () {
    fetchAllBannerImages()

  }, [])


  function showAllList() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Banner Images List</span>}
        columns={[
          {
            title: 'Company Name', field: 'companyid',
            render: rowData => <div>{rowData.companyid}</div>
          },
          {
            title: 'Banner Images', field: 'bannerpicture',
            render: rowData => <div>{rowData.bannerpicture}</div>
          },
          {
            title: 'Last Updation', field: 'createdby',
            render: rowData => <div>{rowData.createdat}<br />{rowData.updatedat}<br />{rowData.createdby}</div>
          },


        ]}
        data={bannerimages}

        actions={[
          {
            icon: 'add',
            isFreeAction: true,
            tooltip: 'Add Banner Images',
            onClick: (event) => navigate('/dashboard/bannerimages')
          },
          {
            icon: 'edit',
            tooltip: 'Edit Banner Images',
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

  return (<div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }}>
    <div className={classes.box}>
      {showAllList()}
      {showDialog()}
    </div>
  </div>)

}