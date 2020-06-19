import React, { useContext} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { GlobalContext } from "../context/GlobalContext";

export default function Notification() {
    const { isNotificationVisible } = useContext(GlobalContext);
    const { notificationMessage } = useContext(GlobalContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isNotificationVisible}
        // autoHideDuration={2000}
        onClose={handleClose}
        message={notificationMessage}
        // action={
        //   <React.Fragment>
        //     <Button color="secondary" size="small" onClick={handleClose}>
        //       UNDO
        //     </Button>
        //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </React.Fragment>
        // }
      />
    </div>
  );
}