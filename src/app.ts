import express, { Application } from 'express'
import cors from 'cors'
import routerHealth from './helpers/health'
import HandlerErrors from './helpers/errors'
import routerUser from './modules/user/interfaces/http/user.routes'
import routerOrganization from './modules/organization/interfaces/http/organization.routes'
import routerVehicle from './modules/vehicle/interfaces/http/vehicle.routes'
import routerDriver from './modules/driver/interfaces/http/driver.routes'
import routerRoute from './modules/route/interfaces/http/route.routes'

class App {
	readonly expressApp: Application

	constructor() {
		this.expressApp = express()
		this.owaspSecurityMiddlewares()
		this.mountHealthCheck()
		this.mountMiddlewares()
		this.mountRoutes()
		this.mountError()
	}

	owaspSecurityMiddlewares(){
		this.expressApp.use(cors({
			origin: '*',
			optionsSuccessStatus: 200,
			methods: ['GET', 'POST', 'PUT', 'DELETE']
		}))
	}

	mountHealthCheck() {
		this.expressApp.use('/', routerHealth)
	}

	mountMiddlewares() {
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded({ extended: true }))
	}

	mountRoutes(): void {
		this.expressApp.use('/user', routerUser)
		this.expressApp.use('/organization', routerOrganization)
		this.expressApp.use('/vehicle', routerVehicle)
		this.expressApp.use('/driver', routerDriver )
		this.expressApp.use('/route', routerRoute)
	}

	mountError(): void {
		this.expressApp.use(HandlerErrors.notFound)
	}
}

export default new App().expressApp
