const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  registrationPath: () => [apiPath, 'signup'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};
