import { NextFunction, Request, Response } from 'express'
import DriverApplication from '../../application/driver.application'
import DriverFactory from '../../domain/driver-factory'
import { IError } from 'src/modules/shared/ierror'
import { DriverInsertMapping } from './dto/driver-insert.dto'
import { DriverListMapping } from './dto/driver-list.dto'

export default class {
	constructor(private application: DriverApplication) {
		this.insert = this.insert.bind(this)
        this.list = this.list.bind(this)
        this.listByOrganization = this.listByOrganization.bind(this)
	}

    async insert(req: Request, res: Response, next: NextFunction){
        const { name, lastname, organization_id } = req.body

        const driverResult = await new DriverFactory().create(name, lastname, organization_id)

        if(driverResult.isErr()){
            const err: IError = new Error(driverResult.error.message)
            err.status = 411
            return next(err)
        } else {
            const data = await this.application.insert(driverResult.value)
            const result = new DriverInsertMapping().execute(data.properties())
            res.status(201).json(result)
        }
    }

    async list(_req: Request, res: Response){
        const list = await this.application.list()
        const result = new DriverListMapping().execute(list.map( driver => driver.properties()))
        res.json(result)
    }

    async listByOrganization(req: Request, res: Response){
        const {nid } = req.params
        const list = await this.application.listByOrganization(nid)

        const result = new DriverListMapping().execute(list.map(driver => driver.properties()))
        res.json(result)
    }

    /* 
        async update(){}
    
        async delete(){}
    */


}
