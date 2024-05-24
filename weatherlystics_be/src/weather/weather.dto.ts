import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CompareWeatherDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsObject({ each: true })
  requestData: Data[];
}

class Data {
  @IsNumber()
  lat: number;
  @IsNumber()
  lon: number;
  @IsString()
  date: string;
  @IsString()
  timezone: string;
}
