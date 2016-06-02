/// <reference path="../../../../typings/tsd.d.ts"/>

import {ConfigService} from '../../common/service/ConfigService';
import IResourceService = ng.resource.IResourceService;
import {IInviteDataResource} from '../resource/InviteDataResource';

export function InviteDataResourceFactory(config:ConfigService, $resource:IResourceService) {
  return $resource<IInviteDataResource>(config.apiPref + '/invite');
}
