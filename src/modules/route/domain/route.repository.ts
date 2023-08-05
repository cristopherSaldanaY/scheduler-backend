import { Result } from 'neverthrow'
import { RouteNotFoundException } from './exceptions/route.exception'
import { RouteUpdate } from './interfaces/routeUpdate.interface'
import Route from './route'

export interface RouteRepository {
	insert(route: Route): Promise<Route>
	list(): Promise<Route[]>
	listByOrganization(nid: string): Promise<Route[]>
	update(nid: string, route: Partial<RouteUpdate>): Promise<Result<Route, RouteNotFoundException>>
	delete(nid: string): Promise<Result<Route, RouteNotFoundException>>
}
