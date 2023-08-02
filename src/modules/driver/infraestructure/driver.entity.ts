import { OrganizationEntity } from '../../../modules/organization/infraestructure/organization.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'driver' })
export class DriverEntity {

    @PrimaryColumn()
    nid: string

    @Column({type: 'varchar', length: 100 })
    name: string

    @Column({type: 'varchar', length: 100 })
    lastname: string
    
    @Column({ type: 'boolean', default: true })
    active: boolean

    @ManyToOne( () => OrganizationEntity, organization => organization.drivers)
    organization: OrganizationEntity;
}
