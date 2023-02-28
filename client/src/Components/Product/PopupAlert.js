import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function PopupAlert({ popup, setPopup }) {
	return (
		<div>
			{
				popup.error &&
				<Alert
					onClose={() => { setPopup({ ...popup, error: false }) }}
					severity="error">

					<AlertTitle>Failure</AlertTitle>
					Could not update. Try again later!
				</Alert>
			}
			{
				popup.success &&
				<Alert
					onClose={() => { setPopup({ ...popup, success: false }) }}
					severity="success">

					<AlertTitle>Info</AlertTitle>
					Successfully updated database!
				</Alert>
			}
		</div>
	)
}