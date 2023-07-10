import "reflect-metadata"
import dotenv from "dotenv"
import { InversifyExpressServer } from "inversify-express-utils"
import container from "./config/ContainerConfig"
import express, { Application } from "express"
// Register controller
import "./modules/post/application"
import "./modules/user/application"
import "./modules/comment/application"
import "./modules/category/application"
import { injectable, inject } from "inversify"
import { DataSource } from "typeorm"
import { errorHandler, notFound } from "./shared/middleware/errorHandler"
import Types from "./config/Types"
import cors from "cors"

@injectable()
export class App {
  private app: Application
  private server: InversifyExpressServer
  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.server = new InversifyExpressServer(container)
  }

  public init() {
    dotenv.config()
    this._initializeDB()
    this._initializeMiddleware()
    this._initializeErrorHandler()
    this.app = this.server.build()
  }

  public start() {
    this.app.listen(5000, () => {
      console.log("server is running")
    })
  }

  private _initializeDB(): void {
    this.dataSource
      .initialize()
      .then(() => {
        console.log("DB is successfully connected!")
      })
      .catch((err) => {
        console.log("Error during Data Source initialization")
        console.error(err)
      })
  }

  private _initializeMiddleware(): void {
    this.server.setConfig((app) => {
      // app.use(cors({ origin: "http://frontend" }))
      app.get("/favicon.ico", function (req, res) {
        res.sendStatus(204)
      })
      app.use(express.urlencoded({ extended: false }))
      app.use(express.json())
    })
  }

  private _initializeErrorHandler(): void {
    this.server.setErrorConfig((app) => {
      app.use("*", notFound)
      app.use(errorHandler)
      app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send("Something broke!")
      })
    })
  }
}
