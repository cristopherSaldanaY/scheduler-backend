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
