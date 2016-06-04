/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import {ISignInData} from '../model/ISignInData'
import {ISignInRespData} from '../model/ISignInRespData';
import {SignInDataResource} from '../resource/SignInDataResource'
import {MsgControllerBase} from './MsgControllerBase';


export class SignInController extends MsgControllerBase {
  data: ISignInData = {
    email: '',
    passwd: ''
  }
  
  constructor(
    private $state:IStateService,
    private signInDataResource: SignInDataResource
  ) {
    super();
  }
  
  submitSignIn():void {
    super.begin();
    
    let resource = new this.signInDataResource(this.data);
    resource.$save((resp:ISignInRespData, r:any) => {
      if(resp.success) {
        // 状態を更新
        super.pushMessage('サインインしました');
        this.$state.reload();
      } else {
        super.pushError(resp.msg);
      }
      super.finish();
    }, (e:any) => {
      super.pushSysError();
      super.finish();
    });
  }
  
}
