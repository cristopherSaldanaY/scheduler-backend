import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
    organization_id: string
}

export type DriverInsertDTO = DriverDTO

export class DriverInsertMapping extends DTO<DriverProperties, DriverInsertDTO> {
    execute(data: DriverProperties): DriverInsertDTO {
        return {
            nid: data.nid,
            name: data.name,
            lastname: data.lastname,
            organization_id: data.organization_id
        }
    }
}
