import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

const AppSnackbar = props  => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={6000}
      message={props.message}
    />
  );
};

AppSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

export default AppSnackbar;

