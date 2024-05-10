import { z } from "zod";

export const weatherDataSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezoneAbbreviation: z.string(),
  current: z.object({
    time: z.date(),
    temperature2m: z.number(),
    relativeHumidity2m: z.number(),
    apparentTemperature: z.number(),
  }),
  hourly: z.array(
    z.object({
      time: z.date(),
      temperature2m: z.number(),
      relativeHumidity2m: z.number(),
      apparentTemperature: z.number(),
    })
  ),
  daily: z.array(
    z.object({
      time: z.date(),
      weatherCode: z.number(),
      temperature2mMax: z.number(),
      temperature2mMin: z.number(),
      apparentTemperatureMax: z.number(),
      apparentTemperatureMin: z.number(),
    })
  ),
});
