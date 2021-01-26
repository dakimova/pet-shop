import React, { useEffect, useCallback, Fragment } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RLink } from 'react-router-dom';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';

import DashboardLayout from '../../hoc/DashboardLayout/DashboardLayout';
import PetCard from '../../components/PetCard/PetCard';
import * as actions from '../../store/actions';
import * as constants from '../../shared/constants';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  categoryName: {
    fontWeight: 500,
    textTransform: 'capitalize',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  headerDivider: {
    flexGrow: 1,
  }
}));

// {
//   "rules": {
//   "users": {
//     "$uid": {
//       ".write": "auth != null && auth.uid == $uid",
//         ".read": "auth != null && auth.uid == $uid"
//     }
//   },
//   "orders": {
//     ".read": true,
//       ".write": true,
//       ".indexOn": ["userId"]
//   }
// }
// }

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchCategory = useCallback(() => {
    dispatch(actions.initCategory());
  }, [dispatch]);

  const fetchPets = useCallback(() => {
    dispatch(actions.initPets());
  }, [dispatch]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const { categories, pets, isAuthenticated } = useSelector(state => ({
    categories: state.pets.categories,
    pets: state.pets.petList,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  }), shallowEqual);

  const generateCategoryUrl = categoryName => {
    return `${constants.petsAdsUrl}?${constants.adsParamName}=${categoryName}`;
  };
  // useEffect(() => {
  //   dispatch(actions.purchasePet({
  //     name: 'Cow',
  //     gender: 'male',
  //     breedId: '-MR5KvaQHYAq4-2fEe7V',
  //     categoryId: '-MR41wvUMt9_MrWs86XY',
  //     birthdayDate: new Date('02/19/2018'),
  //     posted: new Date(),
  //     userId: 'B9EV6cyiT5ZRlHvMY2GibmzOPIJ3'
  //   }, token));
  // }, [dispatch]);

  const content = categories.map(category => (
    <Fragment key={category.key}>
      <div className={classes.header}>
        <Link
          component={RLink}
          to={() => generateCategoryUrl(category.name)}
          color="secondary"
        >
          <Typography
            variant='h2'
            gutterBottom={true}
            className={classes.categoryName}
          >
            {category.name}
          </Typography>
        </Link>
        <span className={classes.headerDivider}/>
        {
          pets && pets.filter(pet => pet.categoryId === category.key).length ?
            (
              <Link
                component={RLink}
                to={() => generateCategoryUrl(category.name)}
                color="textPrimary"
              >
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Typography variant='h6'>See all</Typography>
                  <LastPageIcon/>
                </Grid>
              </Link>
            ) : null
        }
      </div>
      <div className={classes.root}>
        {pets && pets.filter(pet => pet.categoryId === category.key).length ?
          (
            <GridList cols={3}>
              {pets.filter(pet => pet.categoryId === category.key).map((pet, index) => (
                <PetCard
                  key={pet.key}
                  id={pet.key}
                  birthdate={pet.birthdayDate}
                  title={pet.name}
                  img={pet.photo}
                  defaultImg={category.defaultImage}
                  priority={index % 5 !== 0}
                  description={pet.description}
                />
              ))}
            </GridList>
          )
          : (
            <Typography variant='h6' color="textSecondary" gutterBottom={true}>
              There is not any {category.name} yet.
              Please {' '}
              {
                isAuthenticated ?
                  <Link
                    component={RLink}
                    to={constants.addPetUrl}
                    variant="h6"
                    color="textPrimary"
                  >
                    add new advertisment
                  </Link> :
                  <Link
                    component={RLink}
                    to={constants.loginUrl}
                    variant="h6"
                    color="textPrimary"
                  >
                    login to add new advertisment
                  </Link>
              }
            </Typography>
          )
        }
      </div>
    </Fragment>
  ));
  return(
    <DashboardLayout>
      <Fragment>{content}</Fragment>
    </DashboardLayout>
  );
};

export default React.memo(Dashboard);
