import { NextFunction, Request, Response } from 'express'
import RouteApplication from '../../application/route.application'
import RouteFactory from '../../domain/route-factory'
import { IError } from '../../../shared/ierror'
import { RouteInsertMapping } from './dto/route-insert.dto'
import { RouteListMapping } from './dto/route-list.dto'
import { RouteUpdateMapping } from './dto/route-update.dto'
import { RouteDeleteMapping } from './dto/route-delete.dto'
import { RouteListByOrganizationMapping } from './dto/route.listByOrganization.dto'

export default class {
	constructor(private application: RouteApplication) {
		this.insert = this.insert.bind(this)
		this.list = this.list.bind(this)
		this.listByOrganization = this.listByOrganization.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async insert(req: Request, res: Response, next: NextFunction) {
		const { starts_at, ends_at, travel_time, total_stops, action, organization_id, driver_id, vehicle_id } = req.body
		const routeResult = await new RouteFactory().create(
			starts_at,
			ends_at,
			travel_time,
			total_stops,
			action,
			organization_id,
			driver_id,
			vehicle_id,
		)



		if (routeResult.isErr()) {
			const err: IError = new Error(routeResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const data = await this.application.insert(routeResult.value)
			const result = new RouteInsertMapping().execute(data.properties())
			res.status(201).json(result)
		}
	}

	async list(_req: Request, res: Response) {
		const list = await this.application.list()
		const result = new RouteListMapping().execute(list.map(route => route.properties()))
		res.json(result)
	}

	async listByOrganization(req: Request, res: Response) {
		const { nid } = req.params
		const list = await this.application.listByOrganization(nid)

		const result = new RouteListByOrganizationMapping().execute(list.map(route => route.properties()))
		res.json(result)
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { nid } = req.params
		const fieldsToUpdate = req.body

		const dataResult = await this.application.update(nid, fieldsToUpdate)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 409
			return next(err)
		} else {
			const result = new RouteUpdateMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { nid } = req.params

		const dataResult = await this.application.delete(nid)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		} else {
			const result = new RouteDeleteMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}
}
