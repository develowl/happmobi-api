import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

const ormconfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('HAPPMOBI_HOST', 'localhost'),
    port: Number(configService.get('HAPPMOBI_PORT', 5532)),
    database: configService.get('HAPPMOBI_DATABASE', 'happmobi'),
    username: configService.get('HAPPMOBI_USERNAME', 'postgres'),
    password: configService.get('HAPPMOBI_PASSWORD', 'postgres'),
    entities: [__dirname + '/src/features/**/entity/*.entity.{.js,.ts}'],
    synchronize: true
  })
}

export default ormconfig
