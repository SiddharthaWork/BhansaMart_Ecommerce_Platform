import ReactApexChart from 'react-apexcharts';

interface barChartPropTypes {
  data: {
    labelData: string;
    value: number;
  }[];
  height?: number;
  fill?: {
    type: string;
    colors?: string[];
    gradient?: {
      shade: string;
      type: string; // Gradient direction (can be "horizontal", "vertical", etc.)
      shadeIntensity: number;
      gradientToColors: string[]; // Gradient end color
      inverseColors: boolean;
      opacityFrom: number;
      opacityTo: number;
      stops: number[]; // Defines the gradient stops
    };
  };
  colors?: string[];
}

const BarChart = ({ data, height, fill, colors }: barChartPropTypes) => {
  const options = {
    chart: {
      id: 'basic-bar',
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
        columnWidth: '50%', // Adjusts the width of the bars to increase spacing
        borderRadius: 2,
      },
    },
    colors: colors,
    fill: fill,
  };

  const series = [
    {
      name: 'series-1',
      data: data.map((item) => item.value),
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={height ?? 300}
    />
  );
};

export default BarChart;
