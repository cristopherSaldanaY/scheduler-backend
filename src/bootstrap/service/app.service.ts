import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
	static get PORT(): number {
		return +process.env.PORT || 3001
	}

	static get DBConfig(): DB_CONFIG {
		return {
			host: process.env.DB_HOST || 'ep-young-frog-30437320.us-east-1.postgres.vercel-storage.com',
			//host: process.env.DB_HOST || 'localhost',
			port: +process.env.DB_PORT || 5432,
			entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
			//username: process.env.DB_USER || 'postgres',
			//password: process.env.DB_PASS || 'routing.0811',
			//database: process.env.DB_NAME || 'bddtest',
			username: process.env.DB_USER || 'default',
			password: process.env.DB_PASS || 'PIp8v6QYwcZF',
			database: process.env.DB_NAME || 'verceldb',
			synchronize: true,
			logging: process.env.DB_LOGG == 'true' ? true : false,
			extra: {
				ssl: {
					rejectUnauthorized: false,
				},
			},
		}
	}
}
