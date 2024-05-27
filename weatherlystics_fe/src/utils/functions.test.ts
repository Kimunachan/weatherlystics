import { reformData } from "./function";
import { WeatherDataType } from "./types";

describe("functions", () => {
  it("should return the data corretly reformed", () => {
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
            data: [20, 21],
            label: "Temperature 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-temp",
          },
        ],
        labels: ["11:20", "11:40"],
      },
      humidityChart: {
        datasets: [
          {
            borderColor: "rgba(54, 162, 235, 1)",
            data: [50, 51],
            label: "Humidity 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-humid",
          },
        ],
        labels: ["11:20", "11:40"],
      },
      apparentTemperatureChart: {
        datasets: [
          {
            borderColor: "rgba(75, 192, 192, 1)",
            data: [21, 22],
            label: "Apparent Temperature 51.5074 Latitude 0.1278 Longitude 25.08.2021",
            tension: 0.1,
            yAxisID: "y-axis-appTemp",
          },
        ],
        labels: ["11:20", "11:40"],
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
        ],
        latitude: 51.5074,
        longitude: 0.1278,
        timezone: "Europe/London",
        timezoneAbbreviation: "BST",
      },
      // Sie können hier weitere Elemente hinzufügen
    ];

    const result = reformData(data);

    const expected = {
      temperatureChart: {
        labels: ["10:20", "10:40"],
        datasets: [
          {
            label: "Temperature Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [20, 21],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
          },
          // Weitere Datasets für weitere Elemente in data
        ],
      },
      humidityChart: {
        labels: ["10:20", "10:40"],
        datasets: [
          {
            label: "Humidity Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [50, 51],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
          },
          // Weitere Datasets für weitere Elemente in data
        ],
      },
      apparentTemperatureChart: {
        labels: ["10:20", "10:40"],
        datasets: [
          {
            label: "Apparent Temperature Latitude 51.51 Longitude 0.13 25.08.2021",
            data: [21, 22],
            borderColor: "rgba(200, 133, 66, 1)",
            tension: 0.1,
          },
          // Weitere Datasets für weitere Elemente in data
        ],
      },
    };

    expect(result).toEqual(expected);
  });
});
