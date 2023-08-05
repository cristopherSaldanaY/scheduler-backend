import { RouteEntity } from '../../route/infraestructure/route.entity'
import { OrganizationEntity } from '../../../modules/organization/infraestructure/organization.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

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

    @Column({type: 'varchar', length: 100})
    organizationNid: string

    @ManyToOne( () => OrganizationEntity, organization => organization.drivers)
    organization: OrganizationEntity;

    @OneToMany(() => RouteEntity, route  => route.organization)
    routes: RouteEntity[]
}
