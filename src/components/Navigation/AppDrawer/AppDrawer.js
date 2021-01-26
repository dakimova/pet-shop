import React from 'react';
import { Link as RLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';

import * as constants from '../../../shared/constants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const listItems = [
  { icon: <HomeIcon />, text: 'Home', url: constants.homeUrl },
  { icon: <StorefrontIcon />, text: 'Pets Ads', url: constants.petsAdsUrl },
  { icon: <AddShoppingCartIcon />, text: 'Add you pet', url: constants.addPetUrl },
  { icon: <FavoriteBorderIcon />, text: 'Favourites', url: constants.homeUrl },
  { icon: <ShoppingCartIcon />, text: 'Orders', url: constants.homeUrl },
];

const AppDrawer = props => {
  const classes = useStyles();

  return(
    <Drawer
      variant="permanent"
      classes={{
        paper: [classes.drawerPaper, !props.isOpen && classes.drawerPaperClose].join(' '),
      }}
      open={props.isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {listItems.map((item) => (
          <ListItem
            key={item.text}
            component={RLink}
            to={item.url}
            button
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

AppDrawer.propTypes = {
  closeDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AppDrawer;
