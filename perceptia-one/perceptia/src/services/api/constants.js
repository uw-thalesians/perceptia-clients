export const apiRefBase = process.env.REACT_APP_API_SERVER_SCHEME
  + "://" + process.env.REACT_APP_API_SERVER_HOST
  + ":" + process.env.REACT_APP_API_SERVER_PORT;

// Headers
export const headerAuthorization = 'Authorization';
export const headerLocation = 'Location';
export const headerPerceptiaApiVersion = 'Perceptia-Api-Version';

// Header values
export const authorizationBearer = 'Bearer';
export const perceptiaApiVersion1 = '1';
export const perceptiaApiVersion2 = '2';