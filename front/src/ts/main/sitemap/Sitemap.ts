/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateProvider = ng.ui.IStateProvider;
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;
import IHttpProvider = angular.IHttpProvider;
import {MyInfoResource} from '../../common/resource/MyInfoResource';

export class Sitemap {
  constructor(
    private $stateProvider:IStateProvider,
    private $urlRouterProvider:IUrlRouterProvider,
    private $httpProvider:IHttpProvider
  ) {
    $urlRouterProvider.otherwise('/guest')
    $stateProvider
    .state('guest', {
      url: '/guest',
      templateUrl: 'guest/top.html',
    })
  }
}
