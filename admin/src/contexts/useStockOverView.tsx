import { IProduct } from '@/(___types)';
import { TableData } from '@/components/shared/Table';
import { useProducts } from '@/server-action/api/product';
import { createContext, useContext, useEffect, useState } from 'react';

export interface PaginationDetails {
  currentPage: number;
  limit: number;
  totalCount?: number;
}
interface StockOverviewContextProps {
  originalStockOverViewData?: IProduct[];
  stockOverview?: IProduct[];
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  setPaginationDetails: React.Dispatch<React.SetStateAction<PaginationDetails>>;
  paginationDetails: PaginationDetails;
  setStockOverview: React.Dispatch<React.SetStateAction<IProduct[]>>;
  pageDetails: PaginationDetails;
  isLoading: boolean;
  singleStockPreview: IProduct | null;
  setSingleStockPreview: React.Dispatch<React.SetStateAction<IProduct | null>>;
  columns: {
    key: string;
    header: string;
    width?: string;
    render?: (value: any, row: TableData) => React.ReactNode;
  }[];
}

export interface PaginationDetails {
  currentPage: number;
  limit: number;
  totalCount?: number;
}

const stockOverviewContext = createContext<StockOverviewContextProps | null>(
  null
);

export const StockOverviewProvier = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState<PaginationDetails>(
    {
      currentPage: 1,
      limit: 10,
    }
  );

  const [stockOverview, setStockOverview] = useState([] as IProduct[]);
  const [singleStockPreview, setSingleStockPreview] = useState<IProduct | null>(
    null
  );

  const {
    data: stockOverviewData,
    isPending,
    isLoading,
  } = useProducts(paginationDetails.currentPage, paginationDetails.limit);

  const pageDetails = {
    currentPage: paginationDetails.currentPage,
    limit: paginationDetails.limit,
    totalCount: stockOverviewData?.getAllProducts.totalCount as number,
  };

  useEffect(() => {
    if (
      stockOverviewData &&
      stockOverviewData.getAllProducts.products.length > 0
    ) {
      setStockOverview(stockOverviewData.getAllProducts.products);
    }
  }, [stockOverview, stockOverviewData]);

  const columns = [
    {
      key: 'orderid',
      header: 'Product',
      width: '90px',
      render: (_: any, stock: any) => (
        <div className="flex place-items-center gap-2">
          <img
            src={`https://api-bhansa.webstudiomatrix.com/${stock?.images?.[0]}`}
            className="w-8 h-8 rounded-md"
            alt="Product"
          />
          <section className="flex flex-col">
            <span className="text-fade-black text-base">
              {stock?.name?.slice(0, 10)}
            </span>
            <span className="text-fade-black text-base">
              {stock.attributes[0]?.value &&
                stock.attributes[1]?.unit &&
                `${stock.attributes[0].value} ${stock.attributes[1].unit}`}
            </span>
          </section>
        </div>
      ),
    },
    {
      key: 'orderdate',
      header: 'Supplier',
      render: (_: any, supplier: any) => (
        <span>{supplier?.supplier?.name}</span>
      ),
    },
    {
      key: 'totalamount',
      header: 'Qty',
      width: '90px',
      render: (_: any, stock: any) => (
        <span>{stock?.inventoryDetails?.totalStock}</span>
      ),
    },
    {
      key: 'totalamount',
      header: 'Reorder Point',
      width: '90px',
      render: (_: any, stock: any) => (
        <span>{stock?.inventoryDetails?.reorderPoint}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '90px',
      render: (_: any, data: any) => {
        const reorderPoint = data?.inventoryDetails?.reorderPoint;
        const usedStock = data?.inventoryDetails?.usedStock;
        const status = reorderPoint - usedStock;
        return (
          <span
            className={`px-2 rounded-lg py-1 text-center ${
              status > 0
                ? 'bg-fade-green text-parrot'
                : status === 0
                  ? 'bg-purple-200 text-grey-400'
                  : 'bg-fade-orange text-yellow'
            }`}
          >
            {status > 0 ? 'In Stock' : status < 0 ? 'Out of Stock' : 'On Order'}
          </span>
        );
      },
    },
  ];

  return (
    <stockOverviewContext.Provider
      value={{
        originalStockOverViewData: stockOverviewData?.getAllProducts.products,
        pageDetails,
        showFilter,
        setShowFilter,
        stockOverview,
        singleStockPreview,
        setSingleStockPreview,
        isPending,
        isLoading,
        setStockOverview,
        setPaginationDetails,
        paginationDetails,
        columns,
      }}
    >
      {children}
    </stockOverviewContext.Provider>
  );
};

export const useStockOverview = () => {
  const context = useContext(stockOverviewContext);
  if (!context) {
    throw new Error(
      'useStockOverview must be used within a StockOverviewProvider'
    );
  }
  return context;
};
