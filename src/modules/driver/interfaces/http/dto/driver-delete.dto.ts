import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
}

export type DriverDeleteDTO = DriverDTO

export class DriverDeleteMapping extends DTO<DriverProperties, DriverDeleteDTO> {
	execute(data: DriverProperties): DriverDeleteDTO {
		return {
			nid: data.nid,
			name: data.name,
			lastname: data.lastname,
		}
	}
}
