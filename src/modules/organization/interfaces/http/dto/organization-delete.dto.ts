import { OrganizationProperties } from '../../../../organization/domain/types/organizationProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface OrganizationDTO {
	nid: string
	name: string
}

export type OrganizationDeleteDTO = OrganizationDTO

export class OrganizationDeleteMapping extends DTO<OrganizationProperties, OrganizationDeleteDTO> {
	execute(data: OrganizationProperties): OrganizationDeleteDTO {
		return {
			nid: data.nid,
			name: data.name,
		}
	}
}
