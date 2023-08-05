
import { RouteUpdate } from '../domain/interfaces/routeUpdate.interface';
import Route from '../domain/route';
import { RouteRepository } from './../domain/route.repository';

export default class RouteApplication {
    constructor(private readonly routeRepository: RouteRepository){}

    insert(route: Route){
        return this.routeRepository.insert(route)
    }

    list(){
        return this.routeRepository.list()
    }

    listByOrganization(nid: string){
        return this.routeRepository.listByOrganization(nid)
    }

    update(nid: string, route: Partial<RouteUpdate>){
        return this.routeRepository.update(nid, route)
    }

    delete(nid: string){
        return this.routeRepository.delete(nid)
    }
}