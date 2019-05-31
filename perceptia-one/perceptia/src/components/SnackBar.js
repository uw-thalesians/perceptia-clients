import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from './Spinner'
import { Autorenew } from '@material-ui/icons';

const success = {
    backgroundColor: green[600],
}
const icon = {
    fontSize: 20,
}
const message = {
    display: 'flex',
    alignItems: 'center',
}

const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

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
                <IconButton key="close" aria-label="Close" color="inherit">
                    <CloseIcon style={icon}/>
                </IconButton>
                ]}
            />
        </div>
    )

}

export default SnackBar;