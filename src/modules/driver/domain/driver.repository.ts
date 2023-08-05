import { Result } from 'neverthrow'
import Driver from './driver'
import { DriverNotFoundException } from './exceptions/driver.exception'
import { DriverUpdate } from './interfaces/driverUpdate.interface'

export interface DriverRepository {
	insert(driver: Driver): Promise<Driver>
	list(): Promise<Driver[]>
	listByOrganization(nid: string): Promise<Driver[]>
	update(nid: string, driver: Partial<DriverUpdate>): Promise<Result<Driver, DriverNotFoundException>>
    delete(nid: string): Promise<Result<Driver, DriverNotFoundException>>
}
