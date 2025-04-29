import { useParams } from 'react-router-dom';
import SuppliersDetails from '../../../components/ui/inventory-management/(suppliers)/[supplier_id]/SuppliersDetails';
import { useGetSupplierById } from '@/server-action/api/supplier';
import { ISupplier } from '@/(___types)/_type-supplier';

// interface _supplierDetailsPagePropTypes {}

const SupplierDetailsPage = () => {
  const { supplier_id } = useParams();
  console.log(supplier_id);
  const { data } = useGetSupplierById(supplier_id as string);
  return (
    <div>
      <SuppliersDetails data={data ?? ({} as unknown as ISupplier)} />
    </div>
  );
};

export default SupplierDetailsPage;
