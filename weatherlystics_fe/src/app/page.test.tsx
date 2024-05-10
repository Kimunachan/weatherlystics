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
    axiosMock
      .onGet("http://worldtimeapi.org/api/timezone")
      .replyOnce(200, ["Region1"]);
    // Arrange

    const { container } = render(await Page());
    // Act

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
    // Assert

    expect(screen.getByText("Weatherlystics")).toBeInTheDocument();
  });
});
