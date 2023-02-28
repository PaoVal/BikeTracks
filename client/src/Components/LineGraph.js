import React from "react"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			display:false
		},
		title: {
		display: true,
		text: "Monthly Sales",
		},
	},
	scales: {
		y: {
			title: {
				display: true,
				text: 'Items Sold',
				padding: 20,
			}
		},
		x: {
			title: {
				display: true,
				text: 'Day',
				padding: 20,
			}
		}
	} 
};

const getMaxDay = () => {
	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth() + 1

	return new Date(year, month, 0).getDate()
}

const labels = Array.from({length: getMaxDay()}, (_, i) => `${i + 1}`)

const data = (sales) => {
	return {
		labels,
		datasets: [
			{
				data: sales,
				borderColor: "#165FC7",
				backgroundColor: "#1876D3"
			},
		]
	}
}

export default function LineGraph() {

	const [sales, setSales] = React.useState([])

	React.useEffect(() => {
			const req_params = {
				params: { date: new Date(), maxDay: getMaxDay() }
			}
			axios.get("http://localhost:3001/sale/month", req_params)
			.then((response) => {
				console.log(response.data.saleCount)
				setSales(response.data.saleCount)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div>
			<Line options={options} data={data(sales)} />
		</div>
	)
}