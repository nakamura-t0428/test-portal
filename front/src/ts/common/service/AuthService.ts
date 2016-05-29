/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../../typings/ngstorage/ngstorage.d.ts"/>

export class AuthService {
  constructor(
    protected $window:ng.IWindowService,
    private $localStorage:angular.storage.IStorageService
  ) {}
  logout() {
    this.$localStorage.$reset();
    this.$window.location.href = '/';
  }
}
