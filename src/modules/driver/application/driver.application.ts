import Driver from '../domain/driver';
import { DriverRepository } from '../domain/driver.repository'
import { DriverUpdate } from '../domain/interfaces/driverUpdate.interface';

export default class DriverApplication {
	constructor(private readonly driverRepository: DriverRepository) {}

    insert(driver: Driver){
        return this.driverRepository.insert(driver)
    }

    list(){
        return this.driverRepository.list()
    }

    listByOrganization(nid: string){
        return this.driverRepository.listByOrganization(nid)
    }

    update(nid: string, driver: Partial<DriverUpdate>){
        return this.driverRepository.update(nid, driver)
    }

    delete(nid: string){
        return this.driverRepository.delete(nid)
    }
}
