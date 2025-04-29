import { Link } from "react-router-dom";
import { Text } from "../../shared";

interface _titleLinkOptionsProps {
  title: string;
  path: string;
  linkTitle: string;
}
export const _TitleLinkOptions = ({
  path,
  title,
  linkTitle,
}: _titleLinkOptionsProps) => {
  return (
    <div
      className="flex place-items-center justify-between "
      id="header-title-breadcrumb"
    >
      <Text size="body-md-lg" variant="grey">
        {title}
      </Text>

      <Link to={path} className="text-base text-primary-blue font-semibold">
        {linkTitle}
      </Link>
    </div>
  );
};
