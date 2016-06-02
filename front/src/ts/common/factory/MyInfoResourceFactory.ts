/// <reference path="../../../../typings/tsd.d.ts"/>

import {ConfigService} from '../service/ConfigService';
import IResourceService = ng.resource.IResourceService;
import {IMyInfoResource} from '../resource/MyInfoResource'

export function MyInfoResourceFactory(config:ConfigService, $resource:IResourceService) {
  return $resource<IMyInfoResource>(config.apiPref + '/myinfo');
}
