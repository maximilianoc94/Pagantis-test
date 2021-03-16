export const MOBILE_BREAKPOINT = 414;
export const TABLET_BREAKPOINT = 1024;
export const LOADING_CARDS_AMOUNT = 8;
export const LOADING_WALLETS_AMOUNT = 5;
export const LAST_FOUR_DIGITS = -4;

const DECIMAL_POINTS = 2;

export function getPathDepth(location) {
  if (location?.pathname) {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter((n) => n !== '');
    return pathArr.length;
  }
  return 0;
}

export function xClasses(...args) {
  return args.join(' ');
}

export const sortByFav = (a, b) => {
  // Puts favorite users first.
  if (a.isFav && !b.isFav) {
    return -1;
  }
  if (!a.isFav && b.isFav) {
    return 1;
  }
  return 0;
};

export function currencyFormat(num) {
  if (num) {
    return num
      .toFixed(DECIMAL_POINTS)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return num;
}
