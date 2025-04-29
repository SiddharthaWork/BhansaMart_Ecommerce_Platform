import { DropdownField, Text, TitleBreadCrumb } from '@/components/shared';
import { FrontendRoutes } from '@/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, Outlet, useLocation } from 'react-router-dom';

const salesReportBreadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },

  {
    label: 'Finance',
    path: FrontendRoutes.ORDERLIST,
  },
];

const navigate = [
  {
    id: 'add-attribute',
    title: 'Product Wise',
    icon: 'fluent-mdl2:product-variant',
    path: FrontendRoutes.SALES_PRODUCT_REPORT,
  },
  {
    id: 'add-attributes',
    title: 'Category-Wise',
    icon: 'ant-design:product-outlined',
    path: FrontendRoutes.SALES_CATEOGORY_REPORT,
  },
  {
    id: 'add-attributess',
    title: 'Brand-Wise',
    icon: 'solar:archive-up-linear',
    path: FrontendRoutes.SALES_BRAND_REPORT,
  },
];

export const SalesReports = () => {
  const url = useLocation();
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6">
      <TitleBreadCrumb
        title="Sales Tracking"
        breadcrumbData={salesReportBreadcrumbData}
      />

      {/* <section className="flex justify-end ">
        <DropdownField
          label=""
          className="border border-grey-200 p-[10px] rounded outline-none"
        />
      </section> */}

      <section>
        <div className="flex place-items-center gap-6 border border-grey-cadet-blue bg-white  ">
          {navigate.map((nav) => (
            <Link
              key={nav.id}
              className={`flex place-items-center gap-1 cursor-pointer py-5 px-3  ${
                nav.path === url.pathname && 'border-b border-primary-blue'
              }`}
              to={nav.path}
            >
              <Icon
                icon={nav.icon}
                color={`${nav.path === url.pathname ? '#2275FC' : '#454545'}`}
              />
              <Text
                size="body-sm-lg"
                variant={`${
                  nav.path === url.pathname ? 'primary-blue' : 'grey-600'
                }`}
              >
                {nav.title}
              </Text>
            </Link>
          ))}
        </div>

        <Outlet />
      </section>
    </div>
  );
};
