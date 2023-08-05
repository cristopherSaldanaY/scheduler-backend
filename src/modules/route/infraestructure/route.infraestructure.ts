import Route from '../domain/route';
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import { RouteRepository } from '../domain/route.repository'
import { RouteEntity } from './route.entity';
import { RouteUpdate } from '../domain/interfaces/routeUpdate.interface';
import { Result, err, ok } from 'neverthrow';
import { RouteNotFoundException } from '../domain/exceptions/route.exception';

export default class RouteInfraestructure implements RouteRepository {
    async insert(route: Route): Promise<Route>{
        const routeInsert = new RouteEntity()
        const {nid, starts_at, ends_at, travel_time, total_stops, action, organization_id, driver_id, vehicle_id, active } = route.properties()

        Object.assign(routeInsert, {
            nid,
            starts_at,
            ends_at,
            travel_time,
            total_stops,
            action,
            organization: {
                nid: organization_id
            },
            driver: {
                nid: driver_id
            },
            vehicle: {
                nid: vehicle_id
            },
            active
        })

        await DataBaseBootstrap.dataSource.getRepository(RouteEntity).save(routeInsert)
        return route
    }

    async list(): Promise<Route[]>{
        const repo = DataBaseBootstrap.dataSource.getRepository(RouteEntity)
        const result = await repo.find({where: { active: true}})

        return result.map((el: RouteEntity) => {
            return new Route({
                nid: el.nid,
                starts_at: el.starts_at,
                ends_at: el.ends_at,
                travel_time: el.travel_time,
                total_stops: el.total_stops,
                action: el.action,
                organization_id: el.organizationNid,
                driver_id: el.driverNid,
                vehicle_id: el.vehicleNid,
                active: el.active
            })
        })
    }

    async listByOrganization(nid: string): Promise<Route[]>{
        const repo = DataBaseBootstrap.dataSource.getRepository(RouteEntity)
        const result = await repo.find({where:{ organizationNid: nid}})

        return result.map((el: RouteEntity) => {
            return new Route({
                nid: el.nid,
                starts_at: el.starts_at,
                ends_at: el.ends_at,
                travel_time: el.travel_time,
                total_stops: el.total_stops,
                action: el.action,
                organization_id: el.organizationNid,
                driver_id: el.driverNid,
                vehicle_id: el.vehicleNid,
                active: el.active
            })
        })
    }

    async update(nid: string, route: Partial<RouteUpdate>): Promise<Result<Route, RouteNotFoundException>>{
        const repo = DataBaseBootstrap.dataSource.getRepository(RouteEntity)
        const routeFound = await repo.findOne({ where: {nid}})
        console.log(routeFound)

        if(routeFound){
            if(route.driver_id){
                routeFound.driverNid = route.driver_id
            }

            if(route.vehicle_id){
                routeFound.vehicleNid = route.vehicle_id
            }

            /* Object.assign(routeFound, route) */
            const routeEntity = await repo.save(routeFound)
            console.log(routeEntity)

            return ok(
                new Route({
                    nid: routeEntity.nid,
                    starts_at: routeEntity.starts_at,
                    ends_at: routeEntity.ends_at,
                    travel_time: routeEntity.travel_time,
                    total_stops: routeEntity.total_stops,
                    action: routeEntity.action,
                    organization_id: routeEntity.organizationNid,
                    driver_id: routeEntity.driverNid,
                    vehicle_id: routeEntity.vehicleNid,
                    active: routeEntity.active
                })
            )
        } else {
            return err(new RouteNotFoundException())
        }
    }

    async delete(nid: string): Promise<Result<Route, RouteNotFoundException>>{
        const repo = DataBaseBootstrap.dataSource.getRepository(RouteEntity)
        const routeFound = await repo.findOne({where:{ nid}})

        if(routeFound){
            routeFound.active = false
            const routeEntity = await repo.save(routeFound)

            return ok(
                new Route({
                    nid: routeEntity.nid,
                    starts_at: routeEntity.starts_at,
                    ends_at: routeEntity.ends_at,
                    travel_time: routeEntity.travel_time,
                    total_stops: routeEntity.total_stops,
                    action: routeEntity.action,
                    organization_id: routeEntity.organizationNid,
                    driver_id: routeEntity.driverNid,
                    vehicle_id: routeEntity.vehicle.plate,
                    active: routeEntity.active
                })
            )
        } else{
            return err(new RouteNotFoundException())
        }
    }
}
