import { OrganizationUpdate } from '../domain/interfaces/organizationUpdate.interface';
import Organization from '../domain/organization';
import { OrganizationRepository } from '../domain/organization.repository'

export default class OrganizationApplication {
	constructor(private readonly organizationRepository: OrganizationRepository){}

    insert(organization: Organization){
        return this.organizationRepository.insert(organization)
    }

    list(){
        return this.organizationRepository.list()
    }

    update(nid: string, organization: Partial<OrganizationUpdate>){
        return this.organizationRepository.update(nid, organization)
    }

    delete(nid: string){
        return this.organizationRepository.delete(nid)
    }
}
