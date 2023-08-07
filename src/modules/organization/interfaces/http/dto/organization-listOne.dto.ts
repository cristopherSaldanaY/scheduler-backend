import { OrganizationProperties } from '../../../../organization/domain/types/organizationProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface OrganizationDTO {
	nid: string
	name: string
}

export type OrganizationListOneDTO = OrganizationDTO

export class OrganizationListOneMapping extends DTO<OrganizationProperties, OrganizationListOneDTO> {
	execute(data: OrganizationProperties): OrganizationListOneDTO {
		return {
			nid: data.nid,
			name: data.name,
		}
	}
}