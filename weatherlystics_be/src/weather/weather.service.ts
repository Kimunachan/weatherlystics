import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as moment from 'moment';

import { fetchWeatherApi } from 'openmeteo';
import { range } from 'src/utils/functions';
import { CompareWeatherDTO } from './weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getWeather(
    lon: number,
    lat: number,
    date: string,
    timezone_req: string,
  ) {
    if (!lat || !lon)
      throw new BadRequestException('Latitude and Longitude are required');
    if (!date) throw new BadRequestException('Date is required');
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    let url = 'https://api.open-meteo.com/v1/forecast';
    if (!dateRegex.test(date))
      throw new BadRequestException('Invalid date format');
    const diff = moment(date).diff(moment(), 'days');
    if (Math.abs(diff) > 7)
      url = 'https://archive-api.open-meteo.com/v1/archive';

    this.logger.log(
      `Fetching weather data for Lat: ${lat}, Lon: ${lon}, Date: ${date} and Timezone: ${timezone_req}`,
    );
    const cacheData = await this.cacheManager.get(
      `weather-${lat}-${lon}-${date}-${timezone_req}`,
    );

    if (cacheData) {
      this.logger.log('Data found in cache');
      return cacheData;
    }

    this.logger.log('Data not found in cache, fetching from API');

    const queryParams = {
      latitude: lat,
      longitude: lon,
      timeformat: 'unixtime',
      timezone: timezone_req,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
      ],
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
      ],
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'apparent_temperature_max',
        'apparent_temperature_min',
      ],
      start_date: date,
      end_date: date,
    };
    const responses = await fetchWeatherApi(url, queryParams);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const daily = response.daily()!;
    const hourly = response.hourly()!;
    const current = response.current()!;

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval(),
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        apparentTemperature: hourly.variables(2)!.valuesArray()!,
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval(),
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
        apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
      },
    };

    const hourlyMatched = [];
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      hourlyMatched.push({
        time: weatherData.hourly.time[i],
        temperature2m: weatherData.hourly.temperature2m[i],
        relativeHumidity2m: weatherData.hourly.relativeHumidity2m[i],
        apparentTemperature: weatherData.hourly.apparentTemperature[i],
      });
    }

    const dailyMatched = [];
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      dailyMatched.push({
        time: weatherData.daily.time[i],
        weatherCode: weatherData.daily.weatherCode[i],
        temperature2mMax: weatherData.daily.temperature2mMax[i],
        temperature2mMin: weatherData.daily.temperature2mMin[i],
        apparentTemperatureMax: weatherData.daily.apparentTemperatureMax[i],
        apparentTemperatureMin: weatherData.daily.apparentTemperatureMin[i],
      });
    }

    await this.cacheManager.set(
      `weather-${lat}-${lon}-${date}-${timezone_req}`,
      {
        latitude,
        longitude,
        timezone,
        timezoneAbbreviation,
        current: {
          time: weatherData.current.time,
          temperature2m: weatherData.current.temperature2m,
          relativeHumidity2m: weatherData.current.relativeHumidity2m,
          apparentTemperature: weatherData.current.apparentTemperature,
        },
        hourly: hourlyMatched,
        daily: dailyMatched,
      },
      10 * 60 * 1000,
    );

    return {
      latitude,
      longitude,
      timezone,
      timezoneAbbreviation,
      current: {
        time: weatherData.current.time,
        temperature2m: weatherData.current.temperature2m,
        relativeHumidity2m: weatherData.current.relativeHumidity2m,
        apparentTemperature: weatherData.current.apparentTemperature,
      },
      hourly: hourlyMatched,
      daily: dailyMatched,
    };
  }

  async compareWeather(dto: CompareWeatherDTO) {
    const responses: any[] = [];

    for (const data of dto.requestData) {
      const response = await this.getWeather(
        data.lon,
        data.lat,
        data.date,
        data.timezone,
      );
      responses.push(response);
    }

    return responses;
  }
}
