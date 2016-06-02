/// <reference path="../../../typings/tsd.d.ts"/>

import "angular";
import "angular-resource";
import "angular-animate";
import "ngstorage";
import "angular-ui-router";
import "angular-loading-bar";
import IStateProvider = ng.ui.IStateProvider;
import IStateService = angular.ui.IStateService;
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;
import IHttpProvider = angular.IHttpProvider;
import IResourceService = ng.resource.IResourceService;

let app = angular.module('main.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar']);

//////////////////////////////////////////////////////// Config
import {ConfigService} from "../common/service/ConfigService";
app.factory('config', [() => new ConfigService()]);

//////////////////////////////////////////////////////// Factory
import {MyInfoResourceFactory} from '../common/factory/MyInfoResourceFactory';
app.factory('myInfoResource', ['config', '$resource', MyInfoResourceFactory]);

import {InviteDataResourceFactory} from './factory/InviteDataResourceFactory';
app.factory('inviteDataResource', ['config', '$resource', InviteDataResourceFactory]);

//////////////////////////////////////////////////////// Controller
import {InviteController} from './controller/InviteController';
import {InviteDataResource} from './resource/InviteDataResource';
app.controller('inviteController', ['$state', 'inviteDataResource',
  ($state:IStateService, inviteDataResource: InviteDataResource) =>
    new InviteController($state, inviteDataResource)]);
    
import {SitemapService} from './service/SitemapService';
import {MyInfoResource} from '../common/resource/MyInfoResource';
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  ($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider, $httpProvider:IHttpProvider) =>
    new SitemapService($stateProvider, $urlRouterProvider, $httpProvider)]);
