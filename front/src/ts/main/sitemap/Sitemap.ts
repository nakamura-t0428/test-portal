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
    $urlRouterProvider.otherwise('/guest/top')
    $stateProvider
    .state('guest', {
      abstract: true,
      url: '/guest',
      templateUrl: 'guest/base.html',
    })
    $stateProvider
    .state('guest.top', {
      url: '/top',
      templateUrl: 'guest/top.html',
    })
    $stateProvider
    .state('guest.invite', {
      url: '/invite',
      templateUrl: 'guest/invite.html',
    })
    $stateProvider
    .state('guest.signup', {
      url: '/signup/:token',
      templateUrl: 'guest/signup.html',
    })
  }
}
