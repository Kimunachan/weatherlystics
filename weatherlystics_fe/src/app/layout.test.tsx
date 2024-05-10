import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@/utils/customTestUtils";
import RootLayout from "./layout";

describe("Root Layout", () => {
  it("should render the root layout", async () => {
    const { container } = render(
      <RootLayout children={<div data-testid="dummy"></div>} />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("dummy")).toBeInTheDocument();
  });
});
