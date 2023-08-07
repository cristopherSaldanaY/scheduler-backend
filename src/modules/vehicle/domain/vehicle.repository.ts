import { Result } from 'neverthrow'
import { VehicleNotFoundException } from './exceptions/vehicle.exception'
import { VehicleUpdate } from './interfaces/vehicleUpdate.interface'
import Vehicle from './vehicle'

export interface VehicleRepository {
	insert(vehicle: Vehicle): Promise<Vehicle>
	list(): Promise<Vehicle[]>
	listOne(nid: string): Promise<Result<Vehicle, VehicleNotFoundException>>
	listByOrganization(nid: string): Promise<Vehicle[]>
	update(nid: string, vehicle: Partial<VehicleUpdate>): Promise<Result<Vehicle, VehicleNotFoundException>>
    delete(nid: string): Promise<Result<Vehicle, VehicleNotFoundException>>
}
