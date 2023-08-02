import { OrganizationEntity as Organization } from '../../organization/infraestructure/organization.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'


@Entity({ name: 'user' })
export class UserEntity{

    @PrimaryColumn()
    subject: string

    @Column({ type: 'varchar', length: 100})
    username: string
    
    @Column({ type: 'varchar', length: 100})
    password: string

    @Column({ type: 'varchar', length: 100})
    email: string

    @Column({ type: 'varchar', length: 100})
    national_id: string

    @Column({ type: 'boolean', default: true })
    active: boolean

    @Column({ type: 'varchar', length: 100})
    organization_id: string

    @ManyToOne(() => Organization, organization => organization.users)
    organization: Organization;


}