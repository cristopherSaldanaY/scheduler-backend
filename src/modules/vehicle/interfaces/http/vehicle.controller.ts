import { NextFunction, Request, Response } from 'express';
import VehicleApplication from '../../application/vehicle.application'
import VehicleFactory from '../../domain/vehicle-factory';
import { IError } from '../../../shared/ierror';
import { VehicleInsertMapping } from './dto/vehicle-insert.dto';
import { VehicleListMapping } from './dto/vehicle-list.dto';

export default class {
	constructor(private application: VehicleApplication) {
        this.insert = this.insert.bind(this)
        this.list = this.list.bind(this)
    }

    async insert(req: Request, res: Response, next: NextFunction){
        const { plate, organization_id } = req.body

        const vehicleResult = await new VehicleFactory().create(plate, organization_id)

        if(vehicleResult.isErr()){
            const err: IError = new Error(vehicleResult.error.message)
            err.status = 411
            return next(err)
        } else {
            const data = await this.application.insert(vehicleResult.value)
            const result = new VehicleInsertMapping().execute(data.properties())
            res.status(201).json(result)
        }
    }

    async list(_req: Request, res: Response){
        const list = await this.application.list()
        const result = new VehicleListMapping().execute(list.map( vehicle => vehicle.properties()))
        res.json(result)
    }

    /*
    
    async update(){}

    async delete(){}
    

     */
}
