import { IEntity } from 'src/modules/shared/entity.interface'
import { OrganizationUpdate } from './interfaces/organizationUpdate.interface';
import { OrganizationProperties } from './types/organizationProperties.type';

export default class Organization implements IEntity<OrganizationProperties, OrganizationUpdate> {
    private name: string
    private active: boolean
    private nid: string

    constructor(organizationProperties: OrganizationProperties){
        this.active = true
        Object.assign(this, organizationProperties)
    }

    properties(): OrganizationProperties {
        return {
            name: this.name,
            active: this.active,
            nid: this.nid
        }
    }

    update(fields: OrganizationUpdate){
        Object.assign(this, fields)
    }

    delete(){
        this.active = false
    }
}


