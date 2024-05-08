import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { mockBarData } from '../data/mockData';
import accessibility from 'highcharts/modules/accessibility';

// Initialize the accessibility module
accessibility(Highcharts);

const BarChart = () => {
  useEffect(() => {
    
    const options = {
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
    };

    // Render the chart
    Highcharts.chart('bar-chart-container', options);
  }, []);

  return <div id="bar-chart-container" style={{ height: "84vh" }} />;
};

export default BarChart;
