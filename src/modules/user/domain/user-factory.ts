import { v4 as uuidv4 } from 'uuid'
import User from './user'
import { UserPasswordRequiredException, UserPasswordLengthInvalidException } from './exceptions/user.exception'
import { Result, err, ok } from 'neverthrow'
import { UserProperties } from './types/userProperties.type'
import { UserPasswordService } from './services/user-password.service'

export type UserResult = Result<User, UserPasswordRequiredException | UserPasswordLengthInvalidException>

export default class UserFactory {
	async create(
		email: string,
		national_id: string,
		username: string,
		password: string,
		organization_id: string,
	): Promise<UserResult> {
		if (!password || password.trim() === '') {
			return err(new UserPasswordRequiredException())
		}

		if (password.length < 5) {
			return err(new UserPasswordLengthInvalidException(password))
		}

		const passwordHash = await UserPasswordService.hash(password)

		const userProperties: UserProperties = {
			email,
			national_id,
			username,
			password: passwordHash,
			organization_id,
			subject: uuidv4(),
		}

		const user = new User(userProperties)
		return ok(user)
	}
}
