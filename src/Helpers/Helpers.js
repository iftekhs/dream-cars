function cl(link) {
  return process.env.REACT_APP_API_ROOT + link;
}

function getPrice(price) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (price >= 1000) {
    return (price / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return price;
}

export { cl, getPrice };
