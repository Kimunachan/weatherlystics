import { getMinMaxPerDataset } from "@/utils/annotations";
import { render, screen, waitFor } from "@/utils/customTestUtils";
import { WeatherDataType } from "@/utils/types";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Chart from "./chart";

const axiosMock = new MockAdapter(axios);

describe("Chart", () => {
  it("renders without crashing", async () => {
    const mockData: WeatherDataType = {
      latitude: 0,
      longitude: 0,
      timezone: "Europe/Berlin",
      timezoneAbbreviation: "",
      current: {
        time: new Date(),
        temperature2m: 0,
        relativeHumidity2m: 0,
        apparentTemperature: 0,
      },
      hourly: [],
      daily: [],
    };

    axiosMock.onGet("/api/weatherData").replyOnce(200, mockData);

    const { container } = render(<Chart weatherData={mockData} />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });

    expect(screen.getByTestId("chart_temp")).toBeInTheDocument();
    expect(screen.getByTestId("chart_humidity")).toBeInTheDocument();
    expect(screen.getByTestId("chart_appTemp")).toBeInTheDocument();
  });
  it('calculates min and max correctly when data is an array of objects', () => {
    const datasets = [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
        ],
      },
    ];
    const minMax = getMinMaxPerDataset(datasets);
    expect(minMax).toEqual([{ min: 1, max: 3, xMin: 1, xMax: 3 }]);
  });
});
