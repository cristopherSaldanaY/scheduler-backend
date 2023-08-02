import { OrganizationProperties } from '../../../../organization/domain/types/organizationProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface OrganizationDTO {
	nid: string
	name: string
}

export type OrganizationInsertDTO = OrganizationDTO

export class OrganizationInsertMapping extends DTO<OrganizationProperties, OrganizationInsertDTO> {
	execute(data: OrganizationProperties): OrganizationInsertDTO {
		return {
			nid: data.nid,
			name: data.name,
		}
	}
}
