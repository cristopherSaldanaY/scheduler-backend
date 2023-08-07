import { VehicleProperties } from 'src/modules/vehicle/domain/types/vehicleProperties.type'
import { DTO } from '../../../../shared/dto.generic'


interface VehicleDTO{
    nid: string,
    plate: string,
    organization_id: string
}

export type VehicleListOneDTO = VehicleDTO

export class VehicleListOneMapping extends DTO<VehicleProperties, VehicleListOneDTO>{
    execute(data: VehicleProperties): VehicleListOneDTO {
        return {
            nid: data.nid,
            plate: data.plate,
            organization_id: data.organization_id,
        }
    }
}