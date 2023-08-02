import { OrganizationProperties } from '../../../../organization/domain/types/organizationProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface OrganizationDTO {
	nid: string
	name: string
}

export type OrganizationListDTO = OrganizationDTO[]

export class OrganizationListMapping extends DTO<OrganizationProperties[], OrganizationListDTO> {
	execute(data: OrganizationProperties[]): OrganizationListDTO {
		return data.map((organization: OrganizationProperties) => {
			return {
				nid: organization.nid,
				name: organization.name,
			}
		})
	}
}
