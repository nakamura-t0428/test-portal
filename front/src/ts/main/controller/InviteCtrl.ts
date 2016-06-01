/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import {InviteDataResource} from '../resource/InviteDataResouce'
import {MsgCtrlBase} from 'MsgCtrlBase';
import {IInviteRespData} from '../model/IInviteRespData';
import {IInviteData} from '../model/IInviteData';

export class InviteCtrl extends MsgCtrlBase {
  data: IInviteData = {
    email: ''
  };
  mailSent = false;
  
  constructor(
    private $state:IStateService,
    private inviteDataResource: InviteDataResource
  ) {
    super();
  }
  
  submitInvitatioin():void {
    super.begin();
    
    let newRes = new this.inviteDataResource(this.data);
    newRes.$save((resp:IInviteRespData, r:any)=>{
      if(resp.success) {
        this.message = '招待メールを送信しました';
        this.mailSent = true;
      } else {
        this.message = resp.msg;
      }
      super.finish();
    }, (e:any) => {
      this.message = 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。';
      super.finish();
    });
  }
}