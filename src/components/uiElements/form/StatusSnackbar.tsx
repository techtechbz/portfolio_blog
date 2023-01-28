import { FC, forwardRef, memo, SyntheticEvent } from "react"

import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
  isOpen: boolean
  /* eslint no-unused-vars: 0 */
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const StatusAlert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StatusSnackbar: FC<Props> = memo((props: Props) => {
  const { title, status, isOpen, handleClose } = props

  const CloseButton =
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <StatusAlert onClose={handleClose} severity={status} action={CloseButton}>
        <AlertTitle>{status}</AlertTitle>
        {title}
      </StatusAlert>
    </Snackbar>
  );
})

export default StatusSnackbar