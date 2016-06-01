/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import {ISignUpRespData} from '../model/ISignUpRespData';
import {SignUpDataResource} from '../resource/SignUpDataResource';

export class SignUpCtrl {
  token: string;
  message = '';
  sending = false;
  name = '';
  passwd = '';
  
  constructor(
    private $state:IStateService,
    private $stateParams:IStateParamsService,
    private signUpDataResource:SignUpDataResource
  ) {
    this.token = $stateParams['token'];
  }
  
  hasMessage():boolean {
    return this.message && this.message.length > 0;
  }
  
  submitSignUp():void {
    this.message = '';
    this.sending = true;
    var data = new this.signUpDataResource({
      token: this.token,
      name: this.name,
      passwd: this.passwd
    });
    data.$save((resp:ISignUpRespData, r:any) => {
      if(resp.success) {
        this.message = '登録しました';
        this.$state.go('user.dashboard');
      } else {
        this.message = resp.msg;
      }
    }, (e:any) => {
      this.message = 'システムエラーが発生しました';
      this.sending = false;
    });
  }
}
