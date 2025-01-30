import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "./button.component";

describe("button tests", () => {
  test("should render basic button is rendered when nothing is passed", () => {
    render(<Button>Test</Button>);
    const ButtonElement = screen.getByText(/test/i);
    expect(ButtonElement).toHaveStyle("background-color: black");
  });

  test("should render google button when google type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
    const googleButtonElement = screen.getByRole("button");
    expect(googleButtonElement).toHaveStyle("background-color: #4285f4");
  });

  test("should render inverted button when inverted type is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);
    const invertedButtonElement = screen.getByRole("button");
    expect(invertedButtonElement).toHaveStyle("background-color: white");
  });

  test("should button be disabled when isLoading is true", () => {
    render(<Button isLoading={true} />);
    const loadingButtonElement = screen.getByRole("button");
    expect(loadingButtonElement).toBeDisabled();
  });
});
