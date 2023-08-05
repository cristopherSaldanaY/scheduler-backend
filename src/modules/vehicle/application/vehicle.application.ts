import { VehicleUpdate } from '../domain/interfaces/vehicleUpdate.interface'
import Vehicle from '../domain/vehicle'
import { VehicleRepository } from '../domain/vehicle.repository'

export default class VehicleApplication {
	constructor(private readonly vehicleRepository: VehicleRepository) {}

	insert(vehicle: Vehicle) {
		return this.vehicleRepository.insert(vehicle)
	}

	list() {
		return this.vehicleRepository.list()
	}

	listByOrganization(nid: string){
        return this.vehicleRepository.listByOrganization(nid)
    }

	update(nid: string, vehicle: Partial<VehicleUpdate>) {
		return this.vehicleRepository.update(nid, vehicle)
	}

	delete(nid: string) {
		return this.vehicleRepository.delete(nid)
	}
}
