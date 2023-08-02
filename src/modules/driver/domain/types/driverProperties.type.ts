import { DriverOptional } from '../interfaces/driverOptional.interface'
import { DriverRequired } from '../interfaces/driverRequired.interface'

export type DriverProperties = Required<DriverRequired> & Partial<DriverOptional>
