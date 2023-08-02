import { NextFunction, Request, Response } from 'express';
import UserApplication from '../../application/user.application'
import UserFactory from '../../domain/user-factory';
import { IError } from '../helpers/ierror';
import { UserInsertMapping } from './dto/user-insert.dto';
import { UserListMapping } from './dto/user-list.dto';

export default class {
	constructor(private application: UserApplication){
        this.insert = this.insert.bind(this)
        this.list = this.list.bind(this)
    }

    async insert(req: Request, res: Response, next: NextFunction){
        const { email, national_id, username, password, organization_id } = req.body

        const userResult = await new UserFactory().create(email, national_id,username, password,organization_id)

        if(userResult.isErr()){
            const err: IError = new Error(userResult.error.message)
            err.status = 411
            return next(err)
        } else {
            const data = await this.application.insert(userResult.value)
            const result = new UserInsertMapping().execute(data.properties())
            res.status(201).json(result)
        }
    }

    async list(_req: Request, res: Response){
        const list = await this.application.list()
        const result = new UserListMapping().execute(list.map(user => user.properties()))
        res.json(result)

    }

/*     

    async update(){}

    async delete(){} */
    
}
