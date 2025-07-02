import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  it("renders the title and subtitle correctly", () => {
    const title = "Welcome to Admin Dashboard";
    const subtitle = "Manage your data with ease";
    render(<Header title={title} subtitle={subtitle} />);
    const titleElement = screen.getByText(title);
    const subtitleElement = screen.getByText(subtitle);
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("applies the correct styles based on the theme", () => {
    const title = "Welcome to Admin Dashboard";
    const subtitle = "Manage your data with ease";
    render(<Header title={title} subtitle={subtitle} />);
    const titleElement = screen.getByText(title);
    const subtitleElement = screen.getByText(subtitle);
    expect(titleElement).toHaveStyle("color: #000000");
    expect(subtitleElement).toHaveStyle("color: #f6da54");
  });
});