import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    Logger.debug(`Listening on port ${port} \nPress CTRL-C to stop`);
  });
}

bootstrap();
