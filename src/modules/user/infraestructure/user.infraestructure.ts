import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { UserNotFoundException } from '../domain/exceptions/user.exception'
import { UserUpdate } from '../domain/interfaces/userUpdate.interface'
import { UserPasswordService } from '../domain/services/user-password.service'
import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { UserEntity } from './user.entity'
import { Result, err, ok } from 'neverthrow'

export default class UserInfraestructure implements UserRepository {
	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()

		const { subject, username, password, email, national_id, active, organizations } = user.properties()
		Object.assign(userInsert, {
			subject,
			username,
			password,
			email,
			national_id,
			active,
			organizationsNid: organizations,
		})

		console.log(userInsert)

		await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)

		return user
	}
	async list(): Promise<User[]> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		/* const result = await repo.find({ where: { active: true } }) */
		const result = await repo
			.createQueryBuilder('user')
			.where('user.active = :active', { active: true })
			.leftJoinAndSelect('user.organizations', 'organizations')
			.getMany()

		console.log('infraestructura', result)
		return result.map((el: UserEntity) => {
			return new User({
				username: el.username,
				password: el.password,
				email: el.email,
				national_id: el.national_id,
				organizations: el.organizationsNid,
				active: el.active,
				subject: el.subject,
			})
		})
	}

	async login(username: string, password: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({ where: { username } })

		if (userFound) {
			const passwordMatch = await UserPasswordService.validatePassword(password, userFound.password)
			if (passwordMatch) {
				return ok(
					new User({
						username: userFound.username,
						password: userFound.password,
						email: userFound.email,
						national_id: userFound.national_id,
						organizations: userFound.organizations,
						active: userFound.active,
						subject: userFound.subject,
					}),
				)
			} else {
				return err(new UserNotFoundException())
			}
		} else {
			return err(new UserNotFoundException())
		}
	}

	async update(subject: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({
			where: { subject },
		})

		if (userFound) {
			Object.assign(userFound, user)
			const userEntity = await repo.save(userFound)

			return ok(
				new User({
					username: userEntity.username,
					password: userEntity.password,
					email: userEntity.email,
					national_id: userEntity.national_id,
					organizations: userEntity.organizations,
					active: userEntity.active,
					subject: userEntity.subject,
				}),
			)
		} else {
			return err(new UserNotFoundException())
		}
	}

	async delete(subject: string): Promise<Result<User, UserNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)

		const userFound = await repo.findOne({ where: { subject } })

		if (userFound) {
			userFound.active = false
			const userEntity = await repo.save(userFound)

			return ok(
				new User({
					username: userEntity.username,
					password: userEntity.password,
					email: userEntity.email,
					national_id: userEntity.national_id,
					organizations: userEntity.organizations,
					active: userEntity.active,
					subject: userEntity.subject,
				}),
			)
		}
	}
}
