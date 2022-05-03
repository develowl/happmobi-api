import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 5532),
  // database: process.env.TYPEORM_DATABASE || 'happmobi',
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  entities: [__dirname + '/src/features/**/entity/*.entity.{js,ts}'],
  migrations: [__dirname + '/src/config/migrations/*.{ts,js}'],
  migrationsRun: true
  // synchronize: true
}

export default ormconfig
