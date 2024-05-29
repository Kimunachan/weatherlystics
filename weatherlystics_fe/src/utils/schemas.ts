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

export const schema = z.object({
  lat: z
    .number()
    .min(-90, "Latitude needs to be at least -90")
    .max(90, "Latitude cant be greater than 90"),
  long: z
    .number()
    .min(-180, "Longitude needs to be at least -180")
    .max(180, "Longitude cant be greater than 180"),
  timezone: z.string(),
  date: z.date(),
  secondDate: z.date().optional(),
});
export const rowSchema = z.object({
  lat: z.number(),
  long: z.number(),
  timezone: z.string(),
  date: z.string(), // using string for the date input value
});

// Define the form schema
export const formSchema = z.object({
  rows: z.array(rowSchema),
});