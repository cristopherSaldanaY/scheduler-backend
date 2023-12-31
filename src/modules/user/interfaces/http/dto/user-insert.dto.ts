import { UserProperties } from 'src/modules/user/domain/types/userProperties.type'
import { DTO } from '../../../../shared/dto.generic'

interface UserDTO {
	subject: string
	username: string
	email: string
	national_id: string
	organizations:{
        nid: string
    } []
}

export type UserInsertDTO = UserDTO

export class UserInsertMapping extends DTO<UserProperties, UserInsertDTO> {
    execute(data: UserProperties): UserInsertDTO {
        return {
            subject: data.subject,
            username: data.username,
            email: data.email,
            national_id: data.national_id,
            organizations: data.organizations
        }
    }
}
