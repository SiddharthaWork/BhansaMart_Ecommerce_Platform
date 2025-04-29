import ReactApexChart from "react-apexcharts";

interface barChartPropTypes {
  data: {
    labelData: string;
    value: number;
  }[];
  height?: number;
}

export const LineChart = ({ data, height }: barChartPropTypes) => {
  const options = {
    chart: {
      id: "line",
      toolbar: {
        show: false, // Disables the navigation toolbar (zoom, pan, etc.)
      },
      zoom: {
        enabled: false, // Disables zoom functionality
      },
    },

    xaxis: {
      categories: data.map((item) => item.labelData),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false, // Hides the horizontal grid lines
    },
    dataLabels: {
      enabled: false, // Disables the information displayed inside the bars
    },
    plotOptions: {
      bar: {
        columnWidth: "50%", // Adjusts the width of the bars to increase spacing
        borderRadius: 4,
      },
    },
    stroke: {
      curve: "smooth" as "smooth",
      width: 4, // Thickness of the line
      colors: ["#59D20D"], // Line color
    },
    fill: {
      type: "solid", // Removes the gradient
      colors: ["#59D20D"], // Fill color for the line
    },
  };

  const series = [
    {
      name: "series-1",
      data: data.map((item) => item.value),
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={height ?? 300}
    />
  );
};
