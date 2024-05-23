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
      timezone: "",
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

  it("renders loading when no data is passed", () => {
    render(<Chart weatherData={undefined} />);
  });
});
