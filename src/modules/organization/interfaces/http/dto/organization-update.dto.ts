import { OrganizationProperties } from '../../../../organization/domain/types/organizationProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface OrganizationDTO {
	nid: string
	name: string
}

export type OrganizationUpdateDTO = OrganizationDTO

export class OrganizationUpdateMapping extends DTO<OrganizationProperties, OrganizationUpdateDTO> {
	execute(data: OrganizationProperties): OrganizationUpdateDTO {
		return {
			nid: data.nid,
			name: data.name,
		}
	}
}
