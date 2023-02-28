import { transaction } from "../../models/index.js"
import { Op, fn, col, where } from "sequelize"

const matchesMonth = (month) => {
	return {
		date: where(
			fn("MONTH", col("date")),
			month
		)
}}

const matchesYear = (year) => {
	return {
		date: where(
			fn("YEAR", col("date")),
			year
		)
	}
}

const matchesMonthAndYear = (month, year) => {
	return { [Op.and]: [ matchesMonth(month), matchesYear(year) ] }
}

const generateDailies = (maxDay, matches) => {
	var dailies = new Array(maxDay)
	for (let index = 0; index < maxDay; index++) {
		dailies[index] = 0
	}
	for (const sales of matches) {
		dailies[sales.day - 1] = sales.count
	}
	return dailies
}

export default function (req, res) {
	const { date, maxDay } = req.query
	const req_date = new Date(date)
	
	const month = req_date.getMonth() + 1
	const year = req_date.getFullYear()

	transaction.count({
      where: matchesMonthAndYear(month, year),
      attributes: [
        [fn("DAY", col("date")), "day"]
      ],
      group: ["day"],
   })
	.then(
		(matches) => res.status(200).json({saleCount: generateDailies(maxDay, matches)})
	)
	.catch(
		(error) => res.status(503).json({message: `Failed to create new transaction: ${error}`})
	)
}