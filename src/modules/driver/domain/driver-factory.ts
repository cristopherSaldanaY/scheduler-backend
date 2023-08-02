import { v4 as uuidv4 } from 'uuid'
import Driver from './driver'
import { DriverNameRequiredException, DriverLastnameRequiredException } from './exceptions/driver.exception'
import { Result, err, ok } from 'neverthrow'
import { DriverProperties } from './types/driverProperties.type'

export type DriverResult = Result<Driver, | DriverNameRequiredException | DriverLastnameRequiredException>

export default class DriverFactory {
    async create(name: string, lastname: string, organization: {nid: string}): Promise<DriverResult>{
        if(!name || name.trim() === ''){
            return err(new DriverNameRequiredException())
        }

        if(!lastname || lastname.trim() === ''){
            return err(new DriverLastnameRequiredException())
        }

        const driverProperties: DriverProperties = {
            name,
            lastname,
            organization: {nid: organization.nid},
            nid: uuidv4()
        }

        const driver = new Driver(driverProperties)
        return ok(driver)
    }
}