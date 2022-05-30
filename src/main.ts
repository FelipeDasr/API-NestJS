import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

import { validationPipeOptions } from './configs';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(3000);
}
bootstrap();
