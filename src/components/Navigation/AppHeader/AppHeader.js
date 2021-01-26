import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link as RLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';

import * as constants from '../../../shared/constants';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const AppHeader = props => {
  let headerActions;
  const classes = useStyles();

  if (!props.isAuth) {
    headerActions = (
      <Fragment>
        <Button
          color="inherit"
          component={RLink}
          to={constants.loginUrl}
        >Login</Button>
        <Button
          color="inherit"
          component={RLink}
          to={constants.signupUrl}
        >Sign Up</Button>
      </Fragment>
    );
  }

  if (props.isAuth) {
    headerActions = (
      <Fragment>
        <Typography
          component="h2"
          variant="h6"
          color="inherit"
          noWrap
        >
          {props.userName}
        </Typography>
        <IconButton
          color="inherit"
          component={RLink}
          to={constants.logoutUrl}
        >
          <ExitToAppIcon />
        </IconButton>
      </Fragment>
    );
  }

  return (
    <AppBar position="absolute" className={[classes.appBar, props.isOpen && classes.appBarShift].join(' ')}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={[classes.menuButton, props.isOpen && classes.menuButtonHidden].join(' ')}
          onClick={props.openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Find a friend
        </Typography>
        {headerActions}
      </Toolbar>
    </AppBar>
  );
};

AppHeader.propTypes = {
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  openDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AppHeader;
