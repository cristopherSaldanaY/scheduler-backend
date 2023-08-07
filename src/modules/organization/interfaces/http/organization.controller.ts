import { NextFunction, Request, Response } from 'express';
import OrganizationApplication from '../../application/organization.application'
import OrganizationFactory from '../../domain/organization-factory';
import { IError } from 'src/modules/shared/ierror';
import { OrganizationInsertMapping } from './dto/organization-insert.dto';
import { OrganizationListMapping } from './dto/organization-list.dto';
import { OrganizationListOneMapping } from './dto/organization-listOne.dto';

export default class {
	constructor(private application: OrganizationApplication){
        this.insert = this.insert.bind(this)
        this.list = this.list.bind(this)
        this.listOne = this.listOne.bind(this)
    }

    async insert(req: Request, res: Response, next: NextFunction){
        const { name } = req.body

        const organizationResult = await new OrganizationFactory().create(name)

        if(organizationResult.isErr()){
            const err: IError = new Error(organizationResult.error.message)
            err.status = 411
            return next(err)
        } else {
            const data = await this.application.insert(organizationResult.value)
            const result = new OrganizationInsertMapping().execute(data.properties())
            res.status(201).json(result)
        }
    }

    async list(_req: Request, res: Response){
        const list = await this.application.list()
        const result = new OrganizationListMapping().execute(list.map(organization => organization.properties()))
        res.json(result)
    }

    async listOne(req: Request, res: Response){
        const { nid } = req.params

        const organizationResult = await this.application.listOne(nid)

        if(organizationResult.isErr()){
            return res.status(404).send(organizationResult.error.message)
        } else if(organizationResult.isOk()){
            const result = new OrganizationListOneMapping().execute(organizationResult.value.properties())
            return res.json(result)
        }
    }
    /* 
    
    async update(){}

    async delete(){}
    
    */
}
