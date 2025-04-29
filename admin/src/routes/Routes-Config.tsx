import { FrontendRoutes } from '../constants';
import {
  AddProductPage,
  AttributeBrandsPage,
  AttributeDiscountPage,
  AttributeGeneralPage,
  AttributeListPage,
  AttributeVoucherPage,
  CancelledOrderpage,
  CategoryListPage,
  DashboardPage,
  CustomerListPage,
  CustomerViewPage,
  AssignDeliveryPersonPage,
  NewOrdersPage,
  NotFoundPage,
  OrderCompletedPage,
  OrderListPage,
  OrderTrackingPage,
  OrderVerifyPage,
  ProductDetailPage,
  ProductListPage,
  TransactionPage,
  LoginPage,
  DeliveryPersonListPage,
  StockOverviewPage,
  ProductWisePage,
  SuppliersPage,
  SalesReportPage,
  CategoryWisePage,
  BrandWisePage,
  DeliveryPersonRequestPage,
  AllDeliveryPersonRequestPage,
  PendingDeliveryRequestPage,
  ApprovedDeliveryPersonRequestPage,
  RejectedDeliveryPersonRequestPage,
  StockReportPage,
} from '../pages';
import SupplierDetailsPage from '../pages/inventory-management/[supplier_id]/SupplierDetails';
import PurchaseDetailsPage from '../pages/inventory-management/[purchase_id]/PurchaseDetailsPage';
import { LoyaltyPage } from '../pages/reward-program/Loyalty';
import { PointConfigurationPage } from '../pages/reward-program/PointConfiguration';
import { ReferalManagementPage } from '../pages/reward-program/ReferalManagement';
import { TransactionVerifyPage } from '../pages/transaction/TransactionVerifyPage';
import ExpensesPage from '@/pages/finance-expenses/ExpensesPage';
import Cashflow from '@/pages/finance-expenses/Cashflow';
import Profitloss from '@/pages/finance-expenses/Profitloss';
import { SettleDeliveryPage } from '@/pages/delivery-management/SettleDelivery';
import { ConfigDeliveryPage } from '@/pages/delivery-management/ConfigDelivery';
import { OrderReportPage } from '@/pages/reports/order-report/OrderReport';
import { DelieveryReportPage } from '@/pages/reports/delivery-report/DelieveryReport';
import DeliveryFeePage from '@/pages/delivery-management/(delivery-configure)/DeliveryFee';
import MinimumPage from '@/pages/delivery-management/(delivery-configure)/Minimum';
import FreePage from '@/pages/delivery-management/(delivery-configure)/Free';
import LiveOverviewPage from '@/pages/delivery-management/LiveOverview';
import PurchaseRewardPage from '@/pages/reward-program/PurchaseReward';
import RewardReferalPage from '@/pages/reward-program/RewardReferal';
import { BannerPage } from '@/pages/banner/Banner';
import TopBannerPage from '@/pages/banner/TopBanner';
import BottomBannerPage from '@/pages/banner/BottomBanner';
import { PurchasesPage } from '@/pages/inventory-management/Purchase';

export const routesConfig = [
  {
    path: FrontendRoutes.HOME,
    element: <DashboardPage />,
  },
  {
    //*********Add the path in frontend-routes file if required  *********//
    path: FrontendRoutes.NEWORDERS,
    //******<Route path={path}/> */

    //*********Required page*********//
    element: <NewOrdersPage />,
    //******<Route element={element}/> *****/
  },
  {
    path: FrontendRoutes.ORDERLIST,
    element: <OrderListPage />,
  },
  {
    path: FrontendRoutes.COMPLETEDORDERS,
    element: <OrderCompletedPage />,
  },
  {
    path: FrontendRoutes.CANCELLEDORDERS,
    element: <CancelledOrderpage />,
  },
  {
    path: `${FrontendRoutes.ORDERVERIFY}/:order_id`,
    element: <OrderVerifyPage />,
  },
  {
    path: `${FrontendRoutes.ORDERTRACKING}/:order_id`,
    element: <OrderTrackingPage />,
  },
  {
    path: FrontendRoutes.PRODUCTLIST,
    element: <ProductListPage />,
  },
  {
    path: `${FrontendRoutes.ADDPRODUCT}/:product_id?`,
    element: <AddProductPage />,
  },
  {
    path: `${FrontendRoutes.VIEWPRODUCT}/:product_id`,
    element: <ProductDetailPage />,
  },
  {
    path: FrontendRoutes.CATEGORYLIST,
    element: <CategoryListPage />,
  },
  {
    path: FrontendRoutes.ASSIGN_DELIVERY_PERSON,
    element: <AssignDeliveryPersonPage />,
  },
  {
    path: FrontendRoutes.DELIVERY_PERSON_LIST,
    element: <DeliveryPersonListPage />,
  },
  {
    path: FrontendRoutes.DELIVERY_LIVE_OVERVIEW,
    element: <LiveOverviewPage />,
  },
  {
    path: FrontendRoutes.ATTRIBUTE,
    element: <AttributeListPage />,
    children: [
      {
        path: FrontendRoutes.ATTRIBTUE_BRAND,
        element: <AttributeBrandsPage />,
      },
      {
        path: FrontendRoutes.ATTRIBTUE_VOUCHER,
        element: <AttributeVoucherPage />,
      },
      {
        path: FrontendRoutes.ATTRIBTUE_DISCOUNT,
        element: <AttributeDiscountPage />,
      },
    ],
  },
  {
    path: FrontendRoutes.DELIVERY_PERSON_REQUEST,
    element: <DeliveryPersonRequestPage />,
    children: [
      {
        path: FrontendRoutes.DELIVERY_PERSON_REQUEST_ALL,
        element: <AllDeliveryPersonRequestPage />,
      },
      {
        path: FrontendRoutes.DELIVERY_PERSON_REQUEST_PENDING,
        element: <PendingDeliveryRequestPage />,
      },
      {
        path: FrontendRoutes.DELIVERY_PERSON_REQUEST_APPROVED,
        element: <ApprovedDeliveryPersonRequestPage />,
      },
      {
        path: FrontendRoutes.DELIVERY_PERSON_REQUEST_REJECTED,
        element: <RejectedDeliveryPersonRequestPage />,
      },
    ],
  },
  {
    path: FrontendRoutes.CUSTOMER,
    element: <CustomerListPage />,
  },
  {
    path: `${FrontendRoutes.VIEWCUSTOMER}/:customer_id`,
    element: <CustomerViewPage />,
  },
  {
    path: FrontendRoutes.ALLTRANSACTION,
    element: <TransactionPage />,
  },
  {
    path: FrontendRoutes.VERIFY_TRANSACTION,
    element: <TransactionVerifyPage />,
  },
  {
    path: FrontendRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: FrontendRoutes.REFERALMANAGEMENT,
    element: <ReferalManagementPage />,
  },
  {
    path: FrontendRoutes.LOYALTYPOINTS,
    element: <LoyaltyPage />,
  },
  {
    path: FrontendRoutes.POINTSCONFIGURATION,
    element: <PointConfigurationPage />,
    children: [
      {
        path: FrontendRoutes.PURCHASEREWARD,
        element: <PurchaseRewardPage />,
      },
      {
        path: FrontendRoutes.REWARDREFERAL,
        element: <RewardReferalPage />,
      },
    ],
  },
  {
    path: FrontendRoutes.STOCK_OVERVIEW,
    element: <StockOverviewPage />,
  },
  {
    path: FrontendRoutes.SUPPLIER,
    element: <SuppliersPage />,
  },
  {
    path: `${FrontendRoutes.SUPPLIER_DETAILS}/:supplier_id`,
    element: <SupplierDetailsPage />,
  },
  {
    path: `${FrontendRoutes.PURCHASE}`,
    element: <PurchasesPage />,
  },
  {
    path: `${FrontendRoutes.PURCHASEDETAILS}/:purchase_id`,
    element: <PurchaseDetailsPage />,
  },

  {
    path: FrontendRoutes.EXPENSES,
    element: <ExpensesPage />,
  },
  {
    path: FrontendRoutes.CASHFLOW,
    element: <Cashflow />,
  },
  {
    path: FrontendRoutes.PROFITLOSS,
    element: <Profitloss />,
  },
  {
    path: FrontendRoutes.DELIVERYSETTLEMENT,
    element: <SettleDeliveryPage />,
  },
  {
    path: FrontendRoutes.SALESREPORT,
    element: <SalesReportPage />,
    children: [
      {
        path: FrontendRoutes.SALES_PRODUCT_REPORT,
        element: <ProductWisePage />,
      },
      {
        path: FrontendRoutes.SALES_CATEOGORY_REPORT,
        element: <CategoryWisePage />,
      },
      {
        path: FrontendRoutes.SALES_BRAND_REPORT,
        element: <BrandWisePage />,
      },
    ],
  },
  {
    path: FrontendRoutes.DELIVERYREPORT,
    element: <DelieveryReportPage />,
  },
  {
    path: FrontendRoutes.ORDERREPORT,
    element: <OrderReportPage />,
  },
  {
    path: FrontendRoutes.STOCKREPORT,
    element: <StockReportPage />,
  },

  {
    path: FrontendRoutes.DELIVERYCONFIGURATION,
    element: <ConfigDeliveryPage />,
    children: [
      {
        path: FrontendRoutes.DELIVERY_Fee,
        element: <DeliveryFeePage />,
      },
      {
        path: FrontendRoutes.DELIVERY_MINIMUM,
        element: <MinimumPage />,
      },
      {
        path: FrontendRoutes.DELIVERY_Free,
        element: <FreePage />,
      },
    ],
  },
  {
    path: FrontendRoutes.BANNER,
    element: <BannerPage />,
    children: [
      {
        path: FrontendRoutes.TOPBANNER,
        element: <TopBannerPage />,
      },
      {
        path: FrontendRoutes.BOTTOMBANNER,
        element: <BottomBannerPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
];
