import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  if (process.env.APP_ENV === 'development') {
    app.enableCors({
      origin: '*', 
      credentials: true,
    });
  }
  app.setGlobalPrefix('api/v1'); 
  


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //OPENAPI
  const options = new DocumentBuilder()
    .setTitle('NOMBREAPP REST API')
    .setDescription('API REST DESCRIPTION')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  const port = process.env.PORT ?? 3000;
  await app.listen(port); 
}

bootstrap();
