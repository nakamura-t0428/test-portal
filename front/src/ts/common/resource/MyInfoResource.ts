/// <reference path="../../../../typings/tsd.d.ts"/>

import IResource = ng.resource.IResource;
import IResourceClass = ng.resource.IResourceClass

export interface IMyInfoResource extends IResource<IMyInfoResource> {}
export type MyInfoResource = IResourceClass<IMyInfoResource>
