import { DomainExceptionCode } from '../enums/domainException.enum'
import { DomainException } from './domain.exception'

export class RouteStartsAtRequiredException extends DomainException {
	constructor() {
		super(RouteStartsAtRequiredException.getMessage())
        this.name = DomainExceptionCode.ROUTE_START_AT_REQUIRED
	}

    static getMessage(){
        return 'Start_at is required'
    }
}

export class RouteNotFoundException extends DomainException{
    constructor(){
        super(RouteNotFoundException.getMessage())
        this.name = DomainExceptionCode.ROUTE_NOT_FOUND
    }

    static getMessage(){
        return 'Route not found'
    }
}

export class RouteDriverConflictException extends DomainException{
    constructor(){
        super(RouteDriverConflictException.getMessage())
        this.name = DomainExceptionCode.ROUTE_DRIVER_CONFLICT
    }
    static getMessage(){
        return 'Driver schedule conflict with another route'
    }
}

export class RouteVehicleConflictException extends DomainException{
    constructor(){
        super(RouteVehicleConflictException.getMessage())
        this.name = DomainExceptionCode.ROUTE_VEHICLE_CONFLICT
    }
    static getMessage(){
        return 'Vehicle schedule conflict with another route'
    }
}
