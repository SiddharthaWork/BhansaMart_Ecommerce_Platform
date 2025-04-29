import { Icon } from "@iconify/react/dist/iconify.js";
import { BarChart, Text } from "../../shared";

interface _weeklySalesPropTypes {
  totalSales: number;
  sales: { labelData: string; value: number }[];
  totalProfit: number;
}

export const _WeeklySales = ({
  sales,
  totalProfit,
  totalSales,
}: _weeklySalesPropTypes) => {
  const fill = {
    type: "",
    colors: ["#59D20D"],
  };

  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white">
      <section>
        <Text size="body-md-lg" variant="grey">
          Weekly Sales
        </Text>
        <Text size="body-xs-mid" variant="grey-300">
          Total {totalSales} Sales
        </Text>
      </section>

      <BarChart data={sales} height={200} fill={fill} />

      <section className="flex place-items-center justify-between">
        <div className="flex place-items-center gap-2">
          <section className="bg-[#F2EAFF] p-2 rounded">
            <Icon icon="iconamoon:trend-up" fontSize={24} color="#6378E5" />
          </section>
          <section className="flex flex-col">
            <Text size="body-sm-mid">{totalSales}</Text>
            <Text size="body-xs-default" variant="grey-300">
              Sales
            </Text>
          </section>
        </div>

        <div className="flex place-items-center gap-2">
          <section className="bg-[#59D20D29] p-2 rounded">
            <Icon icon="bx:dollar" fontSize={24} color="#59D20D" />
          </section>
          <section className="flex flex-col">
            <Text size="body-sm-mid">{totalProfit}</Text>
            <Text size="body-xs-default" variant="grey-300">
              Total Profit
            </Text>
          </section>
        </div>
      </section>
    </div>
  );
};
