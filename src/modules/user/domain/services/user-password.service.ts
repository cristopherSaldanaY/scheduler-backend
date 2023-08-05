import bcrypt from 'bcryptjs'

export class UserPasswordService {

    static hash(password: string): Promise<string>{
        return bcrypt.hash(password, 10)
    }

    static validatePassword( password: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, hashedPassword)
    }
}