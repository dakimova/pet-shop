import React  from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LockOutlined, Close } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import AppSnackbar from '../../components/Notification/AppSnackbar';
import signInImage from '../../assets/images/sign-in.jpeg';
import signUpImage from '../../assets/images/sign-up.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(8),
    left: theme.spacing(4),
    color: '#FFF',
  },
  image: {
    backgroundSize: 'cover',
    backgroundColor: '#212121',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  signupImage: {
    backgroundImage: `url(${signInImage})`,
  },
  loginImage: {
    backgroundImage: `url(${signUpImage})`,
  },
  paper: {
    padding: theme.spacing(8, 4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AuthLayout = props => {
  const loginError = useSelector(state => state.auth.error);
  const open = loginError !== null;
  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      className={classes.root}
    >
      <AppSnackbar
        open={open}
        message={loginError}
      />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={[
          classes.image,
          props.imageClass === 'signupImage' ? classes.signupImage : classes.loginImage
        ].join(' ')}
      >
        <Link
          component={RLink}
          to="/"
          variant="body2"
        >
          <Close
            className={classes.closeBtn}
            fontSize="large"
          />
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={3}
        square
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.paper}
        >
          <Grid
            item
            component={Avatar}
            className={classes.avatar}
          >
            <LockOutlined/>
          </Grid>
          <Typography
            component="h1"
            variant="h5"
          >
            {props.label}
          </Typography>
          {props.children}
          <Grid
            container
            justify="flex-end"
          >
            <Grid item>
              <Link
                component={RLink}
                to={props.linkHref}
                variant="body2"
                color="textPrimary"
              >
                {props.linkText}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

AuthLayout.propTypes = {
  imageClass: PropTypes.string,
  label: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default AuthLayout;
