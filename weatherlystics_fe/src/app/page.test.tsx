import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Page from "./page";
import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@/utils/customTestUtils";

const axiosMock = new MockAdapter(axios);

describe("Main Page", () => {
  it("should render the main page", async () => {
    // Arrange

    // Act
    const { container } = render(<Page />);

    // Assert
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });

    expect(screen.getByText("Weatherlystics")).toBeInTheDocument();
  });
});
