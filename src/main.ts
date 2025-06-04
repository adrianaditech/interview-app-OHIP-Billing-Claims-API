import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    
    // Enable global validation pipes for DTOs
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Strips away properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
      transform: true, // Automatically transforms incoming payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Allows implicit conversion of types (e.g., string to number)
      },
    }));
    
    // Setup Swagger API documentation
    const config = new DocumentBuilder()
    .setTitle('OHIP Billing Claims API')
    .setDescription('API for managing medical billing claims based on OHIP service codes and OMA pricing.')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Access Swagger UI at /api

    // app listens to 
    await app.listen(process.env.PORT ?? 4000);
  }
  bootstrap();
