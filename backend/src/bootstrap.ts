import "reflect-metadata"
import { App } from "./app"
import container from "./config/ContainerConfig"
import Types from "./config/Types"

const app = container.get<App>(Types.App)
app.init()
app.start()
