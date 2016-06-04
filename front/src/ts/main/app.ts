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
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;
import IHttpProvider = angular.IHttpProvider;
import IResourceService = ng.resource.IResourceService;

////////////////////////////////////////////////// TypeScript

let app = angular.module('main.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'angular-loading-bar']);

//////////////////////////////////////////////////////// Config
import {ConfigService} from "../common/service/ConfigService";
app.factory('config', [() => new ConfigService()]);

//////////////////////////////////////////////////////// Resource
import {SignInDataResourceFactory, SignInDataResource} from '../common/resource/SignInDataResource';
app.factory('signInDataResource', ['config', '$resource', SignInDataResourceFactory]);

import {MyInfoResourceFactory, MyInfoResource} from '../common/resource/MyInfoResource';
app.factory('myInfoResource', ['config', '$resource', MyInfoResourceFactory]);

import {InviteDataResourceFactory, InviteDataResource} from './resource/InviteDataResource';
app.factory('inviteDataResource', ['config', '$resource', InviteDataResourceFactory]);

//////////////////////////////////////////////////////// Controller
import {SignInController} from '../common/controller/SignInController';
app.controller('signInController', ['$state', 'signInDataResource',
  ($state:IStateService, signInDataResource: SignInDataResource) =>
    new SignInController($state, signInDataResource)]);

import {InviteController} from './controller/InviteController';
app.controller('inviteController', ['$state', 'inviteDataResource',
  ($state:IStateService, inviteDataResource: InviteDataResource) =>
    new InviteController($state, inviteDataResource)]);
    
import {Sitemap} from './sitemap/Sitemap';
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  ($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider, $httpProvider:IHttpProvider) =>
    new Sitemap($stateProvider, $urlRouterProvider, $httpProvider)]);
