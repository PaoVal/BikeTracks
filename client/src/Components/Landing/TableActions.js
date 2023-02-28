import React from "react"

import { DialogTriggerButton } from "./index.js"

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export default function TableActions({rows, updateStock}) {

	return(
	<div>
		<Grid container>
			<Grid item padding={2}>
				<DialogTriggerButton rows={rows} ></DialogTriggerButton>
			</Grid>

			<Grid item padding={2}>
				<Button
					variant="contained"
					onClick={updateStock}>
					Submit
				</Button>
			</Grid>

		</Grid>
	</div>
	)
}