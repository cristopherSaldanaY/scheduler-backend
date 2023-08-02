import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
	static get PORT(): number {
		return +process.env.PORT || 3001
	}

	static get DBConfig(): DB_CONFIG {
		return {
			host: process.env.DB_HOST || 'localhost',
			port: +process.env.DB_PORT || 5432,
			entities: [process.env.DB_ENTITIES || 'src/**/*.entity.ts'],
			username: process.env.DB_USER || 'adminUser',
			password: process.env.DB_PASS || '12345',
			database: process.env.DB_NAME || 'bddnode',
			synchronize: true,
			logging: process.env.DB_LOGG == 'true' ? true : false,
		}
	}
}
