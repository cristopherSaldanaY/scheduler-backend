import { RouteOptional } from '../interfaces/routeOptional.interface'
import { RouteRequired } from '../interfaces/routeRequired.interface'

export type RouteProperties = Required<RouteRequired> & Partial<RouteOptional>
