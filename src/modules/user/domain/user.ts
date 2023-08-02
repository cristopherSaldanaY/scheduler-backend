import { IEntity } from '../../shared/entity.interface'
import { UserUpdate } from './interfaces/userUpdate.interface'
import { UserProperties } from './types/userProperties.type'

export default class User implements IEntity<UserProperties, UserUpdate> {
	private username: string
	private password: string
	private email: string
	private national_id: string
	private organization_id: string
	private active: boolean
	private readonly subject: string

	constructor(userProperties: UserProperties) {
		this.active = true
		Object.assign(this, userProperties)
	}

	properties(): UserProperties {
		return {
			username: this.username,
			password: this.password,
			email: this.email,
			national_id: this.national_id,
			organization_id: this.organization_id,
			active: this.active,
			subject: this.subject,
		}
	}

	update(fields: UserUpdate) {
		Object.assign(this, fields)
	}

	delete() {
		this.active = false
	}
}
