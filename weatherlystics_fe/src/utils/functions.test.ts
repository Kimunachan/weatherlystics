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
      hourlyData: {
        labels: ["11:20", "11:40"],
        datasets: [
          {
            label: "Temperature",
            data: [20, 21],
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
            yAxisID: "y-axis-temp",
          },
          {
            label: "Humidity",
            data: [50, 51],
            borderColor: "rgba(54, 162, 235, 1)",
            tension: 0.1,
            yAxisID: "y-axis-humid",
          },
          {
            label: "Apparent Temperature",
            data: [21, 22],
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
            yAxisID: "y-axis-temp",
          },
        ],
      },
    };
    expect(reformData(data)).toEqual(expected);
  });
});
