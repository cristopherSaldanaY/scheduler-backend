import { DriverEntity } from '../../driver/infraestructure/driver.entity'
import Driver from '../../../modules/driver/domain/driver'
import { VehicleEntity } from '../../../modules/vehicle/infraestructure/vehicle.entity'
import {UserEntity} from '../../user/infraestructure/user.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'


@Entity({ name: 'organization' })
export class OrganizationEntity {

    @PrimaryColumn()
    nid: string

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'boolean', default: true})
    active: boolean

    @OneToMany(() => UserEntity, user => user.organization_id)
    users: UserEntity[];

    @OneToMany(() => VehicleEntity, vehicle => vehicle.organization_id)
    vehicles: VehicleEntity[];

    @OneToMany(() => DriverEntity, driver => driver.organization)
    drivers: Driver[]
}