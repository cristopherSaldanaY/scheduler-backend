import { DTO } from '../../../../shared/dto.generic'
import { VehicleProperties } from '../../../domain/types/vehicleProperties.type'

interface VehicleDTO {
	nid: string
	plate: string
	organization_id: string
}

export type VehicleUpdateDTO = VehicleDTO

export class VehicleUpdateMapping extends DTO<VehicleProperties, VehicleUpdateDTO> {
	execute(data: VehicleProperties): VehicleUpdateDTO {
		return {
			nid: data.nid,
			plate: data.plate,
			organization_id: data.organization_id,
		}
	}
}
