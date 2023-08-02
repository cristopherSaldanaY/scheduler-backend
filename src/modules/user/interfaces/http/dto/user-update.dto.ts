import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './dto.generic'

interface UserDTO {
	username: string
	email: string
}

export type UserUpdateDTO = UserDTO

export class UserUpdateMapping extends DTO<UserProperties, UserUpdateDTO> {
	execute(data: UserProperties): UserUpdateDTO {
		return {
			username: data.username,
			email: data.username,
		}
	}
}
