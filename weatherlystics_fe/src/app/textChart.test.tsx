import { render, screen, waitFor } from "@/utils/customTestUtils";
import { reformData } from "@/utils/function";
import { WeatherDataType } from "@/utils/types";
import TextChart from "./textChart";

jest.mock('../utils/function', () => ({
  reformData: jest.fn()
}));

const mockData: WeatherDataType = {
  latitude: 0,
  longitude: 0,
  timezone: "",
  timezoneAbbreviation: "",
  current: {
    time: new Date(),
    temperature2m: 20,
    relativeHumidity2m: 50,
    apparentTemperature: 22,
  },
  hourly: [],
  daily: [],
};

const mockReformData = {
  temperatureChart: {
    labels: ["10:00", "11:00"],
    datasets: [{ data: [20, 21] }]
  },
  humidityChart: {
    labels: ["10:00", "11:00"],
    datasets: [{ data: [50, 55] }]
  },
  apparentTemperatureChart: {
    labels: ["10:00", "11:00"],
    datasets: [{ data: [22, 23] }]
  }
};

describe("TextChart", () => {
  beforeEach(() => {
    (reformData as jest.Mock).mockImplementation(() => mockReformData);
  });

  it("renders without crashing", async () => {
    const { container } = render(<TextChart weatherData={mockData} />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });

    expect(screen.getByTestId("chart_temp")).toBeInTheDocument();
    expect(screen.getByTestId("chart_humidity")).toBeInTheDocument();
    expect(screen.getByTestId("chart_appTemp")).toBeInTheDocument();
  });

  it("returns null when weatherData is undefined", async () => {
    const { container } = render(<TextChart weatherData={undefined} />);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
  

  it("renders the text data correctly", async () => {
    render(<TextChart weatherData={mockData} />);

    await waitFor(() => {
      expect(screen.getByTestId("chart_temp")).toBeInTheDocument();
      expect(screen.getByTestId("chart_humidity")).toBeInTheDocument();
      expect(screen.getByTestId("chart_appTemp")).toBeInTheDocument();
    });

    expect(screen.getByText("10:00: 20 °C")).toBeInTheDocument();
    expect(screen.getByText("11:00: 21 °C")).toBeInTheDocument();
    expect(screen.getByText("10:00: 50 %")).toBeInTheDocument();
    expect(screen.getByText("11:00: 55 %")).toBeInTheDocument();
    expect(screen.getByText("10:00: 22 °C")).toBeInTheDocument();
    expect(screen.getByText("11:00: 23 °C")).toBeInTheDocument();
  });

  it("renders 'data is not available' when chart data is null", async () => {
    const mockEmptyData = {
      temperatureChart: null,
      humidityChart: null,
      apparentTemperatureChart: null
    };
    
    (reformData as jest.Mock).mockImplementation(() => mockEmptyData);

    render(<TextChart weatherData={mockData} />);

    await waitFor(() => {
      expect(screen.getAllByText("Data is not available")).toBeInTheDocument();
    });
  });
});
