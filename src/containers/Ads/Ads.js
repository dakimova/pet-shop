import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch, Link as RLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import PetsIcon from '@material-ui/icons/Pets';

import DashboardLayout from '../../hoc/DashboardLayout/DashboardLayout';
import GridNavbar from './GridNavbar/GridNavbar';
import PetCard from '../../components/PetCard/PetCard';
import * as constants from '../../shared/constants';
import * as actions from '../../store/actions';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  category: {
    textTransform: 'capitalize'
  }
}));

const Ads = () => {
  let content = null;
  const query = new URLSearchParams(useLocation().search);
  const activeCategory = query.get(constants.adsParamName);
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { categories, pets } = useSelector(state => ({
    categories: state.pets.categories,
    pets: state.pets.petList,
    // isAuthenticated: state.auth.token !== null,
  }), shallowEqual);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filteredPets, setFilteredPets] = useState([]);

  const fetchCategory = useCallback(() => {
    dispatch(actions.initCategory());
  }, [dispatch]);

  const fetchPets = useCallback(() => {
    dispatch(actions.initPets());
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = categories.findIndex(category => category.name === activeCategory);
    setSelectedIndex(activeIndex);
    setSelectedCategory(categories[activeIndex]);
  }, [categories]);

  useEffect(() => {
    setFilteredPets(pets.filter(pet => pet.categoryId === selectedCategory.key));
  }, [pets]);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleListItemClick = (category, index) => {
    if (selectedIndex !== index) {
      setSelectedIndex(index);
      setSelectedCategory(category);
      setFilteredPets(pets.filter(pet => pet.categoryId === category.key));
    } else {
      setSelectedIndex(null);
      setSelectedCategory({});
      setFilteredPets(pets);
    }
  };

  if (categories.length) {
    content = categories.map((category, index) => (
      <Fragment key={category.key}>
        <ListItem
          button
          component={RLink}
          to={`${url}?${constants.adsParamName}=${category.name}`}
          selected={selectedIndex === index}
          onClick={() => handleListItemClick(category, index)}
        >
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText className={classes.category} primary={category.name} />
        </ListItem>
      </Fragment>
    ));
  }

  return(
    <DashboardLayout>
      <Fragment>
        <GridNavbar/>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <List component="nav" aria-label="pets list">
              {content}
            </List>
          </Grid>
          <Grid item xs={12} sm={9}>
            <GridList cols={3}>
              {
                filteredPets.map((pet) => (
                  <PetCard
                    key={pet.key}
                    id={pet.key}
                    birthdate={pet.birthdayDate}
                    title={pet.name}
                    img={pet.photo}
                    defaultImg={categories.find(category => category.key === pet.categoryId).defaultImage}
                    priority={true}
                    description={pet.description}
                  />
                ))
              }
            </GridList>
          </Grid>
        </Grid>
      </Fragment>
    </DashboardLayout>
  );
};

export default React.memo(Ads);
