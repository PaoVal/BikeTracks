export const defaultError = {
	name: false,
	brand: false,
	price: false,
	description: false,
}

export const allError = {
	name: true,
	brand: true,
	price: true,
	description: true,

}

export const findValidationErrors = (product) => {

	const isNameValid = product.name === "" || product.name.length > 65
	const isBrandValid = product.brand === "" || product.name.length > 50
	const isPriceValid = (product.price === 0 || isNaN(product.price) || product.price < 0 )
	const isDescriptionValid = product.description.length > 254
	const isCountValid = product.count < 0 || product.count === ""

	const potential_errors = {
		name: isNameValid,
		brand: isBrandValid,
		price: isPriceValid,
		description: isDescriptionValid,
		count: isCountValid
	}

	return potential_errors
}

export const isError = (errors) => {
	for (const field in errors) {
		if (Object.hasOwnProperty.call(errors, field)) {
			if ( errors[field] ) return true
		}
	}
	return false
}