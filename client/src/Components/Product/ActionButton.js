// import React from "react"

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

export default function ActionButton({ text, onClick }) {
	return (
		<Grid item xs={1} padding={2}>
			<Button
				variant="contained"
				onClick={onClick}
			>
				{text}
			</Button>
		</Grid>
	)
}