/// <reference path="../../../../typings/tsd.d.ts"/>

import IResource = ng.resource.IResource;
import IResourceClass = ng.resource.IResourceClass
import {ISignUpData} from '../model/ISignUpData'

interface ISignUpDataResource extends ISignUpData,IResource<ISignUpData> {}
export type SignUpDataResource = IResourceClass<ISignUpDataResource>
