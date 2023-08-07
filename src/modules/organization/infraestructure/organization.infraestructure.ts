import Organization from '../domain/organization'
import { OrganizationRepository } from '../domain/organization.repository'
import { OrganizationEntity } from './organization.entity'
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import { OrganizationUpdate } from '../domain/interfaces/organizationUpdate.interface'
import { OrganizationNotFoundException } from '../domain/exceptions/organization.exception'
import { Result, ok, err } from 'neverthrow'
import databaseBootstrap from '../../../bootstrap/database.bootstrap'

export default class OrganizationInfraestructure implements OrganizationRepository {
	async insert(organization: Organization): Promise<Organization> {
		const organizationInsert = new OrganizationEntity()

		const { nid, name, active } = organization.properties()
		Object.assign(organizationInsert, {
			nid,
			name,
			active,
		})

		await DataBaseBootstrap.dataSource.getRepository(OrganizationEntity).save(organizationInsert)
		return organization
	}

	async list(): Promise<Organization[]> {
		const repo = DataBaseBootstrap.dataSource.getRepository(OrganizationEntity)

		const result = await repo.find({ where: { active: true } })
		return result.map((el: OrganizationEntity) => {
			return new Organization({
				nid: el.nid,
				name: el.name,
				active: el.active,
			})
		})
	}

	async listOne(nid: string): Promise<Result<Organization, OrganizationNotFoundException>>{
		const repo = databaseBootstrap.dataSource.getRepository(OrganizationEntity)

		const result = await repo.findOne({where:{nid}})
		if(!result){
			return err(new OrganizationNotFoundException())
		} else{
			return ok(
				new Organization({
					nid: result.nid,
					name: result.name
				})
			)
		}
	}

	async update(
		nid: string,
		organization: Partial<OrganizationUpdate>,
	): Promise<Result<Organization, OrganizationNotFoundException>> {
		const repo = DataBaseBootstrap.dataSource.getRepository(OrganizationEntity)

		const organizationFound = await repo.findOne({ where: { nid } })

		if (organizationFound) {
			Object.assign(organizationFound, organization)
			const organizationEntity = await repo.save(organizationFound)

			return ok(
				new Organization({
					nid: organizationEntity.nid,
					name: organizationEntity.name,
					active: organizationEntity.active,
				}),
			)
		} else {
            return err(new OrganizationNotFoundException())
        }
	}

    async delete(nid: string): Promise<Result<Organization, OrganizationNotFoundException>>{

        const repo = DataBaseBootstrap.dataSource.getRepository(OrganizationEntity)

        const organizationFound = await repo.findOne({ where: { nid }})

        if(organizationFound){
            organizationFound.active = false
            const organizationEntity = await repo.save(organizationFound)
            
            return ok(
                new Organization({
                    nid: organizationEntity.nid,
                    name: organizationEntity.name,
                    active: organizationEntity.active
                })
            )
        } else {
            return err(new OrganizationNotFoundException())
        }
    }
}
