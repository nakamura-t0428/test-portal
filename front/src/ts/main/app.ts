/// <reference path="../../../typings/tsd.d.ts"/>

import * as angular from "angular";
import {ConfigService} from "../common/service/ConfigService";

let app = angular.module('main.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar']);
app.service('config', [() => new ConfigService()]);
