import axios from 'axios';
import * as api from './../../index';
import * as sessionSelectors from "../../../session/selectors";

export var gatewayApiV1Version = '1.0.0';
export var gatewayApiV1BasePath = '/api/v1/gateway';

const usersRoute = '/users'


export var gatewayApiV1 = api.createCustomAxios(gatewayApiV1BasePath, gatewayApiV1Version);

export var gatewayApiV1UsersPost = (newUser) => {
  return gatewayApiV1.post(usersRoute.toString(), newUser);
};
