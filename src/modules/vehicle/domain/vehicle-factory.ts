import { v4 as uuidv4 } from 'uuid'
import { Result, err, ok } from 'neverthrow'
import { VehicleOrganizationRequiredException, VehiclePlateRequiredException } from './exceptions/vehicle.exception'
import Vehicle from './vehicle'
import { VehicleProperties } from './types/vehicleProperties.type'

export type VehicleResult = Result<Vehicle, VehiclePlateRequiredException | VehicleOrganizationRequiredException>

export default class VehicleFactory {
	async create(plate: string, organization_id: string): Promise<VehicleResult> {
		if (!plate || plate.trim() === '') {
			return err(new VehiclePlateRequiredException())
		}

		if (!organization_id || organization_id.trim() === '') {
			return err(new VehicleOrganizationRequiredException())
		}

		const vehicleProperties: VehicleProperties = {
			plate,
			organization_id,
			nid: uuidv4(),
		}

		const vehicle = new Vehicle(vehicleProperties)
		return ok(vehicle)
	}
}
