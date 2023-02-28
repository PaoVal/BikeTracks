import React from "react"
import axios from "axios"

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

export default function ProductView({ productID, product, error }) {
	React.useEffect(() => {
		const req_params = {
			params: { id: productID }
		}

		axios.get("http://localhost:3001/inventory", req_params)
			.then((response) => product.set(response.data)) // used to set sold price here too
			.catch((err) => console.log(err))
	}, [productID, product.set])

	return (
		<div>
			<Grid container >
				<Grid item lg={1} padding={2}>
					<TextField
						helperText="Name"
						margin="dense"
						value={product.get.name}
						id="name"
						type="text"
						variant="filled"
						error={error.name}
						onClick={() => console.log(error)}
						onChange={(e) => product.set({ ...product.get, name: e.target.value })}
					/>
				</Grid>

				<Grid item lg={1} padding={2}>
					<TextField
						helperText="Brand"
						margin="dense"
						value={product.get.brand}
						id="brand"
						type="text"
						variant="filled"
						error={error.brand}
						onChange={(e) => product.set({ ...product.get, brand: e.target.value })}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item lg={1} padding={2}>
					<TextField
						helperText="Price (CAD)"
						margin="dense"
						value={product.get.price}
						id="price"
						type="number"
						variant="filled"
						error={error.price}
						onChange={(e) => product.set({ ...product.get, price: e.target.value })}
					/>
				</Grid>
				<Grid item lg={1} padding={2}>
					<TextField
						helperText="In Stock"
						margin="dense"
						value={product.get.count}
						id="count"
						type="number"
						variant="filled"
						error={error.description}
						onChange={(e) => product.set({ ...product.get, count: e.target.value })}
					/>
				</Grid>
			</Grid>

			<Grid item lg={1} paddingLeft={2} paddingRight={5}>
				<TextField
					helperText="Description"
					margin="dense"
					value={product.get.description}
					id="description"
					type="text"
					fullWidth
					variant="filled"
					error={error.description}
					onChange={(e) => product.set({ ...product.get, description: e.target.value })}
				/>
			</Grid>
		</div>
	)
}