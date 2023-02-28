import React from "react"
import axios from "axios"
import './Product.css'

import { useParams } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Typography from '@mui/material/Typography'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const smallId = createTheme({
	typography: {
		fontSize: 10
	},
 });


export default function Product() {
	const defaultProduct = {
		name: "",
		brand: "",
		price: 0,
		description: "",
		count: 0,
	}
	const defaultIsError = {
		name: false,
		brand: false,
		price: false,
		description: false,
		count: false
	}

	const defaultPopupStatus = {
		success: false,
		error: false
	}
	const { productID } = useParams()

	const [product, setProduct] = React.useState(defaultProduct)
	const [isError, setIsError] = React.useState(defaultIsError)
	const [popup, setPopup] = React.useState(defaultPopupStatus)

	const [openSale, setOpenSale] = React.useState(false)
	const [soldCount, setSoldCount] = React.useState(0)
	const [errorSale, setErrorSale] = React.useState(false)
	const [soldPrice, setSoldPrice] = React.useState(0)
	const [saleDiscount, setSaleDiscount] = React.useState(0)
	const [saleDate, setSaleDate] = React.useState(Date.now())

	React.useEffect( () => {
		const req_params = {
			params: { id: productID }
		}
	
		axios.get("http://localhost:3001/inventory", req_params)
		.then((response) => {
			setProduct(response.data)
			setSoldPrice(response.data.price)
		})
		.catch((err) => {
			console.log(err)
		})

	}, [productID])

	const showSale = () => setOpenSale(true)
	const hideSale = () => setOpenSale(false)

	const isFieldWrong = (potential_errors) => {
		for (const field in potential_errors) {
			if (Object.hasOwnProperty.call(potential_errors, field)) {
				const isWrong = potential_errors[field]
				if (isWrong) {
					setPopup({success: false, error: true})
					return true
				}
			}
		}
		return false
	}

	const updateProduct = () => {

		const potential_errors = defaultIsError
		if (product.name === "" || product.name.length > 65) potential_errors["name"] = true
		if (product.brand === "" || product.name.length > 50) potential_errors["brand"] = true
		if (product.price < 0 || product.price === ""|| isNaN(product.price)) potential_errors["price"] = true
		if (product.description.length > 254) potential_errors["description"] = true
		if (product.count < 0 || product.count === "") potential_errors["count"] = true
		setIsError(potential_errors)

		if (!isFieldWrong(potential_errors)) {
			axios.put("http://localhost:3001/inventory/edit/product", product)
			.then((res) => {
				setPopup({success: true, error: false})
			})
			.catch((err) => {
				console.log(err)
				setPopup({success: false, error: true})
			})
		}
	}

	const updateSoldCount = (e) => {
		const newSoldCount = e.target.value
		if (newSoldCount <= product.count && newSoldCount >=1) setSoldCount(newSoldCount)
	}

	const updateDiscount = (e) => {
		const newDiscount = parseFloat(e.target.value)
		if (
			!isNaN(newDiscount) &&
			newDiscount>=0 &&
			newDiscount<=100
			) {
				setSaleDiscount(newDiscount)
				setSoldPrice( ((100 - newDiscount)*product.price )/100 )
			}
	}

	const recordSale = () => {
		if (isNaN( parseInt(soldCount) ) || soldCount === 0) return setErrorSale(true)

		const sale = {
			sale_price: soldPrice,
			product_id: product.id,
			curr_stock: product.count,
			sold_count: soldCount,
			date: saleDate
		}

		axios.post("http://localhost:3001/sale", sale)
		.then((res) => {
			setPopup({success: true, error: false})
			setErrorSale(false)
			setProduct({...product, count: parseInt(res.data.count)})
			hideSale()
		})
		.catch((err) => {
			console.log(err)
			setPopup({success: false, error: true})
			hideSale()
		})
	}

	return (
		<div>
			<Grid container > 
				<Grid item lg={1}>
						<TextField
							helperText="Name"
							margin="dense"
							value={product.name}
							id="name"
							type="text"
							variant="filled"
							error={isError.name}
							onChange={(e) => setProduct({...product, name: e.target.value})}
						/>
				</Grid>

				<Grid item lg={1}>
					<TextField
						helperText="Brand"
						margin="dense"
						value={product.brand}
						id="brand"
						type="text"
						variant="filled"
						error={isError.brand}
						onChange={(e) => setProduct({...product, brand: e.target.value})}
					/>
				</Grid>

				<Grid item lg={1}>
					<TextField
						helperText="Price (CAD)"
						margin="dense"
						value={product.price}
						id="price"
						type="number"
						variant="filled"
						error={isError.price}
						onChange={(e) => setProduct({...product, price: e.target.value})}
					/>
				</Grid>

				<Grid item lg={1}>
					<TextField
						helperText="Description"
						margin="dense"
						value={product.description}
						id="description"
						type="text"
						fullWidth
						variant="standard"
						error={isError.description}
						onChange={(e) => setProduct({...product, description: e.target.value})}
					/>
				</Grid>

				<Grid item lg={1}>
					<TextField
						helperText="In Stock"
						margin="dense"
						value={product.count}
						id="description"
						type="number"
						variant="standard"
						error={isError.description}
						onChange={(e) => setProduct({...product, count: e.target.value})}
					/>
				</Grid>

			</Grid>
			<Grid container>
				<Grid item xs={1}>
					<Button
							variant="contained"
							onClick={updateProduct}
						>
							Submit
					 </Button>
				</Grid>
				<Grid item xs={1}>
					<Button
							variant="contained"
							onClick={showSale}
						>
							Sale
					 </Button>
				</Grid>
			</Grid>
			<Dialog open={openSale} onClose={hideSale}>
				<DialogTitle>Sale?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Record a sale
					</DialogContentText>

					<Typography>
						{product.name}
					</Typography>

					<ThemeProvider theme={smallId}>
						<Typography >
							{product.id}
						</Typography>
					</ThemeProvider>

					<Typography>
						{`Original Price: ${product.price}CAD`}
					</Typography>

					<Typography>
						Want to add a discount?
					</Typography>

					<TextField
						margin="dense"
						helperText="Discount %"
						value= {saleDiscount}
						type="number"
						variant="filled"
						onChange={ (e) => updateDiscount(e)}
					/>

					<Typography>
						{`Final Price: ${soldPrice}CAD`}
					</Typography>

					<Typography>
						{`x${product.count} in Stock`}
					</Typography>

					<TextField
						margin="dense"
						helperText="# of units sold"
						value= {soldCount}
						error= {errorSale}
						type="number"
						variant="filled"
						onChange={ (e) => updateSoldCount(e)}
					/>

					<Typography>
						Sale date:
					</Typography>

					<TextField
						margin="dense"
						value= {saleDate}
						type="date"
						variant="filled"
						onChange={ (e) => setSaleDate(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={hideSale}>Cancel</Button>
					<Button onClick={recordSale}>Submit</Button>
				</DialogActions>
				</Dialog>
			
			<div>
				{
				popup.error && 
				<Alert
					onClose={() => {setPopup({...popup, error: false})}}
					severity="error">
						
					<AlertTitle>Failure</AlertTitle>
					Could not update. Try again later!
				</Alert>
				}
	
				{
				popup.success && 
				<Alert
					onClose={() => {setPopup({...popup, success: false})}}
					severity="success">
						
					<AlertTitle>Info</AlertTitle>
					Successfully updated database!
				</Alert>
				}
			</div>
		</div>
	)
}