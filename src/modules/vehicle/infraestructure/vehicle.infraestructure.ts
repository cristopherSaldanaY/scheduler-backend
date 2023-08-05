import Vehicle from '../domain/vehicle'
import { VehicleRepository } from '../domain/vehicle.repository'
import { VehicleEntity } from './vehicle.entity'
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import { VehicleUpdate } from '../domain/interfaces/vehicleUpdate.interface'
import { Result, err, ok } from 'neverthrow'
import { VehicleNotFoundException } from '../domain/exceptions/vehicle.exception'

export default class VehicleInfraestructure implements VehicleRepository {
	async insert(vehicle: Vehicle): Promise<Vehicle> {
		const vehicleInsert = new VehicleEntity()

		const { nid, plate, organization_id, active } = vehicle.properties()
		Object.assign(vehicleInsert, {
			nid,
			plate,
			organization: {
				nid: organization_id
			},
			active,
		})

		await DataBaseBootstrap.dataSource.getRepository(VehicleEntity).save(vehicleInsert)
		return vehicle
	}

	async list(): Promise<Vehicle[]> {
		const repo = DataBaseBootstrap.dataSource.getRepository(VehicleEntity)

		const result = await repo.find({ where: { active: true } })
		return result.map((el: VehicleEntity) => {
			return new Vehicle({
				nid: el.nid,
				plate: el.plate,
				organization_id: el.organizationNid,
				active: el.active,
			})
		})
	}

	async listByOrganization(nid: string): Promise<Vehicle[]>{
        const repo = DataBaseBootstrap.dataSource.getRepository(VehicleEntity)
        const result = await repo.find({where:{ organizationNid: nid}})

        return result.map((el: VehicleEntity) => {
            return new Vehicle({
				nid: el.nid,
				plate: el.plate,
				organization_id: el.organizationNid,
				active: el.active,
            })
        })
    }

	async update(nid: string, vehicle: Partial<VehicleUpdate>): Promise<Result<Vehicle, VehicleNotFoundException>> {
		const repo = DataBaseBootstrap.dataSource.getRepository(VehicleEntity)

		const vehicleFound = await repo.findOne({ where: { nid } })

		if (vehicleFound) {
			Object.assign(vehicleFound, vehicle)
			const vehicleEntity = await repo.save(vehicleFound)

			return ok(
				new Vehicle({
					nid: vehicleEntity.nid,
					plate: vehicleEntity.plate,
					organization_id: vehicleEntity.organizationNid,
					active: vehicleEntity.active,
				}),
			)
		} else {
			return err(new VehicleNotFoundException())
		}
	}

	async delete(nid: string): Promise<Result<Vehicle, VehicleNotFoundException>> {
		const repo = DataBaseBootstrap.dataSource.getRepository(VehicleEntity)

		const vehicleFound = await repo.findOne({ where: { nid } })

		if (vehicleFound) {
			vehicleFound.active = false
			const vehicleEntity = await repo.save(vehicleFound)

			return ok(
				new Vehicle({
					nid: vehicleEntity.nid,
					plate: vehicleEntity.plate,
					organization_id: vehicleEntity.organizationNid,
					active: vehicleEntity.active,
				}),
			)
		}
	}
}
