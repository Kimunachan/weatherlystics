import { render, screen } from "@/utils/customTestUtils";
import RootLayout, { metadata } from "./layout";

describe("Root Layout", () => {
  it("should render the root layout", async () => {
    const { container } = render(
      <RootLayout children={<div data-testid="dummy"></div>} />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("dummy")).toBeInTheDocument();
  });

  it("should export the correct metadata", () => {
    expect(metadata).toEqual({
      title: "Weatherlystics",
      description:
        "A weather app that provides weather information for cities around the world.",
    });
  });
});
