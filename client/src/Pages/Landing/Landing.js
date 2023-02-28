import React from "react"
import axios from "axios"

import {
	CustomAppBar,
	ProductTable,
	TableActions,
	SubmissionIndicators
} from "../../Components/index.js"

import Grid from '@mui/material/Grid'

import { defaultIndicators } from '../../Components/Landing/operationIndicators.js'

const emptyList = []

export default function Landing() {
	const [rows, setRows] = React.useState(emptyList)
	const [modified, setModified] = React.useState(emptyList)
	const [indicators, setIndicators] = React.useState(defaultIndicators)

	const requestStockUpdate = async (requested_updates) => {

		const actual_updates = [...requested_updates]
		for (const index of requested_updates) {

			const body = {
				id: rows[index].id,
				stock: rows[index].count
			}

			try {
				await axios.put("http://localhost:3001/inventory/edit/stock", body)
				actual_updates.shift()

				if (actual_updates.length === 0) {
					setModified([])
					return setIndicators({...defaultIndicators, success:true})
				}

			} catch (error) {
				setModified(actual_updates)
				return setIndicators({...defaultIndicators, failure:true})
			}
		}
	}

	const updateStock = () => {

		if (modified.length === 0) {
			setIndicators({...defaultIndicators, info:true})
		}
		else {
			requestStockUpdate(modified)
		}
	}


	return (
		<div>
			<CustomAppBar></CustomAppBar>

			<Grid container marginLeft={10}>
				<Grid item padding={2}>
					<ProductTable
						rows={rows}
						setRows={setRows}
						modified={modified}
						setModified={setModified}
					></ProductTable>
				</Grid>			
			</Grid>

			<SubmissionIndicators
					indicators={indicators}
					setIndicators={setIndicators}
			></SubmissionIndicators>

			<TableActions
					updateStock={updateStock}
					rows={{
						get: rows,
						set: setRows	
					}}
			></TableActions>	
		</div>
	)
}