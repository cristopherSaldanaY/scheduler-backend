import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from './dto.generic'

interface UserDTO {
	subject: string
	username: string
	email: string
	national_id: string
	organization_id: string
}

export type UserListDTO = UserDTO[]

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
    execute(data: UserProperties[]): UserListDTO {
        return data.map((user: UserProperties) => {
            return {
                subject: user.subject,
                username: user.username,
                email: user.email,
                national_id: user.national_id,
                organization_id: user.organization_id
            }
        })
    }
}
