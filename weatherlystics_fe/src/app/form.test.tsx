import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@/utils/customTestUtils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { toast } from "react-toastify";
import Form from "./Form";
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const axiosMock = new MockAdapter(axios);



describe("Form", () => {
  beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  it("should render the form and interact correctly", async () => {
    const mockSetWeatherData = jest.fn();

    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    axiosMock
      .onGet(/weather/)
      .replyOnce(200, { data: "mockWeatherData" });

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    fireEvent.change(screen.getByLabelText("Latitude:"), {
      target: { value: 52.52 },
    });
    fireEvent.change(screen.getByLabelText("Longitude:"), {
      target: { value: 13.405 },
    });

    const selectInput = screen.getByRole("combobox");
    fireEvent.keyDown(selectInput, { key: "ArrowDown", code: "ArrowDown" });

    await waitFor(() => screen.getByText("Europe/Berlin"));

    fireEvent.click(screen.getByText("Europe/Berlin"));

    fireEvent.submit(screen.getByTestId("form"));

    await waitFor(() => {
      expect(screen.getByTestId("form")).toBeInTheDocument();
      expect(screen.getByLabelText("Latitude:")).toHaveValue(52.52);
      expect(screen.getByLabelText("Longitude:")).toHaveValue(13.405);
      expect(screen.getByLabelText("Date:")).toHaveValue(
        new Date().toISOString().split("T")[0]
      );
    });

    expect(mockSetWeatherData).toHaveBeenCalled();
    const form = screen.getByTestId("form");
    expect(form).toMatchSnapshot();
  });
  it("should display errors for invalid inputs", async () => {
    const mockSetWeatherData = jest.fn();

    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    // Clear inputs to trigger validation errors
    fireEvent.change(screen.getByLabelText("Latitude:"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Longitude:"), {
      target: { value: "" },
    });

    fireEvent.submit(screen.getByTestId("form"));

    

  });

  it("should call toast.error if geolocation is not supported",async () => {
    const mockSetWeatherData = jest.fn();

    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    fireEvent.click(screen.getByText("Use my location"));

    expect(toast.error).toHaveBeenCalledWith("Geolocation is not supported by this browser.");
  });

  it("should call toast.error if there is an error fetching weather data", async () => {
    const mockSetWeatherData = jest.fn();

    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    axiosMock.onGet(/weather/).replyOnce(500, { message: "Error" });

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    fireEvent.change(screen.getByLabelText("Latitude:"), {
      target: { value: 52.52 },
    });
    fireEvent.change(screen.getByLabelText("Longitude:"), {
      target: { value: 13.405 },
    });

    const selectInput = screen.getByRole("combobox");
    fireEvent.keyDown(selectInput, { key: "ArrowDown", code: "ArrowDown" });

    await waitFor(() => screen.getByText("Europe/Berlin"));

    fireEvent.click(screen.getByText("Europe/Berlin"));

    fireEvent.submit(screen.getByTestId("form"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error fetching weather data: Error: Request failed with status code 500");
    });
  });

  
  

  it("should handle 'Use my location' button click", async () => {
    const mockSetWeatherData = jest.fn();

    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 52.52,
            longitude: 13.405,
          },
        })
      ),
    };

    // Mock navigator.geolocation with jest-location-mock
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
    });

    fireEvent.click(screen.getByText("Use my location"));

    await waitFor(() => {
      expect(screen.getByLabelText("Latitude:")).toHaveValue(52.52);
      expect(screen.getByLabelText("Longitude:")).toHaveValue(13.405);
    });
  });
});
