import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface breadcrumbPropTypes {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: breadcrumbPropTypes) => {
  return (
    <div className="text-sm">
      <ul className="flex items-center gap-2 text-black-300">
        <Icon icon="proicons:home" />
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.path ? (
              <Link to={item.path}>
                <span
                  className={`text-sm  font-normal ${
                    index === items.length - 1
                      ? "text-dark-green"
                      : "text-silver-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ) : (
              <span
                className={`text-sm  font-normal ${
                  index < items.length - 1
                    ? "text-silver-500"
                    : "text-dark-green"
                }`}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <Icon icon="eva:arrow-ios-forward-outline" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
