import { VehicleOptional } from '../interfaces/vehicleOptional.interface'
import { VehicleRequired } from '../interfaces/vehicleRequired.interface'

export type VehicleProperties = Required<VehicleRequired> & Partial<VehicleOptional>
