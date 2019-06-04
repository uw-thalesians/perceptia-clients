import React from 'react';
import { Close } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import { IconButton, SnackbarContent } from '@material-ui/core';

import { Spinner } from './';


const success = {
  backgroundColor: green[600],
};
const icon = {
  fontSize: 20,
};
const message = {
  display: 'flex',
  alignItems: 'center',
};

const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function SnackBar(props) {

  return (
    <div style={center}>
      <SnackbarContent
        style={success}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" style={message}>
                    <Spinner />
            {props.text}
                </span>
        }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={() => {props.onClickClose();}}>
            <Close style={icon} />
          </IconButton>
        ]}
      />
    </div>
  );
}

export default SnackBar;