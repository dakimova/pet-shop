import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const useStyles = makeStyles(() => ({
  root: {
    padding: 2,
  },
  largeCard: {
    width: '66.6%',
  },
  smallCard: {
    width: '33.3%',
  },
  media: {
    height: 180,
  },
  mediaDefault: {
    backgroundSize: 'contain',
  },
  avatar: {
    backgroundColor: red[500],
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actions: {
    position: 'relative',
    height: 56,
    width: 56,
  },
  speedDial: {
    position: 'absolute',
  },
}));

const actions = [
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];

const PetCard = props  => {
  const classes = useStyles();

  return (
    <GridListTile
      className={[
        classes.root,
        classes[props.priority ? 'smallCard' : 'largeCard'],
      ].join(' ')}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title={props.title}
          subheader={format(new Date(props.birthdate), 'LLLL dd, yyyy')}
        />
        <CardMedia
          className={[classes.media, !props.img && classes.mediaDefault].join(' ')}
          image={props.img ? props.img : props.defaultImg}
          title={props.title}
          alt={props.title}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {actions.map((action) => (
            <IconButton key={action.name} aria-label={action.name}>
              {action.icon}
            </IconButton>
          ))}
        </CardActions>
      </Card>
    </GridListTile>
  );
};

PetCard.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  defaultImg: PropTypes.string,
  priority: PropTypes.bool,
  title: PropTypes.string,
  birthdate: PropTypes.string,
  description: PropTypes.string,
};

export default PetCard;

