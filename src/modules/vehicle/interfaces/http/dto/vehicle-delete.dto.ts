import { DTO } from '../../../../shared/dto.generic'
import { VehicleProperties } from '../../../domain/types/vehicleProperties.type'

interface VehicleDTO {
    nid: string
    plate: string
}

export type VehicleDeleteDTO = VehicleDTO

export class VehicleDeleteMapping extends DTO<VehicleProperties, VehicleDeleteDTO>{
    execute(data: VehicleProperties): VehicleDeleteDTO {
        return {
            nid: data.nid,
            plate: data.plate
        }
    }
}