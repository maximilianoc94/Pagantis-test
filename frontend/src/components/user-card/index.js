import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import classes from './user-card.module.scss';
import { selectUser } from '../../redux/actions';

/**
 *  User's card to display summary of information
 */
export function UserCard({
  id,
  image,
  title,
  isFav,
  loading,
  toggleFavorite,
  storeUser,
}) {
  if (loading) {
    return (
      <Card className={classes.root} data-testid="skeleton-card">
        <Skeleton height={138} />
        <CardContent>
          <Skeleton height={36} width="60%" />
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
          <Skeleton height={24} width={80} />
        </CardActions>
      </Card>
    );
  }
  return (
    <Card className={classes.root} data-testid="user-card">
      <CardMedia className={classes.media} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            toggleFavorite(id);
          }}
        >
          {isFav ? (
            <FavoriteIcon data-testid="faved" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            storeUser({
              id,
              image,
              name: title,
            });
            navigate(`/users/${id}`);
          }}
        >
          See wallets
        </Button>
      </CardActions>
    </Card>
  );
}

UserCard.propTypes = {
  /** Unique identifier for the user */
  id: PropTypes.string,

  /** Background banner image  */
  image: PropTypes.string,

  /** Title or name */
  title: PropTypes.string,

  /** Display loading skeleton */
  loading: PropTypes.bool,

  /** Indicates if the user is faved */
  isFav: PropTypes.bool,

  /** Function to update isFav */
  toggleFavorite: PropTypes.func,

  /** Action Creator to store the current user */
  storeUser: PropTypes.func,
};

UserCard.defaultProps = {
  loading: false,
  id: '',
  image: '',
  title: '',
  isFav: false,
  toggleFavorite: () => {},
  storeUser: () => {},
};

export default React.memo(
  connect(undefined, { storeUser: selectUser })(UserCard),
);
