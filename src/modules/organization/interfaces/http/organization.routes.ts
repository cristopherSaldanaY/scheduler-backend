import { Router } from 'express'
import OrganizationApplication from '../../application/organization.application'
import { OrganizationRepository } from '../../domain/organization.repository'
import OrganizationInfraestructure from '../../infraestructure/organization.infraestructure'
import organizationController from './organization.controller'

const infraestructure: OrganizationRepository = new OrganizationInfraestructure()
const application = new OrganizationApplication(infraestructure)
const controller = new organizationController(application)

class OrganizationRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
		this.mountRoutes()
	}

	mountRoutes() {
		this.expressRouter.post('/insert', controller.insert)
		this.expressRouter.get('/list', controller.list)
		this.expressRouter.get('/listOne/:nid', controller.listOne)
	}
}

export default new OrganizationRouter().expressRouter
