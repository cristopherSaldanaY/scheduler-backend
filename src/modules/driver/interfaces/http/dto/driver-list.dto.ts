import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
	organization_id: string
}

export type DriverListDTO = DriverDTO[]

export class DriverListMapping extends DTO<DriverProperties[], DriverListDTO> {
	execute(data: DriverProperties[]): DriverListDTO {
		return data.map((driver: DriverProperties) => {
			return {
				nid: driver.nid,
				name: driver.name,
				lastname: driver.lastname,
				organization_id: driver.organization_id
			}
		})
	}
}
