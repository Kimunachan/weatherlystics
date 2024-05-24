import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@/utils/customTestUtils"; // Ensure this wraps components with QueryClientProvider
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

describe("Form Component", () => {
  const mockSetWeatherData = jest.fn();

  beforeEach(() => {
    axiosMock.reset();
  });

  it("should display error messages for all invalid fields", async () => {
    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1); // lat, long, and date
      alerts.forEach((alert) => {
        expect(alert).toHaveTextContent("Required");
      });
    });
  });

  it("should call toast.error if there is an error fetching weather data", async () => {
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
      expect(toast.error).toHaveBeenCalledWith(
        "Error fetching weather data: Error: Request failed with status code 500"
      );
    });
  });

  it("should call toast.error if geolocation is not supported", async () => {
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

    expect(toast.error).toHaveBeenCalledWith(
      "Geolocation is not supported by this browser."
    );
  });

  it("should toggle second date input", async () => {
    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    fireEvent.click(screen.getByText("add"));

    expect(screen.getByLabelText(/Second Date/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("add"));

    expect(screen.queryByLabelText(/Second Date/i)).not.toBeInTheDocument();
  });

  it("should handle timezone selection", async () => {
    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    axiosMock.onGet(/weather/).replyOnce(500, { message: "Error" });

    render(<Form setWeatherData={mockSetWeatherData} />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    const selectInput = screen.getByRole("combobox");
    fireEvent.keyDown(selectInput, { key: "ArrowDown", code: "ArrowDown" });

    await waitFor(() => screen.getByText("Europe/Berlin"));

    fireEvent.click(screen.getByText("Europe/Berlin"));

    await waitFor(() => {
      expect(screen.getByText("Europe/Berlin")).toBeInTheDocument();
    });
  });

  it("should show loading state for timezones", async () => {
    axiosMock.onGet("http://worldtimeapi.org/api/timezone").reply(200, []);

    render(<Form setWeatherData={mockSetWeatherData} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the form and interact correctly", async () => {
    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Europe/Berlin", "America/New_York"]);

    axiosMock.onGet(/weather/).replyOnce(200, { data: "mockWeatherData" });

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
        new Date().toISOString().slice(0, 10)
      );
    });

    expect(mockSetWeatherData).toHaveBeenCalled();
    const form = screen.getByTestId("form");
    expect(form).toMatchSnapshot();
  });

  it("should handle 'Use my location' button click", async () => {
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
    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,
    });

    fireEvent.click(screen.getByText("Use my location"));

    await waitFor(() => {
      expect(screen.getByLabelText("Latitude:")).toHaveValue(52.52);
      expect(screen.getByLabelText("Longitude:")).toHaveValue(13.405);
    });
  });

  it("should call toast.error if there is an error fetching timezones", async () => {
    axiosMock.onGet("http://worldtimeapi.org/api/timezone").replyOnce(500);

    render(<Form setWeatherData={mockSetWeatherData} />);

    // Wait for the component to handle the error and remove the loading state
    await waitFor(() => {
      // Directly check if the toast.error was called
      expect(toast.error).toHaveBeenCalled();
    });

    // Ensure the specific error message was called
    expect(toast.error).toHaveBeenCalledWith("Error fetching timezones");

    // Ensure loading state is no longer present
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
