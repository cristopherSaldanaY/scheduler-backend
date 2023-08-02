import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { UserNotFoundException } from '../domain/exceptions/user.exception'
import { UserUpdate } from '../domain/interfaces/userUpdate.interface'
import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { UserEntity } from './user.entity'
import { Result, err, ok } from 'neverthrow'

export default class UserInfraestructure implements UserRepository {
	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()

		const { subject, username, password, email, national_id, active, organization_id } = user.properties()
		Object.assign(userInsert, {
			subject,
			username,
			password,
			email,
			national_id,
			active,
			organization_id,
		})

		await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)

		return user
	}
	async list(): Promise<User[]> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const result = await repo.find({ where: { active: true } })
		return result.map((el: UserEntity) => {
			return new User({
				username: el.username,
                password: el.password,
                email: el.email,
                national_id: el.national_id,
                organization_id: el.organization_id,
                active: el.active,
                subject: el.subject
			})
		})
	}

	async update(subject: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({
			where: { subject }
		})

		if(userFound){
			Object.assign(userFound, user)
			const userEntity = await repo.save(userFound)

			return ok(
				new User({
					username: userEntity.username,
					password: userEntity.password,
					email: userEntity.email,
					national_id: userEntity.national_id,
					organization_id: userEntity.organization_id,
					active: userEntity.active,
					subject: userEntity.subject
				})
			)
		} else {
			return err(new UserNotFoundException())
		}
	}

	async delete(subject: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({ where: {subject}})

		if(userFound){
			userFound.active = false
			const userEntity = await repo.save(userFound)

			return ok(
				new User({
					username: userEntity.username,
					password: userEntity.password,
					email: userEntity.email,
					national_id: userEntity.national_id,
					organization_id: userEntity.organization_id,
					active: userEntity.active,
					subject: userEntity.subject
				})
			)
		}
	}
}
