/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateProvider = ng.ui.IStateProvider;
import IStateService = angular.ui.IStateService;
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;
import IHttpProvider = angular.IHttpProvider;
import IStorageService = angular.storage.IStorageService;

import {MyInfoResource} from '../../common/resource/MyInfoResource';

export class Sitemap {
  constructor(
    private $stateProvider:IStateProvider,
    private $urlRouterProvider:IUrlRouterProvider,
    private $httpProvider:IHttpProvider
  ) {
    $urlRouterProvider.otherwise('/guest/top')
    $stateProvider
    .state('sitemap', {
      abstract: true,
      url: '/:siteMapId',
      templateUrl: 'base.html',
      controller: 'baseController',
      controllerAs: 'baseCtrl'
    })
  }
}
