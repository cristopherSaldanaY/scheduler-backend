import { v4 as uuidv4 } from 'uuid'
import Organization from './organization'
import { OrganizationNameRequiredException } from './exceptions/organization.exception'
import { Result, err, ok } from 'neverthrow'
import { OrganizationProperties } from './types/organizationProperties.type'

export type OrganizationResult = Result<Organization, | OrganizationNameRequiredException>

export default class OrganizationFactory {
    async create(name: string): Promise<OrganizationResult>{
        if(!name || name.trim() === ''){
            return err(new OrganizationNameRequiredException())
        }

        const organizationProperties: OrganizationProperties = {
            name,
            nid: uuidv4()
        }

        const organization = new Organization(organizationProperties)
        return ok(organization)
    }
}
