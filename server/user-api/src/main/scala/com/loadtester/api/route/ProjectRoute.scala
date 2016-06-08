package com.loadtester.api.route

import scala.util.{Success,Failure}
import scala.concurrent.{
  ExecutionContext,
  Future
}
import spray.routing._
import com.typesafe.scalalogging.LazyLogging
import com.loadtester.data.dto.ProjectReg
import com.loadtester.api.json.request.ProjectRegister
import com.loadtester.api.db.{DbServices => db}
import com.loadtester.api.util.CustomDirectives
import spray.httpx.SprayJsonSupport._
import com.loadtester.api.json.JsonSupport._
import com.loadtester.api.json.ProjectJsonSupport._
import com.loadtester.api.json.request.{ProjectRegister}
import com.loadtester.api.json.response.{FailureMessage, SuccessMessage, SysErrMessage, ProjectInfoResponse}
import spray.http.StatusCodes
import spray.util.LoggingContext
import com.loadtester.api.json.response.ProjectInfoResponse
import com.loadtester.api.json.response.ProjectList
import com.loadtester.api.json.response.ProjectList
import com.loadtester.api.json.response.ProjectInfoResponse
import com.loadtester.data.dto.Limit

trait ProjectRoute extends HttpService with LazyLogging {
  implicit def exceptionHandler(implicit log:LoggingContext):ExceptionHandler
  implicit val executionContext: ExecutionContext
  
  val projectRoute = CustomDirectives.verifyToken { userId =>
    path("project") {
      post {
        entity(as[ProjectRegister]) {prj => 
          onComplete(db.projectService.createProject(ProjectReg(prj.name, userId))) {
            case Success(p) => complete{
              ProjectInfoResponse(prjId = p.prjId, name = p.name)
            }
            case Failure(e) => complete {
              logger.error("SystemError", e)
              SysErrMessage()
            }
          }
        }
      } ~
      get {
        parameters("limit".as[Int], "page".as[Int]) {(limit, page) => 
          val dbRes = db.projectService.myProjects(userId, Limit(limit min 50 , page))
          onComplete(dbRes) {
            case Success(prjs) => complete{
              ProjectList(prjs.map(p => ProjectInfoResponse(p.prjId, p.name)).toList)
            }
            case Failure(e) => complete{
              logger.error("SystemError", e)
              SysErrMessage()
            }
          }
        }
      }
    }
  }
}
