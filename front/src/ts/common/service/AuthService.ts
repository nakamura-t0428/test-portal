/// <reference path="../../../../typings/tsd.d.ts"/>

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
