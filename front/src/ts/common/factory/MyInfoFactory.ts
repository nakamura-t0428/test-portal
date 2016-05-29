import {AuthService} from "../service/AuthService";
import {IMyInfoResp} from "../model/MyInfoResp";

export function MyInfoFactory(config:AuthService, myInfoData:ng.resource.IResourceClass<any>){
  return myInfoData.get(
    function(resp:IMyInfoResp) {
      if(resp.success) {
        console.log(resp);
        return resp;
      } else {
        console.log('failed to get myInfo');
        alert("認証情報の取得に失敗しました。再度ログインしてください。");
        window.location.href="/";
      }
    },
    function(e:any) {
      console.log(e);
    }
  );
}
