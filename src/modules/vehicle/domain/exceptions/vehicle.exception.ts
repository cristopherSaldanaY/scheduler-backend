import { DomainExceptionCode } from '../enums/domainException.enum'
import { DomainException } from './domain.exception'

export class VehiclePlateRequiredException extends DomainException {
    constructor(){
        super(VehiclePlateRequiredException.getMessage())
        this.name = DomainExceptionCode.VEHICLE_PLATE_REQUIRED
    }

    static getMessage(){
        return 'Plate is required'
    }
}

export class VehicleOrganizationRequiredException extends DomainException {
    constructor(){
        super(VehicleOrganizationRequiredException.getMessage())
        this.name = DomainExceptionCode.VEHICLE_ORGANIZATION_REQUIRED
    }

    static getMessage(){
        return 'Organization is required'
    }
}

export class VehicleNidInvalidException extends DomainException {
    constructor(){
        super(VehicleNidInvalidException.getMessage())
        this.name = DomainExceptionCode.VEHICLE_NID_INVALID
    }

    static getMessage(){
        return 'Nid is invalid'
    }
}

export class VehicleNotFoundException extends DomainException {
    constructor(){
        super(VehicleNotFoundException.getMessage())
        this.name = DomainExceptionCode.VEHICLE_NOT_FOUND
    }

    static getMessage(){
        return 'Vehicle not found'
    }
}
