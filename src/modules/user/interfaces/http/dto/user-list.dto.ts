import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './dto.generic'

interface UserDTO {
	subject: string
	username: string
    password: string
	email: string
	national_id: string
	organizations: {
        nid: string
    }[]
}

export type UserListDTO = UserDTO[]

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
    execute(data: UserProperties[]): UserListDTO {
        return data.map(user => {
            return {
                subject: user.subject,
                username: user.username,
                password: user.password,
                email: user.email,
                national_id: user.national_id,
                organizations: user.organizations
            }
        })
    }
}
