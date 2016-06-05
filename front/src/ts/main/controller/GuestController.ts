/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import {MyInfoResource} from '../../common/resource/MyInfoResource';
import {IMyInfoResp} from '../../common/model/IMyInfoResp';

export class GuestController {
  constructor(
    private $state:IStateService,
    private myInfoResource:MyInfoResource) {
      myInfoResource.get(function(resp:IMyInfoResp) {
        if(resp && resp.success) {
          $state.go('user.top');
        }
      });
  }
}
