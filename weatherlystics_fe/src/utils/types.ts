import { z } from "zod";
import { weatherDataSchema } from "./schemas";

export type WeatherDataType = z.infer<typeof weatherDataSchema>;
