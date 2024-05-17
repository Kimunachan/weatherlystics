import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@/utils/customTestUtils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Form from "./Form";

const axiosMock = new MockAdapter(axios);

describe("Form", () => {
  it("should render the form", async () => {
    const mockSetWeatherData = jest.fn();
    axiosMock
    .onGet("http://worldtimeapi.org/api/timezone")
    .replyOnce(200, ["Region1"]);
   
    const { container } = render(<Form setWeatherData={mockSetWeatherData} />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByLabelText('Latitude:')).toHaveValue(0);
    expect(screen.getByLabelText('Longitude:')).toHaveValue(0);
    expect(screen.getByLabelText('Date:')).toHaveValue(new Date().toISOString().split('T')[0]);
  });
});