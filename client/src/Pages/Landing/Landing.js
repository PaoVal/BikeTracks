import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {CustomAppBar} from "../../Components/index.js"

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
	backgroundColor: theme.palette.grey[300]
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function CustomizedTables() {
	const navigate = useNavigate()
	const emptyList = []
	const [rows, setRows] = React.useState(emptyList)
	const [open, setOpen] = React.useState(false)
	const [modified, setModified] = React.useState(emptyList)

	const [pName, setPName] = React.useState("")
	const [pBrand, setPBrand] = React.useState("")
	const [price, setPrice] = React.useState("")
	const [pDescription, setPDescription] = React.useState("")

	const [isError, setIsError] = React.useState(false)
	const [priceError, setPriceError] = React.useState(false)
	const [descriptionError, setDescriptionError] = React.useState(false)
	const [isFailedUpdate, setIsFailedUpdate] = React.useState(false)
	const [successUpdateIndicator, setSuccessUpdateIndicator] = React.useState(false)
	const [infoUpdateIndicator, setInfoUpdateIndicator] = React.useState(false)
 
	const handleClose = () => {
	  setOpen(false)
	}
	const handleOpen = () => {
		setOpen(true)
	 }

	React.useEffect( () => {
		const req_params = {
			params: {
				page_num: 0, 
				max_num:10
			}
		}
	
		axios.get("http://localhost:3001/inventory/all", req_params)
		.then((response) => {
			setRows(response.data)
	
		})
		.catch((err) => {
			console.log(err)
		})
	}, [])

	const deleteItem = (index) => {

		const body = {
			data: {
				id: rows[index].id
			}
		}

		axios.delete("http://localhost:3001/inventory", body)
		.then(
			(_) => {
				const updatedRows = rows.filter((r, i) => i !== index)
				setRows(updatedRows)
			}
		)
		.catch((err) => {
			console.log(err)
		})
	}

	const requestStockUpdate = async (requested_updates) => {

		const actual_updates = [...requested_updates]
		for (const index of requested_updates) {

			const body = {
				id: rows[index].id,
				stock: rows[index].count
			}

			try {
				const res = await axios.put("http://localhost:3001/inventory/edit/stock", body)
				actual_updates.shift()

				if (actual_updates.length === 0) {
					setModified([])
					return res.status
				}

			} catch (error) {
				setModified(actual_updates)
				return error.status
			}
		}
	}

	const updateStock = async () => {

		if (modified.length === 0) {
			console.log("no mods made")
			setInfoUpdateIndicator(true)
			setSuccessUpdateIndicator(false)
			setIsFailedUpdate(false)
			return
		}

		const res = await requestStockUpdate(modified)
		if (res === 200) {
			console.log("show success")
			setInfoUpdateIndicator(false)
			setIsFailedUpdate(false)
			setSuccessUpdateIndicator(true)
		}
		else {
			setInfoUpdateIndicator(false)
			setSuccessUpdateIndicator(false)
			setIsFailedUpdate(true)
		}
	}

	const addItem = () => {
		const product = {
			name: pName,
			brand: pBrand,
			price: price,
			description: pDescription
		}

		if (pName === "" || pBrand === "") return setIsError(true)
		if (price < 0 || price === "" || isNaN(price)) return setPriceError(true)
		if (pDescription.length > 254) return setDescriptionError(true)
		
		axios.post("http://localhost:3001/inventory", product)
		.then((res) => {
			const updatedRows = [
				...rows,
				res.data.product,
			]
			setRows(updatedRows)
			setIsError(false)
			setPriceError(false)
			setDescriptionError(false)
		})
		.catch((err) => {
			console.log(err)
			setIsError(true)
			setOpen(true)
		})

		setOpen(false)
	}

	const updateStockView = (event, rownum) => {
		const newStock = parseInt(event.target.value)
		if (newStock < 0 || !Number.isInteger(newStock)) return

		const updatedRows = [...rows]
		updatedRows[rownum] = {...updatedRows[rownum], count: newStock}
		setRows(updatedRows)

		if (!modified.includes(rownum)) setModified([...modified, rownum])
	}

  return (
	<div>
		<CustomAppBar></CustomAppBar>
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 700 }} aria-label="customized table">
			<TableHead>
				<TableRow>
				<StyledTableCell align="left">Name</StyledTableCell>
				<StyledTableCell align="left">Brand&nbsp;(g)</StyledTableCell>
				<StyledTableCell align="left">Price&nbsp;(CAD)</StyledTableCell>
				<StyledTableCell align="left">Stock&nbsp;(units)</StyledTableCell>
				<StyledTableCell align="right">ProductID</StyledTableCell>
				<StyledTableCell align="right"></StyledTableCell>
				</TableRow>
			</TableHead>

			<TableBody> 
				{rows.map((row, i) => (
				<StyledTableRow hover key={row.createdAt}>
					<StyledTableCell
						align="left"
						onClick={() => {navigate(`/inventory/${row.id}`)}}
					>
						{row.name}
					</StyledTableCell>
					<StyledTableCell align="left">{row.brand}</StyledTableCell>
					<StyledTableCell align="left">{row.price}</StyledTableCell>
					<StyledTableCell align="left" width={8}>
						<TextField
							margin="dense"
							id="count"
							value={row.count}
							type="number"
							variant="filled"
							size="small"
							onChange={ (e) => updateStockView(e, i) }
						/>
					</StyledTableCell>
					<StyledTableCell
						align="right"
						component="th"
						scope="row"
						onClick={() => {navigate(`/inventory/${row.id}`)}}
					>
						{row.id}
					</StyledTableCell>

					<StyledTableCell>
                <Grid container>
                  <Grid item lg={3}>
                      <DeleteIcon
                        onClick={deleteItem.bind(this, i)}
                      />
                  </Grid>
                </Grid>
              </StyledTableCell>

				</StyledTableRow>
				))}
			</TableBody>
      </Table>
    </TableContainer>
	 		<div>
			 <Grid container > 
				 <Grid item lg={1}>
					 <Button
						 variant="contained"
						 onClick={handleOpen}
						 endIcon={<AddIcon />}
					 >
						 Add
					 </Button>
 
					 <Dialog open={open} onClose={handleClose}>
					 <DialogTitle>Add Product</DialogTitle>
					 <DialogContent>
						 <DialogContentText>
							 Add a new product to the shop
						 </DialogContentText>
						 <TextField
							 margin="dense"
							 id="name"
							 label="Name"
							 type="text"
							 variant="filled"
							 error={isError}
							 onChange={(e) => setPName(e.target.value)}
						 />
						 <TextField
							 margin="dense"
							 id="brand"
							 label="Brand"
							 type="text"
							 variant="filled"
							 error={isError}
							 onChange={(e) => setPBrand(e.target.value)}
						 />
						 <TextField
							 margin="dense"
							 id="price"
							 label="Price (CAD)"
							 type="number"
							 variant="filled"
							 error={priceError}
							 onChange={(e) => setPrice(e.target.value)}
						 />
						 <TextField
							 autoFocus
							 margin="dense"
							 id="description"
							 label="Description"
							 type="text"
							 fullWidth
							 variant="standard"
							 error={descriptionError}
							 onChange={(e) => setPDescription(e.target.value)}
						 />
					 </DialogContent>
					 <DialogActions>
						 <Button onClick={handleClose}>Cancel</Button>
						 <Button onClick={addItem}>Add</Button>
					 </DialogActions>
					 </Dialog>
 
				 </Grid>
 
				 <Grid item lg={1}>
					 <Button
						 variant="contained"
						 onClick={updateStock}
					 >
						 Submit
					 </Button>
				 </Grid>
			 </Grid>
		 </div>
		 <div>
			 {successUpdateIndicator && 
				 <Alert
				 onClose={() => {setSuccessUpdateIndicator(false)}}
				 severity="success">
 
				 <AlertTitle>Success</AlertTitle>
				 Stock Updated!
			 </Alert>
			 }
			 {isFailedUpdate && 
				 <Alert
				 onClose={() => {setIsFailedUpdate(false)}}
				 severity="error">
					 
				 <AlertTitle>Failure</AlertTitle>
				 Could not update some of your stock. Try again later!
			 </Alert>
			 }
 
			 {infoUpdateIndicator && 
				 <Alert
				 onClose={() => {setInfoUpdateIndicator(false)}}
				 severity="info">
					 
				 <AlertTitle>Info</AlertTitle>
				 You did not update any entries. Interact with the stock column to modify your inventory.
			 </Alert>
			 }
		 </div>
	</div>
  )
}