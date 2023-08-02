import { DataSource } from 'typeorm'
import { Bootstrap } from './base.bootstrap'
import { AppService } from './service/app.service'
import { DB_CONFIG } from './interfaces/dbConfig.interface'

let appDataSource: DataSource

export default class extends Bootstrap {
	initialize(): Promise<DataSource> {
		const dbConfig: DB_CONFIG = AppService.DBConfig
		const AppDataSource = new DataSource({
			type: 'postgres',
			...dbConfig,
		})


		appDataSource = AppDataSource

		return AppDataSource.initialize()
	}

	static get dataSource(): DataSource {
		return appDataSource
	}
}
