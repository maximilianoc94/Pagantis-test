import React from 'react';
import PropTypes from 'prop-types';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from './layout';
import UsersList from '../pages/users';
import WalletsList from '../pages/wallets';
import { getPathDepth } from '../utils';
import { usePrevious } from '../hooks';

const timeout = { enter: 800, exit: 400 };

function Routing({ location }) {
  const prevLocation = usePrevious(location);

  const animationClass = location.pathname === '/' ? 'list' : 'location';

  return (
    <TransitionGroup component="div" className="App">
      <CSSTransition
        key={location.key}
        timeout={timeout}
        classNames={animationClass}
        mountOnEnter={false}
        unmountOnExit
      >
        <div
          className={
            getPathDepth(location) - getPathDepth(prevLocation) >= 0
              ? 'left'
              : 'right'
          }
        >
          <Router location={location}>
            <UsersList path="/" component={UsersList} />
            <WalletsList path="/users/:userId" component={WalletsList} />
          </Router>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

Routing.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
};

const LocationHOC = () => (
  <Layout>
    <Location>{({ location }) => <Routing location={location} />}</Location>
  </Layout>
);

export default LocationHOC;
