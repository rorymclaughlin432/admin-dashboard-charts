import React from "react";
import { render } from "@testing-library/react";
import LineChart from "./LineChart";

import { screen } from "@testing-library/react";

describe("<LineChart>", () => {
    it("renders without errors", () => {
        render(<LineChart />);
    });

    it("renders the chart container element", () => {
        render(<LineChart />);
        const chartContainer = screen.getByRole("chart");
        expect(chartContainer).toBeInTheDocument();
    });

    // Add more tests as needed...
});