/// <reference path="../../../typings/tsd.d.ts"/>

import "angular";
import "angular-resource";
import "angular-animate";
import "ngstorage";
import "angular-bootstrap";
import "angular-ui-router";
import "angular-loading-bar";

import IHttpProvider = angular.IHttpProvider;
import IStateProvider = ng.ui.IStateProvider;
import IUrlRouterProvider= ng.ui.IUrlRouterProvider;

let app = angular.module('sitemap.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'angular-loading-bar']);

//////////////////////////////////////////////////////// Config
import {ConfigService} from "../common/service/ConfigService";
app.factory('config', [() => new ConfigService()]);

import {Sitemap} from './sitemap/Sitemap';
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  ($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider, $httpProvider:IHttpProvider) =>
    new Sitemap($stateProvider, $urlRouterProvider, $httpProvider)]);

import {AuthConfig} from '../common/config/AuthConfig';
app.config(['$httpProvider', ($httpProvider:IHttpProvider) => new AuthConfig($httpProvider)]);
