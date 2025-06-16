import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS
  app.enableCors();
  
  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Isso é essencial!
    }),
  );
  
  await app.listen(3000);
}
bootstrap();