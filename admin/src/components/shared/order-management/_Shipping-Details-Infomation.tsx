import { Text } from "../Text";

export const _ShippingDetailInformation = ({
  label,
  value,
  isLandmark = false,
}: {
  label: string;
  value: string;
  isLandmark?: boolean;
}) => (
  <section
    className={`flex place-items-center gap-2  ${
      isLandmark ? "text-grey-400 size-body-xs-default -mt-2" : ""
    }`}
  >
    <Text
      variant="grey-600"
      size={isLandmark ? "body-xs-default" : "body-sm-lg"}
    >
      {label}:
    </Text>
    <Text
      variant={isLandmark ? "grey-400" : "grey-600"}
      size={isLandmark ? "body-xs-default" : "body-sm-lg"}
    >
      {value}
    </Text>
  </section>
);
