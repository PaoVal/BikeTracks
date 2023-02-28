import React from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom"

import {StyledTableCell, StyledTableRow} from "./styling.js"

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'


export default function ProductTable({rows, setRows, modified, setModified}) {
	const navigate = useNavigate()

	React.useEffect(() => {
		const req_params = {
			params: {
				page_num: 0,
				max_num: 10
			}
		}

		axios.get("http://localhost:3001/inventory/all", req_params)
			.then((response) => {
				setRows(response.data)

			})
			.catch((err) => {
				console.log(err)
			})
	}, [setRows])

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

	const updateStockView = (event, rownum) => {
		const newStock = parseInt(event.target.value)
		if (newStock < 0 || !Number.isInteger(newStock)) return

		const updatedRows = [...rows]
		updatedRows[rownum] = { ...updatedRows[rownum], count: newStock }
		setRows(updatedRows)

		if (!modified.includes(rownum)) setModified([...modified, rownum])
	}

	return (
		<div>
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
									onClick={() => { navigate(`/inventory/${row.id}`) }}
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
										onChange={(e) => updateStockView(e, i)}
									/>
								</StyledTableCell>
								<StyledTableCell
									align="right"
									component="th"
									scope="row"
									onClick={() => { navigate(`/inventory/${row.id}`) }}
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
		</div>
	)
}