import { DriverEntity } from '../../driver/infraestructure/driver.entity'
import { VehicleEntity } from '../../../modules/vehicle/infraestructure/vehicle.entity'
import {UserEntity} from '../../user/infraestructure/user.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'
import { RouteEntity } from '../../route/infraestructure/route.entity'


@Entity({ name: 'organization' })
export class OrganizationEntity {

    @PrimaryColumn()
    nid: string

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'boolean', default: true})
    active: boolean

    @ManyToMany(() => UserEntity, user => user.organizations)
    users: UserEntity[];

    @OneToMany(() => VehicleEntity, vehicle => vehicle.organization)
    vehicles: VehicleEntity[];

    @OneToMany(() => DriverEntity, driver => driver.organization)
    drivers: DriverEntity[]

    @OneToMany(() => RouteEntity, route  => route.organization)
    routes: RouteEntity[]
}