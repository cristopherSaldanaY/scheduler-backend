import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
	organization: {
		nid: string
	}
}

export type DriverListDTO = DriverDTO[]

export class DriverListMapping extends DTO<DriverProperties[], DriverListDTO> {
	execute(data: DriverProperties[]): DriverListDTO {
		return data.map((driver: DriverProperties) => {
			return {
				nid: driver.nid,
				name: driver.name,
				lastname: driver.lastname,
				organization: driver.organization
			}
		})
	}
}
