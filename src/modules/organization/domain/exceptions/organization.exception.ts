import { DomainExceptionCode } from '../enums/domainException.enum'
import { DomainException } from './domain.exception'

export class OrganizationNameRequiredException extends DomainException {
    constructor(){
        super(OrganizationNameRequiredException.getMessage())
        this.name = DomainExceptionCode.ORGANIZATION_NAME_REQUIRED
    }

    static getMessage(){
        return 'Name is required'
    }
}

export class OrganizationNidInvalidException extends DomainException {
    constructor(){
        super(OrganizationNidInvalidException.getMessage())
        this.name = DomainExceptionCode.ORGANIZATION_NID_INVALID
    }

    static getMessage(){
        return 'Nid is required'
    }
}

export class OrganizationNotFoundException extends DomainException {
    constructor(){
        super(OrganizationNotFoundException.getMessage())
        this.name = DomainExceptionCode.ORGANIZATION_NOT_FOUND
    }

    static getMessage(){
        return 'Oganization not found'
    }
}



