import React from "react"
import axios from "axios"

import { PopupAlert } from "./index.js"

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Typography from '@mui/material/Typography'

import { smallId } from "./styling"
import { ThemeProvider } from '@mui/material/styles'

import { Grid } from "@mui/material"

export default function SaleDialog({ product, popup, setPopup, setOpenSale, openSale }) {
	const [soldCount, setSoldCount] = React.useState(0)
	const [errorSale, setErrorSale] = React.useState(false)
	const [saleDiscount, setSaleDiscount] = React.useState(0)
	const [saleDate, setSaleDate] = React.useState(Date.now())

	const [soldPrice, setSoldPrice] = React.useState(0)

	const hideSale = () => setOpenSale(false)

	React.useEffect(() => {
		setSoldPrice(product.get.price)
	}, [product])

	const updateSoldCount = (e) => {
		const newSoldCount = e.target.value
		if (newSoldCount <= product.get.count && newSoldCount >= 1) setSoldCount(newSoldCount)
	}

	const updateDiscount = (e) => {
		const newDiscount = parseFloat(e.target.value)
		if (
			!isNaN(newDiscount) &&
			newDiscount >= 0 &&
			newDiscount <= 100
		) {
			setSaleDiscount(newDiscount)
			setSoldPrice(((100 - newDiscount) * product.get.price) / 100)
		}
	}

	const recordSale = () => {
		if (isNaN(parseInt(soldCount)) || soldCount === 0) return setErrorSale(true)

		const sale = {
			sale_price: soldPrice,
			product_id: product.get.id,
			curr_stock: product.get.count,
			sold_count: soldCount,
			date: saleDate
		}

		axios.post("http://localhost:3001/sale", sale)
			.then((res) => {
				setPopup({ success: true, error: false })
				setErrorSale(false)
				product.set({ ...product.get, count: parseInt(res.data.count) })
				hideSale()
			})
			.catch((err) => {
				console.log(err)
				setPopup({ success: false, error: true })
				hideSale()
			})
	}

	return (
		<div>
			<Dialog open={openSale} onClose={hideSale}>
				<DialogTitle>Record a sale</DialogTitle>
				<DialogContent>
					<hr></hr>
					<i>
						<ThemeProvider theme={smallId}>
							<Typography >
								{`id: ${product.get.id}`}
							</Typography>
						</ThemeProvider>
					</i>

					<Grid container>

						<Grid item padding={2}>
							<Typography><b>Name:</b></Typography>
							<Typography>
								{product.get.name}
							</Typography>
						</Grid>


						<Grid item padding={2}>
							<Typography><b>Stock:</b></Typography>

							<Typography>
								{`x${product.get.count}`}
							</Typography>
						</Grid>

					</Grid>

					<hr></hr>
					<Grid container>
						<Grid item padding={2}>
							<Typography><b>Price (CAD):</b></Typography>
							<Typography>
								{`$${product.get.price}`}
							</Typography>
						</Grid>

						<Grid item padding={2}>
							<Typography><b>Discount (%):</b></Typography>
							<TextField
								margin="dense"
								value={saleDiscount}
								type="number"
								variant="filled"
								onChange={(e) => updateDiscount(e)}
							/>
						</Grid>

						<Grid item padding={2}>
							<Typography><b>Final Sale (CAD):</b></Typography>
							<Typography>
								{`$${soldPrice}`}
							</Typography>
						</Grid>

					</Grid>
					<hr></hr>

					<Grid container>
						<Grid item padding={2}>
							<Typography><b>Units Sold:</b></Typography>
							<TextField
								margin="dense"
								value={soldCount}
								error={errorSale}
								type="number"
								variant="filled"
								onChange={(e) => updateSoldCount(e)}
							/>
						</Grid>

						<Grid item padding={2}>
							<Typography><b>Sale date:</b></Typography>
							<TextField
								margin="dense"
								value={saleDate}
								type="date"
								variant="filled"
								onChange={(e) => setSaleDate(e.target.value)}
							/>
						</Grid>
					</Grid>

				</DialogContent>

				<DialogActions>
					<Button onClick={hideSale}>Cancel</Button>
					<Button onClick={recordSale}>Submit</Button>
				</DialogActions>
			</Dialog>
			<PopupAlert popup={popup} setPopup={setPopup}></PopupAlert>
		</div>
	)
}