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

export type RouteUpdateDTO = RouteDTO

export class RouteUpdateMapping extends DTO<RouteProperties, RouteUpdateDTO> {
	execute(data: RouteProperties): RouteUpdateDTO {
		return {
			nid: data.nid,
			starts_at: data.starts_at,
			ends_at: data.ends_at,
			travel_time: data.travel_time,
			total_stops: data.total_stops,
			action: data.action,
			organization_id: data.organization_id,
			driver_id: data.driver_id,
			vehicle_id: data.vehicle_id,
		}
	}
}
