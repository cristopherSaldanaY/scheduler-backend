import { RouteProperties } from '../../../domain/types/routeProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface RouteDTO {
	nid: string
	starts_at: Date
	ends_at: Date
	travel_time: string
	total_stops: number
	action: string
	organization_id: string
	driver_id: string
	vehicle_id: string
}

export type RouteListDTO = RouteDTO[]

export class RouteListMapping extends DTO<RouteProperties[], RouteListDTO> {
	execute(data: RouteProperties[]): RouteListDTO {
		return data.map(route => {
			return {
				nid: route.nid,
				starts_at: route.starts_at,
				ends_at: route.ends_at,
				travel_time: route.travel_time,
				total_stops: route.total_stops,
				action: route.action,
				organization_id: route.organization_id,
				driver_id: route.driver_id,
				vehicle_id: route.vehicle_id,
			}
		})
	}
}
