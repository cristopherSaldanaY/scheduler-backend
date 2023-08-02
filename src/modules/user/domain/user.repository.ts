import { Result } from 'neverthrow'
import { UserUpdate } from './interfaces/userUpdate.interface'
import User from './user'
import { UserNotFoundException } from './exceptions/user.exception'

export interface UserRepository {
	insert(user: User): Promise<User>
	list(): Promise<User[]>
	update(subject: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>>
	delete(subject: string): Promise<Result<User, UserNotFoundException>>
}
