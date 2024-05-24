import { WeatherDataType } from "./types";

export const reformData = (data: WeatherDataType) => {
  const timeZones = data.timezone;

  const hourly = data.hourly.map((data) => {
    return {
      time: getHours(data.time, timeZones),
      temperature: data.temperature2m,
      humidity: data.relativeHumidity2m,
      apparentTemperature: data.apparentTemperature,
    };
  });

  const hourLabels = hourly.map((data) => data.time);
  const temperatureData = hourly.map((data) => data.temperature);
  const humidityData = hourly.map((data) => data.humidity);
  const apparentTemperatureData = hourly.map(
    (data) => data.apparentTemperature
  );

  const temperatureChart = {
    labels: hourLabels,
    datasets: [
      {
        label: "Temperature" +" "+ data.latitude +" Latitude " + data.longitude +" Longitude " + getDay(data.current.time, timeZones),
        data: temperatureData,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
        yAxisID: "y-axis-temp",
      },
    ],
  };

  const humidityChart = {
    labels: hourLabels,
    datasets: [
      {
        label: "Humidity"+" "+ data.latitude +" Latitude " + data.longitude +" Longitude " + getDay(data.current.time, timeZones),
        data: humidityData,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
        yAxisID: "y-axis-humid",
      },
    ],
  };

  const apparentTemperatureChart = {
    labels: hourLabels,
    datasets: [
      {
        label: "Apparent Temperature"+" "+ data.latitude +" Latitude " + data.longitude +" Longitude " + getDay(data.current.time, timeZones),
        data: apparentTemperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
        yAxisID: "y-axis-appTemp",
      },
    ],
  };

  // const dailyData = data.daily.map((data) => {
  //     return {
  //     time: getDay(data.time, timeZones),
  //     weatherCode: data.weatherCode,
  //     temperatureMax: data.temperature2mMax,
  //     temperatureMin: data.temperature2mMin,
  //     apparentTemperatureMax: data.apparentTemperatureMax,
  //     apparentTemperatureMin: data.apparentTemperatureMin,
  //     };
  // });

  return { temperatureChart, humidityChart, apparentTemperatureChart };
};

export const getHours = (time: Date, timezone: string) => {
  const date = new Date(time.toString());
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
};
export const getDay = (time: Date, timezone: string) => {
  const date = new Date(time.toString());
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: timezone,
  });
}
