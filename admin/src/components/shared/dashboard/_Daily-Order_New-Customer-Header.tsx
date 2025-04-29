import { Icon } from "@iconify/react/dist/iconify.js";
import { Text } from "../Text";

interface _DailyOrderNewCustomerHeaderPropTypes {
  title: string;
  orderAverage: number;
  margin: number;
  averageTitle: string;
}

export const _DailyOrderNewCustomerHeader = ({
  title,
  margin,
  orderAverage,
  averageTitle,
}: _DailyOrderNewCustomerHeaderPropTypes) => {
  return (
    <section className="flex place-items-start justify-between ">
      <div className="flex flex-col ">
        <Text size="body-md-lg" variant="grey">
          {title}
        </Text>
        <section className="flex gap-1 place-items-baseline">
          <Text size="body-lg-lg" variant="lynch-900">
            {orderAverage}
          </Text>
          <Text size="body-sm-default" variant="grey-300">
            {averageTitle}
          </Text>
        </section>
      </div>
      <div className="flex place-items-center ">
        <Icon
          icon={margin > 0 ? "stash:caret-up" : "icon-park-outline:down-one"}
          color={margin > 0 ? "#59D20D" : "#FF4D4D"}
        />
        <Text size="body-xs-rare" variant={margin > 0 ? "lime-green" : "red"}>
          {margin > 0 ? "+" : ""}
          {margin}%
        </Text>
      </div>
    </section>
  );
};
