import React from "react"
import axios from "axios"
import './Product.css'

import { useParams } from 'react-router-dom'

import Grid from '@mui/material/Grid'

import {
	defaultError,
	validateProduct,
	isError
} from "../../Components/ErrorHandler"

import {
	CustomAppBar,
	ActionButton,
	ProductView,
	SaleDialog
} from "../../Components/index.js"

import {
	defaultPopupStatus,
	defaultProduct
} from "../../Components/Product/defaults"

export default function Product() {
	const { productID } = useParams()

	const [product, setProduct] = React.useState(defaultProduct)
	const [error, setError] = React.useState(defaultError)
	const [popup, setPopup] = React.useState(defaultPopupStatus)

	const [openSale, setOpenSale] = React.useState(false)

	const showSale = () => setOpenSale(true)

	const requestProductUpdate = () => {
		axios.put("http://localhost:3001/inventory/edit/product", product)
			.then((res) => {
				setPopup({ success: true, error: false })
			})
			.catch((err) => {
				console.log(err)
				setPopup({ success: false, error: true })
			})
	}

	const updateProduct = () => {
		const errors = validateProduct(product)
		setError(errors)
		if (isError(errors)) return // if there's been an error, do NOT make a request

		requestProductUpdate()
	}

	return (
		<div>
			<CustomAppBar></CustomAppBar>
			<ProductView
				productID={productID}
				product={{
					set: setProduct,
					get: product
				}}
				error={error}
			></ProductView>
			<Grid container>
				<ActionButton text={"Submit"} onClick={updateProduct}> </ActionButton>
				<ActionButton text={"Sale"} onClick={showSale}> </ActionButton>
			</Grid>

			<SaleDialog
				product={{
					set: setProduct,
					get: product
				}}
				popup={popup}
				setPopup={setPopup}
				openSale={openSale}
				setOpenSale={setOpenSale}
			></SaleDialog>
		</div>
	)
}