import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  database: process.env.TYPEORM_DATABASE || 'postgres',
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  entities: [__dirname + '/src/**/entity/*.entity.ts'],
  synchronize: true
}

export default ormconfig
