/// <reference path="../../../typings/tsd.d.ts"/>

import "angular";
import "angular-resource";
import "angular-animate";
import "ngstorage";
import "angular-ui-router";
import "angular-loading-bar";
import {ConfigService} from "../common/service/ConfigService";

let app = angular.module('main.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar']);
app.service('config', [() => new ConfigService()]);
