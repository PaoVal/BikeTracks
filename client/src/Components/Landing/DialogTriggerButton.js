import React from 'react'

import { AddProductDialog } from './index.js'

import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export default function DialogTriggerButton(props) {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)


	return (
		<div>
			<Button
				variant="contained"
				onClick={handleOpen}
				endIcon={<AddIcon/>}>
				Add
			</Button>

			<AddProductDialog 
				visibility={ 
					{
						get: open,
						set: setOpen
					}
				}
				rows={props.rows}>

			</AddProductDialog>
		</div>
	)
}