import { RouteProperties } from '../../../domain/types/routeProperties.type'
import { DTO } from '../../../../../modules/shared/dto.generic'

interface RouteDTO {
	nid: string
	starts_at: Date
	ends_at: Date
	travel_time: string
	total_stops: number
	action: string
	organization_id: string
}

export type RouteInsertDTO = RouteDTO

export class RouteInsertMapping extends DTO<RouteProperties, RouteInsertDTO> {
	execute(data: RouteProperties): RouteInsertDTO {
		return {
			nid: data.nid,
			starts_at: data.starts_at,
			ends_at: data.ends_at,
			travel_time: data.travel_time,
			total_stops: data.total_stops,
			action: data.action,
			organization_id: data.organization_id,
		}
	}
}
