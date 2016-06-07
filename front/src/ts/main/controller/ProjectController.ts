/// <reference path="../../../../typings/tsd.d.ts"/>

import {IProject} from '../model/IProjectData';
import {ProjectDataResource} from '../resource/ProjectDataResource';

export class ProjectController {
  projects:IProject[];
  
  constructor(
    private projectResource:ProjectDataResource) {
      projectResource.query((resp:IProject[])=>{
        this.projects = resp;
      })
  }
}
