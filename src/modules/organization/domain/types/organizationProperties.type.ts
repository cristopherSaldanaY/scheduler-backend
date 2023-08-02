import { OrganizationOptional } from '../interfaces/organizationOptional.interface'
import { OrganizationRequired } from '../interfaces/organizationRequired.interface'

export type OrganizationProperties = Required<OrganizationRequired> & Partial<OrganizationOptional>
