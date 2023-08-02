import { OrganizationEntity } from '../../../modules/organization/infraestructure/organization.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'vehicle' })
export class VehicleEntity {

    @PrimaryColumn()
    nid: string

    @Column({ type: 'varchar', length: 100})
    plate: string

    @Column({ type: 'varchar', length: 100})
    organization_id: string

    @Column({ type: 'boolean', default: true })
    active: boolean

    @ManyToOne(() => OrganizationEntity, organization => organization.vehicles)
    organization: OrganizationEntity;

}
