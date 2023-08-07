import { DriverProperties } from 'src/modules/driver/domain/types/driverProperties.type'
import { DTO } from '../../../../shared/dto.generic'


interface DriverDTO{
    nid: string,
    name: string,
    lastname: string
    organization_id: string
}

export type DriverListOneDTO = DriverDTO

export class DriverListOneMapping extends DTO<DriverProperties, DriverListOneDTO>{
    execute(data: DriverProperties): DriverListOneDTO {
        return {
            nid: data.nid,
            name: data.name,
            lastname: data.lastname,
            organization_id: data.organization_id
        }
    }
}