import { IEntity } from '../../shared/entity.interface'
import { VehicleProperties } from './types/vehicleProperties.type'
import { VehicleUpdate } from './interfaces/vehicleUpdate.interface'

export default class Vehicle implements IEntity<VehicleProperties, VehicleUpdate> {
    private plate: string
    private organization_id: string
    private active: boolean
    private readonly nid: string

    constructor(vehicleProperties: VehicleProperties){
        this.active = true
        Object.assign(this, vehicleProperties)
    }

    properties(): VehicleProperties {
        return {
            plate: this.plate,
            organization_id: this.organization_id,
            active: this.active,
            nid: this.nid
        }
    }

    update(fields: VehicleProperties){
        Object.assign(this, fields)
    }

    delete(){
        this.active = false
    }
}
