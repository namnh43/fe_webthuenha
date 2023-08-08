import { SnackbarProvider, useSnackbar } from 'notistack';
export default function BookingNotification() {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <>
            {enqueueSnackbar('This is a success message!', 'success' )}
        </>
    )
}