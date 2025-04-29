import { TitleBreadCrumb } from '../../shared/Title-Breadcrumb';
import { ProductManagementBasicSetup } from '../../../constants';
import { _ProfileCustomer, AccountDetails, Address } from './_ProfileCustomer';
import { _OrderTable } from './_OrderTable';
import { useParams } from 'react-router-dom';
import { useCustomerById } from '@/server-action/api/customer';
import { TableSkeletonLoader } from '@/components/shared';

export const CustomerList = () => {
  const { customer_id } = useParams();

  const {
    data: customerData,
    isLoading,
    error,
  } = useCustomerById(customer_id ?? '');

  if (isLoading) {
    return <TableSkeletonLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col pl-7 pr-8 text-red-500">
        Error loading customer data: {error.message}
      </div>
    );
  }

  if (!customerData) {
    return (
      <div className="flex flex-col pl-7 pr-8">No customer data found</div>
    );
  }

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={ProductManagementBasicSetup().productListbreadcrumbData}
        title="Add Customer"
      />
      <div className="flex md:flex-row flex-col w-full h-full gap-6">
        <div className="flex flex-row md:w-[30%] w-full h-full">
          <div className="flex flex-col md:gap-6 gap-4 w-full h-full">
            <_ProfileCustomer customerData={customerData} />
            <AccountDetails customerData={customerData} />
          </div>
        </div>

        <div className="flex flex-col md:w-[70%] w-full h-full md:gap-6 gap-4">
          <_OrderTable customerData={customerData} />
          <Address customerData={customerData} />
        </div>
      </div>
    </div>
  );
};
