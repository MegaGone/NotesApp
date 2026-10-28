import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IGlobalConfiguration } from './shared/configuration/global.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const { PORT, API_VERSION } =
    config.getOrThrow<IGlobalConfiguration>("GLOBAL");

  app.setGlobalPrefix(`api/${API_VERSION}`);

  await app.listen(PORT);

  console.log(`[SERVER]: ${await app.getUrl()}/api/${API_VERSION}`);
}

bootstrap();
