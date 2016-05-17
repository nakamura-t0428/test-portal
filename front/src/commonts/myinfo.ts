/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
module app.myinfo {
  export interface IMyInfoResp {
    success:boolean;
    token:String;
    email:String;
    name:String;
    msg:String;
    errId:String;
  }
  export function MyInfoFactory(appConfig:app.conf.AppConfig, myInfoData:ng.resource.IResourceClass<any>){
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
      function(e) {
        console.log(e);
      }
    );
  }
}

angular.module('app.auth').factory('myInfoData', ['appConfig', '$resource',
function(appConfig, $resource:ng.resource.IResourceService){
  var data = $resource( appConfig.apiPref + '/myinfo' );
  return data;
}]);
