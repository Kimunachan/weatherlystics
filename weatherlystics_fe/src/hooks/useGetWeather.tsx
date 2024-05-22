import { BASE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useGetWeather = () => {
  const getWeatherData = useMutation({
    mutationFn: async ({ lat, lon }: { lat: number; lon: number }) => {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}`
      );
      return response.data;
    },
    mutationKey: ["weatherData"],
    onError: (error) => {
      toast.error(`Error fetching weather data: ${error}`);
    },
    onSuccess: (data) => {
      toast.success(`Weather data fetched successfully`);
    },
  });
  return getWeatherData;
};
