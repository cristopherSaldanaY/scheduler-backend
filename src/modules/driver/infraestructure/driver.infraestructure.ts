import { DriverRepository } from '../domain/driver.repository'
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import Driver from '../domain/driver'
import { DriverEntity } from './driver.entity'
import { DriverUpdate } from '../domain/interfaces/driverUpdate.interface'
import { Result, err, ok } from 'neverthrow'
import { DriverNotFoundException } from '../domain/exceptions/driver.exception'
import databaseBootstrap from '../../../bootstrap/database.bootstrap'

export default class DriverInfraestructure implements DriverRepository {
	async insert(driver: Driver): Promise<Driver> {
		const driverInsert = new DriverEntity()

		const { nid, name, lastname, organization_id, active } = driver.properties()

		Object.assign(driverInsert, {
			nid,
			name,
			lastname,
			organization: {
				nid: organization_id,
			},
			active,
		})

		await DataBaseBootstrap.dataSource.getRepository(DriverEntity).save(driverInsert)
		return driver
	}

	async list(): Promise<Driver[]> {
		const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity)

		const result = await repo.find({ where: { active: true } })
		return result.map((el: DriverEntity) => {
			return new Driver({
				nid: el.nid,
				name: el.name,
				lastname: el.lastname,
				organization_id: el.organizationNid,
				active: el.active,
			})
		})
	}

	async listOne(nid: string): Promise<Result<Driver, DriverNotFoundException>>{
		const repo = databaseBootstrap.dataSource.getRepository(DriverEntity)
		const result = await repo.findOne({where:{nid}})
		
		if(!result){
			return err(new DriverNotFoundException())
		} else{
			return ok(
				new Driver({
					nid: result.nid,
					name: result.name,
					lastname: result.lastname,
					organization_id: result.organizationNid,
					active: result.active
				})
			)
		}
	}

	async listByOrganization(nid: string): Promise<Driver[]> {
		const repo = databaseBootstrap.dataSource.getRepository(DriverEntity)
		const result = await repo.find({ where: { organizationNid: nid } })

		return result.map((el: DriverEntity) => {
			return new Driver({
				nid: el.nid,
				name: el.name,
				lastname: el.lastname,
				organization_id: el.organizationNid,
				active: el.active,
			})
		})
	}

	async update(nid: string, driver: Partial<DriverUpdate>): Promise<Result<Driver, DriverNotFoundException>> {
		const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity)

		const driverFound = await repo.findOne({ where: { nid } })
		if (driverFound) {
			Object.assign(driverFound, driver)
			const driverEntity = await repo.save(driverFound)

			return ok(
				new Driver({
					nid: driverEntity.nid,
					name: driverEntity.name,
					lastname: driverEntity.lastname,
					organization_id: driverEntity.organization.nid,
					active: driverEntity.active,
				}),
			)
		} else {
			return err(new DriverNotFoundException())
		}
	}

	async delete(nid: string): Promise<Result<Driver, DriverNotFoundException>> {
		const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity)

		const driverFound = await repo.findOne({ where: { nid } })

		if (driverFound) {
			driverFound.active = false
			const driverEntity = await repo.save(driverFound)

			return ok(
				new Driver({
					nid: driverEntity.nid,
					name: driverEntity.name,
					lastname: driverEntity.lastname,
					organization_id: driverEntity.organization.nid,
					active: driverEntity.active,
				}),
			)
		}
	}
}
