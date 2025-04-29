import { Icon } from '@iconify/react/dist/iconify.js';
import { FrontendRoutes } from '../../../constants';
import { Text, TitleBreadCrumb } from '../../shared';
import { Link, Outlet, useLocation } from 'react-router-dom';

const breadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Attribute',
    path: '#',
  },
  {
    label: 'Attribute List',
    path: FrontendRoutes.ATTRIBUTE,
  },
];

const navigate = [
  {
    id: 'add-attributes',
    title: 'Brands',
    icon: 'solar:archive-up-linear',
    path: FrontendRoutes.ATTRIBTUE_BRAND,
  },
  {
    id: 'add-attributess',
    title: 'Discount',
    icon: 'mdi:discount-outline',
    path: FrontendRoutes.ATTRIBTUE_DISCOUNT,
  },
  {
    id: 'add-attributesss',
    title: 'Coupons',
    icon: 'mdi:voucher-outline',
    path: FrontendRoutes.ATTRIBTUE_VOUCHER,
  },
];

export const AttributeList = () => {
  const url = useLocation();

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb title="Attribute " breadcrumbData={breadcrumbData} />

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
