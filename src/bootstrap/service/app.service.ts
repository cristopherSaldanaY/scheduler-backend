import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
	static get PORT(): number {
		return +process.env.PORT || 3001
	}

	static get DBConfig(): DB_CONFIG {
		return {
			host: '35.232.45.61',
			entities: ['dist/**/*.entity.'],
			username: 'postgres',
			password:  'routing.0811',
			database: 'bddtest',
			synchronize: true,
			logging: process.env.DB_LOGG == 'true' ? true : false,
		}
	}
}
