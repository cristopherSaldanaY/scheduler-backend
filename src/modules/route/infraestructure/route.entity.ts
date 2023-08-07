import { DriverEntity } from '../../driver/infraestructure/driver.entity'
import { OrganizationEntity } from '../../../modules/organization/infraestructure/organization.entity'
import { VehicleEntity } from '../../../modules/vehicle/infraestructure/vehicle.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'route' })
export class RouteEntity {
	@PrimaryColumn()
	nid: string

	@Column({ type: 'timestamp' })
	starts_at: string

	@Column({ type: 'timestamp' })
	ends_at: string

	@Column({ type: 'varchar', length: 100 })
	travel_time: string

	@Column({ type: 'integer' })
	total_stops: number

    @Column({ type: 'varchar', length: 100})
	action: string

	@Column({type: 'varchar', length: 100})
    organizationNid: string

	@Column({type: 'varchar', length: 100, nullable: true})
    driverNid: string

	@Column({type: 'varchar', length: 100, nullable: true})
    vehicleNid: string
	
	@Column({ type: 'boolean', default: true })
    active: boolean

    @ManyToOne(() => OrganizationEntity, organization => organization.routes)
    organization: OrganizationEntity

    @ManyToOne(() => DriverEntity, driver => driver.routes)
    driver: DriverEntity

    @ManyToOne(() => VehicleEntity, vehicle => vehicle.routes)
    vehicle: VehicleEntity
}
