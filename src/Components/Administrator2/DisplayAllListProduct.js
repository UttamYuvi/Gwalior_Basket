import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from '../Services/ServerServices';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,
  TextField,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Switch,
  Select,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from 'sweetalert2';
import { useStyles } from "./DisplayAllCompanyCss"
import { Pending } from '@mui/icons-material';


export default function DisplayAllListProduct(props) {
  var classes = useStyles()
  var navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [productList, setProductList] = useState([])
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

    fetchAllProducts(rowData.categoryid)
    setCompanyId(rowData.companyid)
    setProductListId(rowData.productlistid)
    setCategory(rowData.categoryid)
    setProduct(rowData.productid)
    setWeight(rowData.weight)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setDescription(rowData.description)


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

      fetchAllProductList()
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
        var res = await postData('listproduct/delete_product_list', { productlistid: rowData.productlistid })

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


  const handleCategoryChange = (event) => {

    setCategory(event.target.value)
    fetchAllProducts(event.target.value)

  }

  const fetchAllProducts = async (categoryid) => {
    
    var body = { 'categoryid': categoryid }
    var result = await postData('listproduct/fetch_all_products_by_category', body)
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

  const fetchAllProductList = async () => {
    var result = await getData('listproduct/fetch_all_product_list')
    setProductList(result.data)
  }
  useEffect(function () {
    fetchAllProductList()

  }, [])


  function showAllList() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Product List</span>}
        columns={[
          {
            title: 'Company Name', field: 'companyid',
            render: rowData => <div>{rowData.companyid}</div>
          },

          {
            title: 'Category', field: 'category',
            render: rowData => <div>{rowData.category}</div>
          },
          {
            title: 'Product', field: 'product',
            render: rowData => <div>{rowData.product}</div>
          },
          {
            title: 'Weight',
            render: rowData => <div>{rowData.weight}</div>
          },

          {
            title: 'Price',
            render: rowData => <div><div><s>{rowData.price}</s></div><div>{rowData.offerprice}</div></div>
          },
          {
            title: 'Description',
            render: rowData => <div>{rowData.description}</div>
          },
          {
            title: 'Last Updation', field: 'createdby',
            render: rowData => <div>{rowData.createdat}<br />{rowData.updatedat}<br />{rowData.createdby}</div>
          },


        ]}
        data={productList}

        actions={[
          {
            icon: 'add',
            isFreeAction: true,
            tooltip: 'Add Company',
            onClick: (event) => navigate('/dashboard/listproduct')
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

  return (<div className={classes.mainContainer} style={{ display: 'flex', width: '1120px' }}>
    <div className={classes.box}>
      {showAllList()}
      {showDialog()}
    </div>
  </div>)

}