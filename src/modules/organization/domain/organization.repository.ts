import { Result } from 'neverthrow'
import { OrganizationUpdate } from './interfaces/organizationUpdate.interface'
import Organization from './organization'
import { OrganizationNotFoundException } from './exceptions/organization.exception'

export interface OrganizationRepository {
	insert(organization: Organization): Promise<Organization>
    list(): Promise<Organization[]>
    listOne(nid: string): Promise<Result<Organization, OrganizationNotFoundException>>
    update(nid: string, organization: Partial<OrganizationUpdate>): Promise<Result<Organization, OrganizationNotFoundException>>
    delete(nid: string): Promise<Result<Organization, OrganizationNotFoundException>>
}
