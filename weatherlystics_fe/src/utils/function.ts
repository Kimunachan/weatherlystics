import { WeatherDataType } from "./types";

export const reformData = (data_inc: WeatherDataType | WeatherDataType[]) => {
  if (Array.isArray(data_inc)) {
    const timeZones = data_inc[0].timezone;

    const hourly = data_inc.map((data) =>
      data.hourly.map((data) => {
        return {
          time: getHours(data.time, timeZones),
          temperature: data.temperature2m,
          humidity: data.relativeHumidity2m,
          apparentTemperature: data.apparentTemperature,
        };
      })
    );

    for (const data of data_inc) {
      console.log(data.current.time);
    }

    const hourLabels = hourly[0].map((data) => data.time);
    const temperatureData = hourly.map((data) =>
      data.map((data) => data.temperature)
    );
    const humidityData = hourly.map((data) =>
      data.map((data) => data.humidity)
    );
    const apparentTemperatureData = hourly.map((data) =>
      data.map((data) => data.apparentTemperature)
    );

    const temperatureChart = {
      labels: hourLabels,
      datasets: temperatureData.map((data, index) => {
        return {
          label:
            "Temperature" +
            " Latitude " +
            data_inc[index].latitude.toFixed(2) +
            " Longitude " +
            data_inc[index].longitude.toFixed(2) +
            " " +
            getDay(data_inc[index].hourly[11].time, timeZones),
          data: data,
          borderColor: `rgba(${(200 + index * 75) % 255}, ${
            (133 + index * 75) % 255
          }, ${(66 + index * 75) % 255}, 1)`,
          tension: 0.1,
          yAxisID: "y-axis-temp",
        };
      }),
    };

    const humidityChart = {
      labels: hourLabels,
      datasets: humidityData.map((data, index) => {
        return {
          label:
            "Humidity" +
            " Latitude " +
            data_inc[index].latitude.toFixed(2) +
            " Longitude " +
            data_inc[index].longitude.toFixed(2) +
            " " +
            getDay(data_inc[index].hourly[11].time, timeZones),
          data: data,
          borderColor: `rgba(${(200 + index * 75) % 255}, ${
            (133 + index * 75) % 255
          }, ${(66 + index * 75) % 255}, 1)`,
          tension: 0.1,
          yAxisID: "y-axis-humid",
        };
      }),
    };

    const apparentTemperatureChart = {
      labels: hourLabels,
      datasets: apparentTemperatureData.map((data, index) => {
        return {
          label:
            "Apparent Temperature" +
            " Latitude " +
            data_inc[index].latitude.toFixed(2) +
            " Longitude " +
            data_inc[index].longitude.toFixed(2) +
            " " +
            getDay(data_inc[index].hourly[11].time, timeZones),
          data: data,
          borderColor: `rgba(${(200 + index * 75) % 255}, ${
            (133 + index * 75) % 255
          }, ${(66 + index * 75) % 255}, 1)`,
          tension: 0.1,
          yAxisID: "y-axis-appTemp",
        };
      }),
    };
    return { temperatureChart, humidityChart, apparentTemperatureChart };
  } else {
    const timeZones = data_inc.timezone;

    const hourly = data_inc.hourly.map((data) => {
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
          label:
            "Temperature" +
            " " +
            data_inc.latitude +
            " Latitude " +
            data_inc.longitude +
            " Longitude " +
            getDay(data_inc.current.time, timeZones),
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
          label:
            "Humidity" +
            " " +
            data_inc.latitude +
            " Latitude " +
            data_inc.longitude +
            " Longitude " +
            getDay(data_inc.current.time, timeZones),
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
          label:
            "Apparent Temperature" +
            " " +
            data_inc.latitude +
            " Latitude " +
            data_inc.longitude +
            " Longitude " +
            getDay(data_inc.current.time, timeZones),
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
  }
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
};
