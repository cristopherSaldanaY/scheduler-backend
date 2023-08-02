import { UserUpdate } from '../domain/interfaces/userUpdate.interface'
import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

export default class UserApplication {
	constructor(private readonly userRepository: UserRepository) {}

    insert(user: User){
        return this.userRepository.insert(user)
    }

    list(){
        return this.userRepository.list()
    }

    update(subject: string, user: Partial<UserUpdate>){
        return this.userRepository.update(subject, user)
    }

    delete(subject: string){
        return this.userRepository.delete(subject)
    }
}


