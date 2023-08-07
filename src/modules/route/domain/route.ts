import { IEntity } from '../../shared/entity.interface'
import { RouteProperties } from './types/routeProperties.type'
import { RouteUpdate } from './interfaces/routeUpdate.interface'

export default class Route implements IEntity<RouteProperties, RouteUpdate> {
    private starts_at: string
    private ends_at: string
    private travel_time: string
    private total_stops: number
    private action: string
    private organization_id: string
    private driver_id?: string
    private driver_name?: string
    private vehicle_id?: string
    private vehicle_plate?: string
    private active: boolean
    private nid: string

    constructor(routeProperties: RouteProperties){
        this.active = true
        Object.assign(this, routeProperties)
    }

    properties(): RouteProperties{
        return{
            starts_at: this.starts_at,
            ends_at: this.ends_at,
            travel_time: this.travel_time,
            total_stops: this.total_stops,
            action: this.action,
            organization_id: this.organization_id,
            driver_id: this.driver_id,
            driver_name: this.driver_name,
            vehicle_id: this.vehicle_id,
            vehicle_plate: this.vehicle_plate,
            active: this.active,
            nid: this.nid
        }
    }

    update(fields: RouteUpdate){
        Object.assign(this, fields)
    }

    delete(){
        this.active = false
    }
}
