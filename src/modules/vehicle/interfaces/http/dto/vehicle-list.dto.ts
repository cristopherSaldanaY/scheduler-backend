import { DTO } from '../../../../shared/dto.generic'
import { VehicleProperties } from '../../../domain/types/vehicleProperties.type'

interface VehicleDTO {
	nid: string
	plate: string
	organization_id: string
}

export type VehicleListDTO = VehicleDTO[]

export class VehicleListMapping extends DTO<VehicleProperties[], VehicleListDTO> {
	execute(data: VehicleProperties[]): VehicleListDTO {
		return data.map((vehicle: VehicleProperties) => {
			return {
				nid: vehicle.nid,
				plate: vehicle.plate,
				organization_id: vehicle.organization_id,
			}
		})
	}
}
