import decode from 'jwt-decode';

const checkToken = (token) => {
  const isValid = !!decode(token).exp < new Date().getTime();
  return isValid;
};

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token && checkToken(token);
  return isLoggedIn;
};

export default checkAuth;
