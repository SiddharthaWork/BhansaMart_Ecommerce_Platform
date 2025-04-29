interface propTypes {
  data: {
    date: Date | string;
    totalSales: number;
  }[];
}

export const WeeklySalesMapper = ({ data }: propTypes) => {
  const mappedData = data?.map((item) => {
    const date = new Date(item.date).toDateString()?.slice(0, 1);
    return {
      labelData: date,
      value: item?.totalSales,
    };
  });
  const totalWeeklySales = data?.reduce(
    (item, acc) => item + acc.totalSales,
    0
  );

  return { mappedData, totalWeeklySales };
};
