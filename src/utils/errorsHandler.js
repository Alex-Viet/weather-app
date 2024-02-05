export const errorsHandler = (error) => {
  let res = '';

  if (error?.response?.status === 404) {
    res = 'City is not found';
    return res;
  }

  if (error?.response?.status === 400) {
    res = 'Problems with the request';
    return res;
  }

  if (error?.response?.status === 429) {
    res = 'Too many requests. Please try later';
    return res;
  }

  if (error?.response?.status >= 500 && error?.response?.status < 600) {
    res = 'Unexpected Error. Please try later';
    return res;
  }
};
