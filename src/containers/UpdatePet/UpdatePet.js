import React, { Fragment } from 'react';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import { Link as RLink } from 'react-router-dom';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import Grid from '@material-ui/core/Grid';

import DashboardLayout from '../../hoc/DashboardLayout/DashboardLayout';
// import * as actions from '../../store/actions';
// import * as constants from '../../shared/constants';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UpdatePet = () => {
  const classes = useStyles();

  return(
    <DashboardLayout className={classes.root}>
      <Fragment>Update Pet</Fragment>
    </DashboardLayout>
  );
};

export default React.memo(UpdatePet);
