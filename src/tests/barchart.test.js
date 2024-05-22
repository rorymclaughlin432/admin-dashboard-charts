import React from "react";
import { render } from "@testing-library/react";
import Highcharts from "highcharts";
import BarChart from "../components/BarChart";
import { mockBarData } from "../data/mockData";

it("should render a bar chart with correct data and options", () => {
  // Mock the Highcharts.chart function
  jest.spyOn(Highcharts, "chart").mockImplementation(() => {});

  // Render the BarChart component
  render(<BarChart />);

  // Check if Highcharts.chart is called with the correct arguments
  expect(Highcharts.chart).toHaveBeenCalledWith("bar-chart-container", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Food Consumption by Country",
    },
    xAxis: {
      categories: mockBarData.map((data) => data.country),
      title: {
        text: "Country",
      },
    },
    yAxis: {
      title: {
        text: "Food Count",
      },
    },
    series: [
      {
        name: "Hot Dog",
        data: mockBarData.map((data) => data["hot dog"]),
        color: "hsl(229, 70%, 50%)",
      },
      {
        name: "Burger",
        data: mockBarData.map((data) => data.burger),
        color: "hsl(296, 70%, 50%)",
      },
      {
        name: "Kebab",
        data: mockBarData.map((data) => data.kebab),
        color: "hsl(97, 70%, 50%)",
      },
      {
        name: "Donut",
        data: mockBarData.map((data) => data.donut),
        color: "hsl(340, 70%, 50%)",
      },
    ],
    accessibility: {
      enabled: true,
    },
  });

  // Restore the original implementation of Highcharts.chart
  Highcharts.chart.mockRestore();
});

// Uses mock data to populate chart
it("should use mock data to populate chart", () => {
  // Mock the Highcharts.chart function
  jest.spyOn(Highcharts, "chart").mockImplementation(() => {});

  // Render the BarChart component
  render(<BarChart />);

  // Check if Highcharts.chart is called with the correct data
  expect(Highcharts.chart).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      series: [
        {
          name: "Hot Dog",
          data: mockBarData.map((data) => data["hot dog"]),
          color: "hsl(229, 70%, 50%)",
        },
        {
          name: "Burger",
          data: mockBarData.map((data) => data.burger),
          color: "hsl(296, 70%, 50%)",
        },
        {
          name: "Kebab",
          data: mockBarData.map((data) => data.kebab),
          color: "hsl(97, 70%, 50%)",
        },
        {
          name: "Donut",
          data: mockBarData.map((data) => data.donut),
          color: "hsl(340, 70%, 50%)",
        },
      ],
    })
  );

  // Restore the original implementation of Highcharts.chart
  Highcharts.chart.mockRestore();
});

// mockBarData is empty
it("should render an empty chart when mockBarData is empty", () => {
  // Mock the Highcharts.chart function
  jest.spyOn(Highcharts, "chart").mockImplementation(() => {});

  // Render the BarChart component with empty mockBarData
  render(<BarChart />, { mockBarData: [] });

  // Check if Highcharts.chart is called with an empty series
  expect(Highcharts.chart).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      series: [],
    })
  );

  // Restore the original implementation of Highcharts.chart
  Highcharts.chart.mockRestore();
});

// mockBarData is not an array
it("should render an empty chart when mockBarData is not an array", () => {
  // Mock the Highcharts.chart function
  jest.spyOn(Highcharts, "chart").mockImplementation(() => {});
  jest.mock("highcharts", () => ({
    chart: jest.fn().mockResolvedValue(null),
  }));

  let mockData = {};
  // Render the BarChart component with non-array mockBarData
  render(<BarChart />, { mockData: {} });

  if (!Array.isArray(mockData)) {
    mockData = [];
  }

  // Check if Highcharts.chart is called with an empty series
  expect(Highcharts.chart).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      series: [],
    })
  );

  // Restore the original implementation of Highcharts.chart
  Highcharts.chart.mockRestore();
});

    // Sets x-axis categories to country names
    it('should set x-axis categories to country names', () => {
        // Mock the Highcharts.chart function
        jest.spyOn(Highcharts, 'chart').mockImplementation(() => {});
  
        // Render the BarChart component
        render(<BarChart />);
  
        // Check if Highcharts.chart is called with the correct arguments
        expect(Highcharts.chart).toHaveBeenCalledWith('bar-chart-container', {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Food Consumption by Country',
          },
          xAxis: {
            categories: mockBarData.map(data => data.country),
            title: {
              text: 'Country'
            }
          },
          yAxis: {
            title: {
              text: 'Food Count'
            }
          },
          series: [
            {
              name: 'Hot Dog',
              data: mockBarData.map(data => data['hot dog']),
              color: 'hsl(229, 70%, 50%)'
            },
            {
              name: 'Burger',
              data: mockBarData.map(data => data.burger),
              color: 'hsl(296, 70%, 50%)'
            },
            {
              name: 'Kebab',
              data: mockBarData.map(data => data.kebab),
              color: 'hsl(97, 70%, 50%)'
            },
            {
              name: 'Donut',
              data: mockBarData.map(data => data.donut),
              color: 'hsl(340, 70%, 50%)'
            }
          ],
          accessibility: { 
            enabled: true 
          }
        });
  
        // Restore the original implementation of Highcharts.chart
        Highcharts.chart.mockRestore();
      });
