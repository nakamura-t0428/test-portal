/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module app.conf {
  export class AppConfig {
    apiPref:string = 'http://localhost:8090';
    constructor() {}
  }
}

angular.module('app.conf', []);
angular.module('app.conf').factory('appConfig', [() => {return new app.conf.AppConfig();}]);
