import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppsIcon from '@material-ui/icons/Apps';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1.875rem',
    height: 40,
    borderBottomColor: theme.palette.primary.dark,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  sorting: {
    display: 'inline-block',
    position: 'absolute',
    lineHeight: 40,
  },
  switcher: {
    float: 'right',
    lineHeight: 'normal',
    height: 40
  },
}));

const GridNavbar = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div className={classes.root}>
      <div className={classes.sorting}>sorting</div>
      <div className={classes.switcher}>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab icon={<AppsIcon />} aria-label="list" />
            <Tab icon={<ListAltIcon aria-label="grid"/>} />
          </Tabs>
        </Paper>
      </div>
    </div>
  );
};

export default GridNavbar;
