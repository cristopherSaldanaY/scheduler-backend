import { v4 as uuidv4 } from 'uuid'
import Route from './route'
import { Result, ok} from 'neverthrow'
import { RouteProperties } from './types/routeProperties.type'
import { RouteStartsAtRequiredException } from './exceptions/route.exception'

export type RouteResult = Result<Route, | RouteStartsAtRequiredException>

export default class RouteFactory {
    async create(starts_at: Date, ends_at: Date, travel_time: string, total_stops: number, action: string, organization_id: string, driver_id?: string, vehicle_id?: string): Promise<RouteResult>{

        const routeProperties: RouteProperties = {
            starts_at,
            ends_at,
            travel_time,
            total_stops,
            action,
            organization_id,
            driver_id,
            vehicle_id,
            nid: uuidv4()

        }

        const route = new Route(routeProperties)
        return ok(route)
    }
}