/// <reference path="../../../../typings/tsd.d.ts"/>

import {ConfigService} from "../service/ConfigService";

export class AuthRequestService {
  constructor(
    private config:ConfigService,
    private $q:angular.IQService,
    private $window: angular.IWindowService,
    private $localStorage: angular.storage.IStorageProvider
   ) {
  }
  public request = (config:angular.IRequestConfig) => {
    if(config.url.indexOf(this.config.apiPref)==0) {
      config.headers = config.headers || {};
      console.log(this.$localStorage.get<string>('authToken'));
      if (this.$localStorage.get<string>('authToken')) {
        config.headers['Authorization'] = 'Bearer ' + this.$localStorage.get<string>('authToken');
      }
    }
    return config;
  }
  public response = (response:angular.IHttpPromiseCallbackArg<any>) => {
    if(response.config.url.indexOf(this.config.apiPref)==0 && response.headers('Auth-Token')) {
      this.$localStorage.set<string>('authToken', response.headers('Auth-Token'));
      console.log('authToken updated.');
    } else if (response.status == 403 && response.data['errId'] == 'authorization_error') {
      this.$localStorage.set<string>('authToken', undefined);
      console.log('authToken deleted by AuthError.');
      this.$window.location.href = '/';
    }
    return response;
  }
  public responseError = (response:angular.IHttpPromiseCallbackArg<any>) => {
    if (response.status === 401 || response.status === 403) {
      this.$localStorage.set<string>('authToken', undefined);
      console.log('authToken deleted by ResponseError.');
      this.$window.location.href = '/';
    }
    return this.$q.reject(response);
  }
}
