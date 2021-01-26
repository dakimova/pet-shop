import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppHeader from '../../components/Navigation/AppHeader/AppHeader';
import AppDrawer from '../../components/Navigation/AppDrawer/AppDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const DashboardLayout = props => {
  const [open, setOpen] = useState(true);
  const openDrawerHandler = () => {
    setOpen(true);
  };
  const closeDrawerHandler = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const { isAuthenticated, userName } = useSelector(state => ({
    isAuthenticated: state.auth.token !== null,
    userName: state.auth.userName
  }));

  return(
    <div className={classes.root}>
      <AppHeader
        isAuth={isAuthenticated}
        userName={userName}
        isOpen={open}
        openDrawer={openDrawerHandler}
      />
      <AppDrawer
        isOpen={open}
        closeDrawer={closeDrawerHandler}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default DashboardLayout;
