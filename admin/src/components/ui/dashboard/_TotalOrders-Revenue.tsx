import { Text } from '../../shared';

interface _totalOrdersRevenuePropTypes {
  title: string;
  value: string | number | undefined;
  margin: number;
  dateFilteration: string;
  dateFilterationColor?: string;
  avatarImage: string;
}

export const _TotalOrdersRevenue = ({
  avatarImage,
  dateFilteration,
  margin,
  title,
  value,
}: // dateFilterationColor,
_totalOrdersRevenuePropTypes) => {
  return (
    <div className="flex place-items-center rounded p-6 relative bg-white">
      <section className="flex flex-col gap-3">
        <Text size="body-md-lg" variant="grey">
          {title}
        </Text>

        <section className="flex flex-col gap-2">
          <div className="flex place-items-center gap-2">
            <Text size="body-md-lg" variant="grey-600">
              {value}
            </Text>
            <Text
              size="body-xs-default"
              variant={margin > 0 ? 'lime-green' : 'red'}
            >
              {margin > 0 ? '+' : ''}
              {margin}%
            </Text>
          </div>

          <div className="py-1 px-2 bg-fade-bg rounded-3xl text-xs font-semibold text-center w-fit">
            {dateFilteration}
          </div>
        </section>
      </section>
      <section className="w-[180px] h-[171px] absolute -right-10 -top-8 ">
        <img src={avatarImage} alt="" className="relative w-full h-full" />
      </section>
    </div>
  );
};
