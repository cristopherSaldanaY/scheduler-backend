import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
	static get PORT(): number {
		return +process.env.PORT || 3001
	}

	static get DBConfig(): DB_CONFIG {
		return {
			host: process.env.DB_HOST || '35.232.45.61',
			port: +process.env.DB_PORT || 5432,
			entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
			username: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASS || 'routing.0811',
			database: process.env.DB_NAME || 'bddtest',
			synchronize: true,
			logging: process.env.DB_LOGG == 'true' ? true : false,
		}
	}
}
