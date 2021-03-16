import React from 'react';
import PropTypes from 'prop-types';

import classes from './layout.module.scss';

export const Header = React.memo(() => (
  <div className={classes.header}>
    <img
      data-testid="header-logo"
      alt="Pagantis logo"
      src="https://www.pagantis.com/wp-content/uploads/2019/12/Pagantis_Log_RGB.svg"
    />
  </div>
));

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default React.memo(Layout);
