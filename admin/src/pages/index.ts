export {
  CancelledOrderpage,
  NewOrdersPage,
  OrderCompletedPage,
  OrderListPage,
  OrderTrackingPage,
  OrderVerifyPage,
} from './order-management';

export { AttributeBrandsPage } from './atrribute/(attribute)/AttributeBrands';
export { AttributeDiscountPage } from './atrribute/(attribute)/AttributeDiscounts';
export { AttributeGeneralPage } from './atrribute/(attribute)/AttributeGeneral';
export { AttributeVoucherPage } from './atrribute/(attribute)/AttributeVoucher';
export { AttributeListPage } from './atrribute/AttributeList';

export { DashboardPage } from './dashboard/Dashboard';
export { CustomerListPage } from './customer-management/CustomerList';
export { CustomerViewPage } from './customer-management/[customer_id]/CustomerView';
export { AssignDeliveryPersonPage } from './delivery-management/AssignDeliveryPerson';
export { NotFoundPage } from './NotFound';
export { ProductDetailPage } from './product-management/[product_id]/ProductDetail';
export { AddProductPage } from './product-management/AddProduct';
export { CategoryListPage } from './product-management/CateogryList';
export { ProductListPage } from './product-management/ProductList';

export { TransactionPage } from './transaction/TransactionPage';

export { LoginPage } from './login/Login';

export { DeliveryPersonListPage } from './delivery-management/DeliveryPersonlist';
export { AllDeliveryPersonRequestPage } from './delivery-management/(delivery-person-request)/AllDeliveryPersonRequest';
export { ApprovedDeliveryPersonRequestPage } from './delivery-management/(delivery-person-request)/ApprovedDeliveryPersonRequest';
export { PendingDeliveryRequestPage } from './delivery-management/(delivery-person-request)/PendingDeliveryRequest';
export { RejectedDeliveryPersonRequestPage } from './delivery-management/(delivery-person-request)/RejectedDeliveryPersonRequest';

export { StockOverviewPage } from './inventory-management/StockOverview';
export { SuppliersPage } from './inventory-management/Suppliers';

export { SalesReportPage } from './reports/SalesReport';
export { ProductWisePage } from './reports/sales-report/ProductWise';
export { CategoryWisePage } from './reports/sales-report/CategoryWise';
export { BrandWisePage } from './reports/sales-report/BrandWise';
export { StockReportPage } from './reports/stock-report/StockReport';

export { ConfigDeliveryPage } from './delivery-management/ConfigDelivery';
export { DeliveryPersonRequestPage } from './delivery-management/DeliveryPersonRequests';
export { SettleDeliveryPage } from './delivery-management/SettleDelivery';
