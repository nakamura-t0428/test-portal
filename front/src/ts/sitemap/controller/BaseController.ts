/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;

import {MyInfoResource} from '../../common/resource/MyInfoResource';
import {IMyInfoResp} from '../../common/model/IMyInfoResp';
import {SiteMapResource} from '../../common/resource/SiteMapResource';

const INVALID_ST = 'invalid';
const SIGNIN_ST = 'signin';

export class SignUpController {
  public myInfo:IMyInfoResp;

  constructor(
    private $state:IStateService,
    private $stateParams:IStateParamsService,
    private myInfoResource:MyInfoResource,
    private sitemapResource:SiteMapResource
  ) {
    console.log('baseCtrl');
    myInfoResource.get((resp:IMyInfoResp) => {
      console.log(resp);
      this.myInfo = resp;
      if(!resp || !resp.success) {
        // ログイン画面へ
        this.$state.go(SIGNIN_ST);
      }
    }, (e:any) => {
      // ログイン画面へ
      this.$state.go(SIGNIN_ST);
    });

    myInfoResource.get((resp:IMyInfoResp) => {
      console.log(resp);
      this.myInfo = resp;
      if(!resp || !resp.success) {
        this.$state.go(INVALID_ST);
      }
    }, (e:any) => {
      this.$state.go(INVALID_ST);
    });
  }
}
