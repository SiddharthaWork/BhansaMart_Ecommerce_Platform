import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

interface barChartPropTypes {
  data: {
    labelData: string;
    value: number;
  }[];
  height?: number;
  totalvalue: number;
  subTitle?: string;
}

export const Donought = ({
  data,
  height,
  totalvalue,
  subTitle,
}: barChartPropTypes) => {
  // Explicitly define options type
  const options: ApexOptions = {
    chart: {
      id: 'donut-chart',
      type: 'donut' as const, // Ensuring type is 'donut' explicitly
    },
    labels: data?.map((item) => item.labelData),
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
        },
      },
    },

    fill: {
      type: '',
      colors: ['#2275FC', '#2275FCBD', '#F4F5FA', '#2275FC6B'], // Custom colors
    },
    title: {
      text: totalvalue?.toFixed(),
      align: 'center',
      offsetY: 140,
      style: {
        color: '#A3A6AB',
        fontSize: '21.5px',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: subTitle,
      align: 'center',
      offsetY: 180,
      style: {
        fontSize: '12.3 px',
        fontWeight: '600',
        color: '#CAC9CC',
      },
    },
  };

  const series = data.map((item) => item.value);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={height ?? 300}
    />
  );
};
