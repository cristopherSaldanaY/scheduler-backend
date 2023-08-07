import { DTO } from '../../../../shared/dto.generic'
import { UserProperties } from '../../../domain/types/userProperties.type'

interface UserDTO {
    subject: string
	username: string
	organizations: {
		nid: string
		name?: string
	}[]
}

export type UserLoginDTO = UserDTO

export class UserLoginMapping extends DTO<UserProperties, UserLoginDTO> {
	execute(data: UserProperties): UserLoginDTO {
		return {
			subject: data.subject,
			username: data.username,
            organizations: data.organizations
		}
	}
}
