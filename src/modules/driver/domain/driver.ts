import { IEntity } from '../../shared/entity.interface'
import { DriverProperties } from './types/driverProperties.type'
import { DriverUpdate } from './interfaces/driverUpdate.interface'

export default class Driver implements IEntity<DriverProperties, DriverUpdate> {
    private name: string
    private lastname: string
    private active: boolean
    private organization_id: string
    private readonly nid: string

    constructor(driverProperties: DriverProperties){
        this.active = true
        Object.assign(this, driverProperties)
    }

    properties(): DriverProperties {
        return{
            name: this.name,
            lastname: this.lastname,
            organization_id: this.organization_id,
            active: this.active,
            nid: this.nid
        }
    }

    update(fields: DriverUpdate){
        Object.assign(this, fields)
    }

    delete(){
        this.active = false
    }
}
