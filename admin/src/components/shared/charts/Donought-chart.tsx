import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DonutChartProps {
  data: {
    labelData: string;
    value: number;
  }[];
  height?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 300,
}) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: ['#FF7E5C', '#63C7FF', '#FFE05C', '#FF7ED4', '#7ED957', '#98D957'],
    labels: data.map((item) => item.labelData),
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          labels: {
            show: false,
          },
        },
        offsetY: 0,
      },
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  const series = data.map((item) => item.value);

  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="relative" style={{ width: height, height: height }}>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={height}
      />

      <svg
        className="absolute inset-0"
        width={height}
        height={height}
        viewBox={`0 0 ${height} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((item, index) => {
          const chartRadius = height / 2;
          const labelRadius = chartRadius * 1.15;
          const lineEndRadius = chartRadius * 1.02;
          const chartCenter = { x: chartRadius, y: chartRadius };

          const lineStart = calculatePosition(
            index + 0.5,
            data.length,
            lineEndRadius
          );
          const labelPos = calculatePosition(
            index + 0.5,
            data.length,
            labelRadius
          );

          const isRight = labelPos.x > 0;

          return (
            <g key={item.labelData}>
              <line
                x1={chartCenter.x + lineStart.x}
                y1={chartCenter.y + lineStart.y}
                x2={chartCenter.x + labelPos.x}
                y2={chartCenter.y + labelPos.y}
                stroke="#CCCCCC"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              <foreignObject
                x={chartCenter.x + labelPos.x - (isRight ? 0 : 100)}
                y={chartCenter.y + labelPos.y - 20}
                width="120"
                height="50"
              >
                <div className="overflow-visible">
                  <span
                    className="text-lg font-bold"
                    style={{ color: options.colors?.[index] }}
                  >
                    {item.value}%
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    {item.labelData}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
