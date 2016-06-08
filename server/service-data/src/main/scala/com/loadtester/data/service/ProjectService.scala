package com.loadtester.data.service

import com.loadtester.data.db.ServiceDb
import com.loadtester.data.dto.ProjectReg
import github.nakamura_t0428.util.helper.UUIDHelper
import com.loadtester.data.model.Project
import github.nakamura_t0428.util.helper.DateHelper.now
import scala.concurrent.ExecutionContext.Implicits.global
import com.loadtester.data.dto.ProjectInfo
import com.loadtester.data.dto.UserInfo
import com.loadtester.data.dto.ProjectInfo
import com.loadtester.data.dto.UserInfo
import scala.concurrent.Future
import com.loadtester.data.dto.Limit
import com.loadtester.data.dto.DefaultLimit

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
  
  def ownProjects(userId:String, limit:Limit):Future[Seq[ProjectInfo]] = {
    val q = for{
      prj <- dbm.projectTbl if prj.ownerId === userId
      owner <- dbm.userTbl if owner.userId === prj.ownerId
    } yield (prj.prjId, prj.prjName, owner.userId, owner.name, prj.regDate)
    
    val res = q.sortBy(_._5).drop(limit.limit * limit.page).take(limit.limit)
      .result.map(_.map{case (prjId, prjName, ownerId, ownerName, regDate) =>
        {ProjectInfo(prjId, prjName, UserInfo(ownerId, ownerName))}})
    
    db.run(res)
  }
  
  def myProjects(userId:String, limit:Limit = DefaultLimit):Future[Seq[ProjectInfo]] = {
    val q1 = for{
      prj <- dbm.projectTbl if prj.ownerId === userId
      owner <- dbm.userTbl if owner.userId === prj.ownerId
    } yield (prj.prjId, prj.prjName, owner.userId, owner.name, prj.regDate)
    val q2 = for{
      prjUser <- dbm.PrjUserTbl if prjUser.userId === userId
      prj <- dbm.projectTbl if prj.prjId === prjUser.prjId
      owner <- dbm.userTbl if owner.userId === prj.ownerId
    } yield (prj.prjId, prj.prjName, owner.userId, owner.name, prj.regDate)
    
    val q = {q1 union q2}.distinctOn(_._1).sortBy(_._5)
    
    val res = q.drop(limit.limit * limit.page).take(limit.limit)
      .result.map(_.map{case (prjId, prjName, ownerId, ownerName, regDate) =>
        {ProjectInfo(prjId, prjName, UserInfo(ownerId, ownerName))}})
    
    db.run(res)
  }
}
