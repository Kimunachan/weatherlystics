import Dropdown from ".";
import { render, screen, waitFor, fireEvent } from "@/utils/customTestUtils";

describe("Dropdown", () => {
  it("should render", async () => {
    render(<Dropdown onChange={() => {}} options={[]} />);

    await waitFor(() => {
      expect(screen.getByTestId("dropdown-wrapper")).toBeInTheDocument();
    });
  });

  it("should set the label to the default value", async () => {
    render(<Dropdown onChange={() => {}} options={[]} defaultValue="Test" />);

    await waitFor(() => {
      expect(screen.getByTestId("label")).toHaveTextContent("Test");
    });
  });

  it("should set the label to the selected value", async () => {
    render(
      <Dropdown
        onChange={() => {}}
        options={[{ label: "Test", value: "test" }]}
        defaultValue="Test1234"
        selectable
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dropdown-wrapper"));
      fireEvent.click(screen.getByTestId("dropdown-option"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("label")).toHaveTextContent("Test");
    });
  });

  it("should not have a clear button", async () => {
    render(<Dropdown onChange={() => {}} options={[]} clearable={false} />);

    await waitFor(() => {
      expect(screen.queryByTestId("clear-button")).not.toBeInTheDocument();
    });
  });

  it("should have a clear button", async () => {
    render(<Dropdown onChange={() => {}} options={[]} clearable />);

    await waitFor(() => {
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
    });
  });

  it("should clear the selected value", async () => {
    render(
      <Dropdown
        onChange={() => {}}
        options={[{ label: "Test", value: "test" }]}
        defaultValue="Test1234"
        selectable
        clearable={true}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dropdown-wrapper"));
      fireEvent.click(screen.getByTestId("dropdown-option"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("label")).toHaveTextContent("Test");
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("clear-button"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("label")).toHaveTextContent("Test1234");
    });
  });

  it("should close the dropdown when clicking outside", async () => {
    render(
      <Dropdown
        onChange={() => {}}
        options={[
          {
            value: "test",
            label: "Test",
          },
        ]}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("dropdown-wrapper"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("dropdown-options")).toHaveClass("show");
    });

    await waitFor(() => {
      fireEvent.blur(screen.getByTestId("dropdown-wrapper"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("dropdown-options")).not.toHaveClass("show");
    });
  });
});
