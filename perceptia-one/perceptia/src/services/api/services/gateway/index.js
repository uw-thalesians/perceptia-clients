import * as api from './../../index';
import * as constants from "./../../constants";
import * as sessionSelectors from './../../../session/selectors';


export var gatewayApiV1Version = '1.0.0';
export var gatewayApiV1BasePath = '/api/v1/gateway';

const usersRoute = '/users'


let gatewayApiV1 = api.createCustomAxios(constants, sessionSelectors,gatewayApiV1BasePath, gatewayApiV1Version);

export var gatewayApiV1UsersCreate = (newUser) => {
  return gatewayApiV1.post(usersRoute.toString(), newUser);
};
