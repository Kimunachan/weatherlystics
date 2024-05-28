import { reformData } from "./function";
import { WeatherDataType } from "./types";

describe("functions", () => {
  it("should return the data correctly reformed", () => {
    const data: WeatherDataType = {
      timezone: "Europe/London",
      hourly: [
        {
          time: new Date(1629886800 * 1000),
          temperature2m: 20,
          relativeHumidity2m: 50,
          apparentTemperature: 21,
        },
        {
          time: new Date(1629888000 * 1000),
          temperature2m: 21,
          relativeHumidity2m: 51,
          apparentTemperature: 22,
        },
        // Add more hourly data to ensure there are at least 12 elements
        ...Array.from({ length: 10 }, (_, i) => ({
          time: new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000),
          temperature2m: 21 + i,
          relativeHumidity2m: 51 + i,
          apparentTemperature: 22 + i,
        })),
      ],
      current: {
        time: new Date(1629886800 * 1000),
        temperature2m: 20,
        relativeHumidity2m: 50,
        apparentTemperature: 21,
      },
      latitude: 51.5074,
      longitude: 0.1278,
      timezoneAbbreviation: "BST",
      daily: [],
    };

    const expected = {
      temperatureChart: {
        datasets: [
          {
            borderColor: "rgba(255, 99, 132, 1)",
            data: [20, 21, ...Array.from({ length: 10 }, (_, i) => 21 + i)],
            label: "Temperature 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-temp",
          },
        ],
        labels: ["11:20", "11:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
      },
      humidityChart: {
        datasets: [
          {
            borderColor: "rgba(54, 162, 235, 1)",
            data: [50, 51, ...Array.from({ length: 10 }, (_, i) => 51 + i)],
            label: "Humidity 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-humid",
          },
        ],
        labels: ["11:20", "11:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
      },
      apparentTemperatureChart: {
        datasets: [
          {
            borderColor: "rgba(75, 192, 192, 1)",
            data: [21, 22, ...Array.from({ length: 10 }, (_, i) => 22 + i)],
            label: "Apparent Temperature 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-appTemp",
          },
        ],
        labels: ["11:20", "11:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
      },
    };

    expect(reformData(data)).toEqual(expected);
  });

  it("should return the data correctly reformed for array input", () => {
    const data: WeatherDataType[] = [
      {
        current: {
          apparentTemperature: 21,
          relativeHumidity2m: 50,
          temperature2m: 20,
          time: new Date("2021-08-25T10:20:00.000Z"),
        },
        daily: [],
        hourly: [
          {
            apparentTemperature: 21,
            relativeHumidity2m: 50,
            temperature2m: 20,
            time: new Date("2021-08-25T10:20:00.000Z"),
          },
          {
            apparentTemperature: 22,
            relativeHumidity2m: 51,
            temperature2m: 21,
            time: new Date("2021-08-25T10:40:00.000Z"),
          },
          // Add more hourly data to ensure there are at least 12 elements
          ...Array.from({ length: 10 }, (_, i) => ({
            time: new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000),
            temperature2m: 21 + i,
            relativeHumidity2m: 51 + i,
            apparentTemperature: 22 + i,
          })),
        ],
        latitude: 51.5074,
        longitude: 0.1278,
        timezone: "Europe/London",
        timezoneAbbreviation: "BST",
      },
    ];

    const result = reformData(data);

    const expected = {
      temperatureChart: {
        labels: ["10:20", "10:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
        datasets: [
          {
            label: "Temperature Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [20, 21, ...Array.from({ length: 10 }, (_, i) => 21 + i)],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
            yAxisID: "y-axis-temp",
          },
        ],
      },
      humidityChart: {
        labels: ["10:20", "10:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
        datasets: [
          {
            label: "Humidity Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [50, 51, ...Array.from({ length: 10 }, (_, i) => 51 + i)],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
            yAxisID: "y-axis-humid",
          },
        ],
      },
      apparentTemperatureChart: {
        labels: ["10:20", "10:40", ...Array.from({ length: 10 }, (_, i) => getHours(new Date(1629888000 * 1000 + (i + 1) * 3600 * 1000), "Europe/London"))],
        datasets: [
          {
            label: "Apparent Temperature Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [21, 22, ...Array.from({ length: 10 }, (_, i) => 22 + i)],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
            yAxisID: "y-axis-appTemp",
          },
        ],
      },
    };

    expect(result).toEqual(expected);
  });
});

// Helper functions used in the tests
const getHours = (time: Date, timezone: string) => {
  const date = new Date(time.toString());
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
};

const getDay = (time: Date, timezone: string) => {
  const date = new Date(time.toString());
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: timezone,
  });
};
