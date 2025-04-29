import { HeaderOptions, Text, TitleBreadCrumb } from '@/components/shared';
import ConfirmVerification from '@/components/shared/ConfirmVerification';
import DeleteDialog from '@/components/shared/DeleteDialog';
import RejectDialog from '@/components/shared/RejectDialog';
import { FrontendRoutes } from '@/constants';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const DeliveryPersonRequest = () => {
  const breadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Delivery Management',
      path: '#',
    },
    {
      label: 'Delivery Person Request',
      path: '',
    },
  ];

  const navigate = [
    {
      id: 'add-attribute',
      title: 'All',
      icon: 'streamline:arrow-crossover-right',
      path: FrontendRoutes.DELIVERY_PERSON_REQUEST_ALL,
    },
    {
      id: 'add-attributes',
      title: 'Pending',
      icon: 'tdesign:user-time',
      path: FrontendRoutes.DELIVERY_PERSON_REQUEST_PENDING,
    },
    {
      id: 'add-attributess',
      title: 'Approved',
      icon: 'charm:circle-tick',
      path: FrontendRoutes.DELIVERY_PERSON_REQUEST_APPROVED,
    },
    {
      id: 'add-attributesss',
      title: 'Rejected',
      icon: 'radix-icons:cross-circled',
      path: FrontendRoutes.DELIVERY_PERSON_REQUEST_REJECTED,
    },
  ];

  const url = useLocation();

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        title="Delivery Person Requests "
        breadcrumbData={breadcrumbData}
      />

      <section className="  place-self-end  ">
        <HeaderOptions
          filterOptions={[]}
          filterTitle="Sort By"
          showSecondButton={false}
        />
      </section>

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
          {/* <ConfirmVerification confirmAction={true}  />
          <DeleteDialog confirmAction={true}   />  
          <RejectDialog  rejectAction={true} /> */}

        <Outlet />
      </section>
    </div>
  );
};
