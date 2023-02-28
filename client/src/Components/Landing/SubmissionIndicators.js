import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { defaultIndicators } from "./operationIndicators.js"

export default function SubmissionIndicators({indicators, setIndicators}) {

	const setDefaultIndicator = () => setIndicators(defaultIndicators)
	return(
		<div>
		{indicators.success &&
			<Alert
				onClose={setDefaultIndicator}
				severity="success">

				<AlertTitle>Success</AlertTitle>
				Stock Updated!
			</Alert>
		}
		{indicators.failure &&
			<Alert
				onClose={setDefaultIndicator}
				severity="error">

				<AlertTitle>Failure</AlertTitle>
				Could not update some of your stock. Try again later!
			</Alert>
		}

		{indicators.info &&
			<Alert
				onClose={setDefaultIndicator}
				severity="info">

				<AlertTitle>Info</AlertTitle>
				You did not update any entries. Interact with the stock column to modify your inventory.
			</Alert>
		}
		</div>
	)
}