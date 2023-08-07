import { Router } from 'express'
import VehicleApplication from '../../application/vehicle.application'
import { VehicleRepository } from '../../domain/vehicle.repository'
import VehicleInfraestructure from '../../infraestructure/vehicle.infraestructure'
import vehicleController from './vehicle.controller'

const infraestructure: VehicleRepository = new VehicleInfraestructure()
const application = new VehicleApplication(infraestructure)
const controller = new vehicleController(application)


class VehicleRouter {
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

export default new VehicleRouter().expressRouter
