import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@/utils/customTestUtils";
import Page from "./page";



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
  it('should toggle between Chart and TextChart when the switch is clicked', async () => {
    render(<Page />);
    
    // Find the switch
    const toggleButton = await screen.findByTestId('toggleCharts');
    
    // Initially, Chart should be displayed
    expect(screen.getByText(/Show Text/i)).toBeInTheDocument();
    expect(screen.queryByText(/Show Charts/i)).not.toBeInTheDocument();
    
    // Click the switch
    fireEvent.click(toggleButton);
    
    // Now, TextChart should be displayed and Chart should not
    expect(screen.getByText(/Show Charts/i)).toBeInTheDocument();
    expect(screen.queryByText(/Show Text/i)).not.toBeInTheDocument();
  });
});
