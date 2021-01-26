import React  from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../../hoc/AuthLayout/AuthLayout';
import * as actions from '../../store/actions/index';
import * as constants from '../../shared/constants';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignUp = () => {
  const classes = useStyles();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const dispatch = useDispatch();
  const isSignup = true;

  const authActionHandler = values => {
    dispatch(actions.auth(values, isSignup));
  };

  return(
    <AuthLayout
      label="Sign up"
      imageClass="signupImage"
      linkHref={constants.loginUrl}
      linkText="Already have an account? Sign in"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={authActionHandler}
      >
        {
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    helperText={errors.firstName && touched.firstName && (errors.firstName)}
                    error={!!(errors.firstName && touched.firstName)}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={errors.lastName && touched.lastName && (errors.lastName)}
                    error={!!(errors.lastName && touched.lastName)}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={errors.email && touched.email && (errors.email)}
                    error={!!(errors.email && touched.email)}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={errors.password && touched.password && (errors.password)}
                    error={!!(errors.password && touched.password)}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >Sign up</Button>
            </Form>
          )
        }
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
