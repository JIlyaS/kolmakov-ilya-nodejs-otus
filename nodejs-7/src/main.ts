import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Создает наш проект
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: true });

  const config = new DocumentBuilder()
    .setTitle('Сервис ссылок')
    .setDescription('API для сервиса ссылок')
    .setVersion('1.0')
    .addTag('links')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
