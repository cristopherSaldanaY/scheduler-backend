import { DTO } from '../../../../shared/dto.generic'
import { DriverProperties } from '../../../../driver/domain/types/driverProperties.type'

interface DriverDTO {
	nid: string
	name: string
	lastname: string
    organization:{
        nid: string
    }
}

export type DriverInsertDTO = DriverDTO

export class DriverInsertMapping extends DTO<DriverProperties, DriverInsertDTO> {
    execute(data: DriverProperties): DriverInsertDTO {
        return {
            nid: data.nid,
            name: data.name,
            lastname: data.lastname,
            organization: data.organization
        }
    }
}
