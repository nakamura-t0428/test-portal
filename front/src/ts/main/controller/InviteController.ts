/// <reference path="../../../../typings/tsd.d.ts"/>

import IStateService = angular.ui.IStateService;
import IStateParamsService = angular.ui.IStateParamsService;
import {InviteDataResource} from '../resource/InviteDataResource'
import {MsgControllerBase} from '../../common/controller/MsgControllerBase';
import {IInviteRespData} from '../model/IInviteRespData';
import {IInviteData} from '../model/IInviteData';

export class InviteController extends MsgControllerBase {
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
        super.pushMessage('招待メールを送信しました');
        this.mailSent = true;
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