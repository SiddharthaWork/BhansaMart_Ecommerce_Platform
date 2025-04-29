import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  data: { name: string; value: number }[];
}

export const SideBarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true, // Horizontal bar chart
        barHeight: '10%', // Adjust bar height
        borderRadius: 2,
        distributed: false,
      },
    },
    colors: ['#59D20D'], // Set bar color to match image
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#252B41'], // Dark text color
        fontSize: '14px',
        fontWeight: 'bold',
      },
      offsetX: 280, // Move text slightly away from the bar
      formatter: (val: number) => val.toLocaleString(), // Format numbers with commas
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      crosshairs: {},

      categories: data.map((item) => item.name), // Brand names
      labels: {
        formatter: (val: string) => `${(val as any) / 1000}K`, // Format x-axis numbers
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: 'Sales',
      data: data.map((item) => item.value),
    },
  ];

  return (
    <div className="chart-container">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="bar"
        height={350}
        width={450}
      />
    </div>
  );
};
