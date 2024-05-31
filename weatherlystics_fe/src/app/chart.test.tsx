import { createAnnotations, getMinMaxPerDataset } from "@/utils/annotations";
import { render, screen, waitFor } from "@/utils/customTestUtils";
import { WeatherDataType } from "@/utils/types";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Chart as ChartJS } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import Chart from "./chart";
import { Line } from "react-chartjs-2";


ChartJS.register(annotationPlugin);


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
  it("calculates min and max correctly when data is an array of numbers", () => {
    const datasets = [
      {
        data: [1, 2, 3],
      },
    ];
    const minMax = getMinMaxPerDataset(datasets as any);
    expect(minMax).toEqual([{ min: 1, max: 3, xMin: 0, xMax: 2 }]);
  });
  it("returns null when weatherData is undefined", async () => {
    const { container } = render(<Chart weatherData={undefined} />);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
  it("hides annotations when the dataset is hidden", async () => {
    const datasets = [
      {
        label: "Temperature",
        data: [1, 2, 3],
        hidden: false,
      },
    ];
    const chartData = {
      labels: ["Point 1", "Point 2", "Point 3"],
      datasets: datasets,
    };
    const minMax = getMinMaxPerDataset(datasets);
    const annotations = createAnnotations(minMax, datasets.map((_, idx) => idx));

    const chartInstance = {
      isDatasetVisible: jest.fn((index) => !datasets[index].hidden),
      data: {
        datasets: datasets,
      },
    };

    render(<Line data={chartData} options={{ plugins: { annotation: { annotations } } }} />);
    
    // Initially, annotations should be visible
    expect(chartInstance.isDatasetVisible(0)).toBe(true);
    annotations.forEach(annotation => {
      expect(annotation.display({ chart: chartInstance })).toBe(true);
    });

    // Simulate hiding the dataset
    datasets[0].hidden = true;
    
    // Annotations should be hidden
    expect(chartInstance.isDatasetVisible(0)).toBe(false);
    annotations.forEach(annotation => {
      expect(annotation.display({ chart: chartInstance })).toBe(false);
    });
  });
});
