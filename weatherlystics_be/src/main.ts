import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as Transport from 'winston-transport';
import { Console } from 'winston/lib/winston/transports';
import { createLogger, format } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const transports: Transport[] = [
    new Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        utilities.format.nestLike('Weatherlystics', {
          colors: true,
          prettyPrint: true,
        }),
      ),
      level: `${process.env.NODE_ENV === 'production' ? 'info' : 'debug'}`,
    }),
  ];

  const winstance = createLogger({
    transports: transports,
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstance }),
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001, () => {
    winstance.info('Server is running on http://localhost:3001');
  });
}
bootstrap();
