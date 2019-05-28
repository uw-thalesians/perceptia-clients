import axios from 'axios';
import * as sessionSelectors from './../session/selectors';
import * as gateway from './services/gateway';

export var apiRefBase = process.env.REACT_APP_API_SERVER_SCHEME
  + "://" + process.env.REACT_APP_API_SERVER_HOST
  + ":" + process.env.REACT_APP_API_SERVER_PORT;

// Headers
export const headerAuthorization = 'Authorization';
export var headerPerceptiaApiVersion = 'Perceptia-Api-Version';

// Header values
export var authorizationBearer = 'Bearer';
export var perceptiaApiVersion1 = '1';
export var perceptiaApiVersion2 = '2';

export var perceptiaApiBase = createCustomAxios();


export var perceptiaApiV1 = createCustomAxios('/api/v1');

export var perceptiaApiV2 = createCustomAxios('/api/v2');


export function createCustomAxios(basePath = '', apiVersion = '1') {
    let instance = axios.create({
        baseURL: ''.concat(apiRefBase, basePath),
        headers: {
            [headerPerceptiaApiVersion]: apiVersion,
        },
    });
    instance.interceptors.request.use(() => {
        const currSession = sessionSelectors.read();
        let headersConfig = {};
        if (currSession.active) {
            let token = authorizationBearer.concat(' ', currSession.tokens.access.value);
            headersConfig = {
                [headerAuthorization]: token,
            };
        }
        return ({headers:{...headersConfig}});
    });
    return instance;
};

export {gateway as apiGateway};