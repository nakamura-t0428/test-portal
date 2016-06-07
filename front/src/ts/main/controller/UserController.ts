/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStorageService = angular.storage.IStorageService;

import {MyInfoResource} from '../../common/resource/MyInfoResource';
import {IMyInfoResp} from '../../common/model/IMyInfoResp';

const GUEST_TOP_ST = 'guest.top';

export class UserController {
  myInfo:IMyInfoResp;
  
  constructor(
    private $state:IStateService,
    private $localStorage:IStorageService,
    private myInfoResource:MyInfoResource) {
      console.log('userCtrl');
      myInfoResource.get((resp:IMyInfoResp) => {
        console.log(resp);
        this.myInfo = resp;
        if(!resp || !resp.success) {
          this.$state.go(GUEST_TOP_ST);
        }
      }, (e:any) => {
        this.$state.go(GUEST_TOP_ST);
      });
  }
  
  signOut() {
    this.$localStorage.$reset();
    this.$state.go(GUEST_TOP_ST);
  }
}
