import { DTO } from '../../../../shared/dto.generic'
import { VehicleProperties } from '../../../domain/types/vehicleProperties.type'

interface VehicleDTO {
	nid: string
	plate: string
	organization_id: string
}

export type VehicleInsertDTO = VehicleDTO

export class VehicleInsertMapping extends DTO<VehicleProperties, VehicleInsertDTO> {
	execute(data: VehicleProperties): VehicleInsertDTO {
		return {
			nid: data.nid,
			plate: data.plate,
			organization_id: data.organization_id,
		}
	}
}
