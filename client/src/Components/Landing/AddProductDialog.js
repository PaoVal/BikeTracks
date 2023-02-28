import React from "react"
import axios from "axios"

import { defaultError, allError, validateProduct, isError } from "../ErrorHandler"

import { Grid } from "@mui/material"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const defaultProduct = {
	name: "",
	brand: "",
	price: 0,
	description: ""
}

export default function AddProductDialog(props) {
	const [product, setProduct] = React.useState(defaultProduct)
	const [error, setError] = React.useState(defaultError)

	const closeDialog = () => props.visibility.set(false)

	const requestAddItem = () => {
		console.log("request add item called")
		axios.post("http://localhost:3001/inventory", product)
		.then((res) => {
			const updatedRows = [
				...props.rows.get,
				res.data.product,
			]
			props.rows.set(updatedRows)
			setError(defaultError)
			props.visibility.set(false)
		})
		.catch((err) => {
			console.log(err)
			setError(allError)
			props.visibility.set(true)
		})
	}

	const addItem = () => {
		const errors = validateProduct(product)
		setError(errors)
		if (isError(errors)) return // if there's been an error, do NOT make a request
		requestAddItem()
	}

	return (
		<Dialog open={props.visibility.get} onClose={closeDialog}>
			<DialogTitle>Add Product</DialogTitle>

			<DialogContent>
				<Grid container>

					<Grid item padding={4}>
						<TextField
							margin="dense"
							id="name"
							label="Name"
							type="text"
							variant="filled"
							error={error.name}
							onChange={(e) => setProduct({...product, name: e.target.value})}
						/>
					</Grid>

					<Grid item padding={4}>
						<TextField
							margin="dense"
							id="brand"
							label="Brand"
							type="text"
							variant="filled"
							error={error.brand}
							onChange={(e) => setProduct({...product, brand: e.target.value})}
						/>
					</Grid>

					<Grid item padding={4}>
						<TextField
							margin="dense"
							id="price"
							label="Price (CAD)"
							type="number"
							variant="filled"
							error={error.price}
							onChange={(e) => setProduct({...product, price: e.target.value})}
						/>
					</Grid>
				</Grid>
				<TextField
					autoFocus
					padding={4}
					margin="dense"
					id="description"
					label="Description"
					type="text"
					fullWidth
					variant="standard"
					error={error.description}
					onChange={(e) => setProduct({...product, description: e.target.value})}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={closeDialog}>Cancel</Button>
				<Button onClick={addItem}>Add</Button>
			</DialogActions>
		</Dialog>

	)
}