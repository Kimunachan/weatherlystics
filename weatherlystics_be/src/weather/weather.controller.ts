import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
  ) {}

  @Get('/')
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('date') date: string,
    @Query('timezone') timezone: string,
  ) {
    return await this.weatherService.getWeather(lon, lat, date, timezone);
  }
}
