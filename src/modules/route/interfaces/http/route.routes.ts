import { Router } from 'express'
import RouteApplication from '../../application/route.application'
import { RouteRepository } from '../../domain/route.repository'
import RouteInfraestructure from '../../infraestructure/route.infraestructure'
import routeController from './route.controller'

const infraestructure: RouteRepository = new RouteInfraestructure()
const application = new RouteApplication(infraestructure)
const controller = new routeController(application)

class RouteRouter{
    readonly expressRouter: Router

    constructor(){
        this.expressRouter = Router()
        this.mountRoutes()
    }

    mountRoutes(){
        this.expressRouter.post('/insert', controller.insert)
        this.expressRouter.get('/list', controller.list)
        this.expressRouter.get('/listByOrganization/:nid', controller.listByOrganization)
        this.expressRouter.put('/update/:nid', controller.update)
    }
}

export default new RouteRouter().expressRouter
