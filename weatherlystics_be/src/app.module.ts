import { Logger, Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    WeatherModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
