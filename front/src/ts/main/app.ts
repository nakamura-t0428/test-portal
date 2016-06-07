/// <reference path="../../../typings/tsd.d.ts"/>

import "angular";
import "angular-resource";
import "angular-animate";
import "ngstorage";
import "angular-bootstrap";
import "angular-ui-router";
import "angular-loading-bar";
import IStateProvider = ng.ui.IStateProvider;
import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;
import IHttpProvider = angular.IHttpProvider;
import IResourceService = ng.resource.IResourceService;
import IStorageService = angular.storage.IStorageService;

////////////////////////////////////////////////// TypeScript

let app = angular.module('main.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'angular-loading-bar']);

//////////////////////////////////////////////////////// Config
import {ConfigService} from "../common/service/ConfigService";
app.factory('config', [() => new ConfigService()]);

//////////////////////////////////////////////////////// Resource
import {SignInDataResourceFactory, SignInDataResource} from '../common/resource/SignInDataResource';
app.factory('signInDataResource', ['config', '$resource', SignInDataResourceFactory]);

import {SignUpDataResourceFactory, SignUpDataResource} from './resource/SignUpDataResource';
app.factory('signUpDataResource', ['config', '$resource', SignUpDataResourceFactory]);

import {MyInfoResourceFactory, MyInfoResource} from '../common/resource/MyInfoResource';
app.factory('myInfoResource', ['config', '$resource', MyInfoResourceFactory]);

import {InviteDataResourceFactory, InviteDataResource} from './resource/InviteDataResource';
app.factory('inviteDataResource', ['config', '$resource', InviteDataResourceFactory]);

import {ProjectDataResourceFactory, ProjectDataResource} from './resource/ProjectDataResource';
app.factory('projectDataResource', ['config', '$resource', ProjectDataResourceFactory]);

//////////////////////////////////////////////////////// Controller
import {SignInController} from '../common/controller/SignInController';
app.controller('signInController', ['$state', 'signInDataResource',
  ($state:IStateService, signInDataResource: SignInDataResource) =>
    new SignInController($state, signInDataResource)]);

import {SignUpController} from './controller/SignUpController';
app.controller('signUpController', ['$state', '$stateParams', 'signUpDataResource',
  ($state:IStateService, $stateParams: IStateParamsService, signUpDataResource: SignUpDataResource) =>
    new SignUpController($state, $stateParams, signUpDataResource)]);

import {InviteController} from './controller/InviteController';
app.controller('inviteController', ['$state', 'inviteDataResource',
  ($state:IStateService, inviteDataResource: InviteDataResource) =>
    new InviteController($state, inviteDataResource)]);

import {ProjectController} from './controller/ProjectController';
app.controller('projectController', ['$state', 'projectDataResource',
  ($state:IStateService, projectDataResource: ProjectDataResource) =>
    new ProjectController(projectDataResource)]);

// import {GuestController} from './controller/GuestController';
// import {IMyInfoResp} from '../common/model/IMyInfoResp';
// app.controller('guestController', ['$state', 'myInfo', 'isLogin',
//   ($state:IStateService, myInfo: IMyInfoResp, isLogin:boolean) =>
//     new GuestController($state, myInfo, isLogin)]);

////////////////////////////////////////////////////////// Config    
import {Sitemap} from './sitemap/Sitemap';
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  ($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider, $httpProvider:IHttpProvider) =>
    new Sitemap($stateProvider, $urlRouterProvider, $httpProvider)]);

import {AuthConfig} from '../common/config/AuthConfig';
app.config(['$httpProvider', ($httpProvider:IHttpProvider) => new AuthConfig($httpProvider)]);

// import {AuthService} from '../common/service/AuthService';
// app.service('authService', ['$state', '$localStorage',
//   ($state:IStateService, $localStorage:IStorageService) =>
//     new AuthService($state, $localStorage)]);
