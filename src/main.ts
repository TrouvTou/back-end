import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non décorées
      forbidNonWhitelisted: true, // Rejette les propriétés inconnues
      transform: true, // Active la transformation automatique
      transformOptions: {
        enableImplicitConversion: true, // Conversion de types automatique
      },
      errorHttpStatusCode: 422, // Code d'erreur pour validation
    }),
  );

  // Serialization globale
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('NestJS API Trouv’tout')
    .setDescription('API documentation for the Trouv’tout application')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3100);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
