package com.loadtester.data.service

import com.loadtester.data.db.ServiceDb
import com.loadtester.data.dto.ProjectReg
import github.nakamura_t0428.util.helper.UUIDHelper
import com.loadtester.data.model.Project
import github.nakamura_t0428.util.helper.DateHelper.now
import scala.concurrent.ExecutionContext.Implicits.global

class ProjectService(val dbm:ServiceDb) {
  import dbm.db
  import dbm.driver.api._
  
  def createProject(prjReg:ProjectReg) = {
    val prj = Project(
        UUIDHelper.uuidAsBase64,
        prjReg.name,
        prjReg.ownerId,
        now
        )
    val q = dbm.projectTbl += prj
    db.run(q.map(_ => prj))
  }
}