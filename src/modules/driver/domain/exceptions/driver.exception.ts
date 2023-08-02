import { DomainExceptionCode } from '../enums/domainException.enum'
import { DomainException } from './domain.exception'

export class DriverNameRequiredException extends DomainException {
    constructor(){
        super(DriverNameRequiredException.getMessage())
        this.name = DomainExceptionCode.DRIVER_NAME_REQUIRED
    }

    static getMessage(){
        return 'Name is required'
    }
}

export class DriverLastnameRequiredException extends DomainException{
    constructor(){
        super(DriverLastnameRequiredException.getMessage())
        this.name = DomainExceptionCode.DRIVER_LASTNAME_REQUIRED
    }

    static getMessage(){
        return 'Lastname is required'
    }
}

export class DriverNidInvalidException extends DomainException{
    constructor(){
        super(DriverNidInvalidException.getMessage())
        this.name = DomainExceptionCode.DRIVER_NID_INVALID
    }

    static getMessage(){
        return 'Nid is invalid'
    }
}

export class DriverNotFoundException extends DomainException{
    constructor(){
        super(DriverNotFoundException.getMessage())
        this.name = DomainExceptionCode.DRIVER_NOT_FOUND
    }

    static getMessage(){
        return 'Driver not found'
    }
}