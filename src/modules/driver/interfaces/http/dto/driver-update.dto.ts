import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
}

export type DriverUpdateDTO = DriverDTO

export class DriverUpdateMapping extends DTO<DriverProperties, DriverUpdateDTO> {
	execute(data: DriverProperties): DriverUpdateDTO {
		return {
			nid: data.nid,
			name: data.name,
			lastname: data.lastname,
		}
	}
}
