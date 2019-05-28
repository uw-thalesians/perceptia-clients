import axios from 'axios';
import * as sessionSelectors from './../session/selectors';
import * as gateway from './services/gateway';
import * as constants from './constants';

export function createCustomAxios(constants, sessionSelectors, basePath = '', apiVersion = '1') {
    let instance = axios.create({
        baseURL: ''.concat(constants.apiRefBase, basePath),
        headers: {
            [constants.headerPerceptiaApiVersion]: apiVersion,
        },
    });
    instance.interceptors.request.use(() => {
        const currSession = sessionSelectors.read();
        let headersConfig = {};
        if (currSession.active) {
            let token = constants.authorizationBearer.concat(' ', currSession.tokens.access.value);
            headersConfig = {
                [constants.headerAuthorization]: token,
            };
        }
        return ({headers:{...headersConfig}});
    });
    return instance;
}


export var perceptiaApiBase = createCustomAxios(constants, sessionSelectors);


export var perceptiaApiV1 = createCustomAxios(constants,sessionSelectors,'/api/v1', constants.perceptiaApiVersion1);

export var perceptiaApiV2 = createCustomAxios(constants,sessionSelectors,'/api/v2', constants.perceptiaApiVersion2);




export {gateway as apiGateway};