import { UserProperties } from '../../../../user/domain/types/userProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface UserDTO {
	subject: string
	username: string
	email: string
	national_id: string
}

export type UserDeleteDTO = UserDTO

export class UserDeleteMapping extends DTO<UserProperties, UserDeleteDTO> {
	execute(data: UserProperties): UserDeleteDTO {
		return {
			subject: data.subject,
			username: data.username,
			email: data.username,
			national_id: data.national_id,
		}
	}
}
