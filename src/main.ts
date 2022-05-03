import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api/v1')

  const config = new DocumentBuilder()
    .setTitle('Happmobi Rental API')
    .setDescription('A vehicle rental API by Happmobi')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(process.env.PORT || 3333)
}
bootstrap()
