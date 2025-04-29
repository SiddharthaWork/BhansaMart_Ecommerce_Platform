import { Breadcrumb } from "./Breadcrumb";
import { Text } from "./Text";

interface titleBreadCrumbPropTypes {
  title: string;
  breadcrumbData?: { label: string; path: string }[];
}

export const TitleBreadCrumb = ({
  title,
  breadcrumbData,
}: titleBreadCrumbPropTypes) => {
  return (
    <section
      className="flex place-items-center justify-between pt-6 "
      id="header-title-breadcrumb"
    >
      <Text size="heading-lg-rare" variant="fade-black">
        {title}
      </Text>
      {breadcrumbData && <Breadcrumb items={breadcrumbData} />}
    </section>
  );
};
