import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CompareWeatherDTO } from './weather.dto';

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

  @Post('/compare')
  async compareWeather(@Body() dto: CompareWeatherDTO) {
    return await this.weatherService.compareWeather(dto);
  }
}
