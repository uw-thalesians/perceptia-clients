// import React from 'react';
// import green from '@material-ui/core/colors/green';
// import { IconButton, SnackbarContent } from '@material-ui/core';
// import Spinner from './Spinner';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';
// import InfoIcon from '@material-ui/icons/Info';
// import ErrorIcon from '@material-ui/icons/Error';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';

// const success = {
//     backgroundColor: green[600],
// };
// const icon = {
//     fontSize: 20,
// };
// const message = {
//     display: 'flex',
//     alignItems: 'center',
// };

// const center = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// };

// function SnackBar(props) {

//     return (
//         <div style={center}>
//             <SnackbarContent
//                 style={success}
//                 aria-describedby="client-snackbar"
//                 message={
//                 <span id="client-snackbar" style={message}>
//                     <Spinner />
//                     {props.text}
//                 </span>
//                 }
//                 action={[
//                 <IconButton key="close" aria-label="Close" color="inherit" onClick={() => {props.onClickClose();}}>
//                     <Close style={icon} />
//                 </IconButton>
//                 ]}
//             />
//         </div>
//     );
// }


import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, fetchStep, fetchTotalStep, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {"step " + fetchStep + " of " + fetchTotalStep + ": " + message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  fetchStep: PropTypes.number,
  fetchTotalStep: PropTypes.number,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function SnackBar(props) {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(true);

//   function handleClick() {
//     setOpen(true);
//   }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    
    <div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={props.variant}
          fetchStep={props.fetchStep}
          fetchTotalStep={props.fetchTotalStep}
          message={props.status}
        />
      </Snackbar>
    </div>
  );
}

export default SnackBar;