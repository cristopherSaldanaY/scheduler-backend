import { Router } from 'express'
import DriverApplication from '../../application/driver.application'
import { DriverRepository } from '../../domain/driver.repository'
import DriverInfraestructure from '../../infraestructure/driver.infraestructure'
import driverController from './driver.controller'

const infraestructure: DriverRepository = new DriverInfraestructure()
const application = new DriverApplication(infraestructure)
const controller = new driverController(application)

class DriverRouter {
    readonly expressRouter: Router
    
    constructor(){
        this.expressRouter = Router()
        this.mountRoutes()
    }

    mountRoutes(){
        this.expressRouter.post('/insert', controller.insert)
        this.expressRouter.get('/list', controller.list)
        this.expressRouter.get('/listByOrganization/:nid', controller.listByOrganization)
        this.expressRouter.get('/listOne/:nid', controller.listOne)
    }
}

export default new DriverRouter().expressRouter