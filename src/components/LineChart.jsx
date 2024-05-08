import React, { useEffect } from "react";
import Highcharts from "highcharts";
import { mockLineData } from "../data/mockData";
import accessibility from "highcharts/modules/accessibility";

accessibility(Highcharts);

const LineChart = () => {
  useEffect(() => {
    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "Number of People by Transportation",
      },
      xAxis: {
        title: {
          text: "Transportation",
        },
      },
      yAxis: {
        title: {
          text: "Number of People",
        },
      },
      series: mockLineData.map((data) => ({
        name: data.id,
        data: data.data.map((item) => [item.x, item.y]),
        color: data.color,
      })),
      accessibility: {
        enabled: true,
      },
    };

    Highcharts.chart("line-chart-container", options);
  }, []);

  return <div id="line-chart-container" style={{ height: "84vh" }} />;
};

export default LineChart;
