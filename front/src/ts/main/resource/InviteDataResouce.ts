/// <reference path="../../../../typings/tsd.d.ts"/>

import IResource = ng.resource.IResource;
import IResourceClass = ng.resource.IResourceClass
import {IInviteData} from '../model/IInviteData'

interface IInviteDataResource extends IInviteData,IResource<IInviteData> {}
export type InviteDataResource = IResourceClass<IInviteDataResource>
