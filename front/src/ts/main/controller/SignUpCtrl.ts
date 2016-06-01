/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import {ISignUpData} from '../model/ISignUpData';
import {ISignUpRespData} from '../model/ISignUpRespData';
import {SignUpDataResource} from '../resource/SignUpDataResource';
import {MsgCtrlBase} from 'MsgCtrlBase';

export class SignUpCtrl extends MsgCtrlBase {
  data: ISignUpData = {
    token: '',
    name: '',
    passwd: ''
  };
  
  constructor(
    private $state:IStateService,
    private $stateParams:IStateParamsService,
    private signUpDataResource:SignUpDataResource
  ) {
    super();
    this.data.token = $stateParams['token'];
  }
  
  submitSignUp():void {
    super.begin();
    let newRes = new this.signUpDataResource(this.data);
    newRes.$save((resp:ISignUpRespData, r:any) => {
      if(resp.success) {
        this.message = '登録しました';
        this.$state.go('user.dashboard');
      } else {
        this.message = resp.msg;
      }
      super.finish();
    }, (e:any) => {
      this.message = 'システムエラーが発生しました';
      super.finish();
    });
  }
}
