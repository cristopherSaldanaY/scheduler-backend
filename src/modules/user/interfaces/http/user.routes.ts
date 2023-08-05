import { Router } from 'express'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import UserApplication from '../../application/user.application'
import userController from './user.controller'


const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure)
const controller = new userController(application)

class UserRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
        this.mountRoutes()
	}

	mountRoutes() {
		this.expressRouter.post('/insert', controller.insert)
		this.expressRouter.get('/list', controller.list)
		this.expressRouter.post('/login', controller.login)
	}
}

export default new UserRouter().expressRouter