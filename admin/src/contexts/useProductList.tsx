import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import { useProducts } from '@/server-action/api/product';
import { IProduct } from '@/(___types)';
import { TableData } from '@/components/shared/Table';

export interface PaginationDetails {
    currentPage: number;
    limit: number;
    totalCount?: number;
}

export interface ProductContextProps {
    products?: IProduct[];
    originalProducts?:IProduct[]
    setNewProductData: React.Dispatch<React.SetStateAction<IProduct[]>>;
    pageDetails: PaginationDetails;
    setPaginationDetails: React.Dispatch<React.SetStateAction<PaginationDetails>>;
    isLoading?: boolean;
    isFetching?: boolean;
    isPending?: boolean;
    column?: {
        key: string;
        header: string;
        width?: string;
        render?: (value: any, row: TableData) => React.ReactNode;
    }[];
    showFilter?: boolean;
    setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>;
    // pageDetails: PaginationDetails;
}

const ProductContext = createContext<ProductContextProps | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [showFilter, setShowFilter] = useState(false);

    const[products, setNewProductData] = useState([] as IProduct[]);

    const [paginationDetails, setPaginationDetails] = useState<PaginationDetails>({
        currentPage: 1,
        limit: 10,
    });

    const { data: productData, isPending, isFetching } = useProducts(
        paginationDetails.currentPage,
        paginationDetails.limit
    );
    const pageDetails = {
        currentPage: paginationDetails.currentPage,
        limit: paginationDetails.limit,
        totalCount: productData?.getAllProducts.totalCount as number,
    };

    useEffect(() => {
        if (productData && productData.getAllProducts.products.length > 0) {
            setNewProductData(productData.getAllProducts.products);
        }
    }, [productData]);

    const column = [
        {
          key: 'product',
          header: 'Product',
          width: '150px',
          render: (_: any, products: any) => (
            <div className="flex place-items-center gap-2">
              <img
                src={`https://api-bhansa.webstudiomatrix.com/${products?.images?.[0]}`}
                className="w-8 h-8 rounded object-contain"
              />
              <section className="flex flex-col">
                <span className="text-fade-black text-sm ">
                  {products?.name?.slice(0, 10)}
                </span>
              </section>
            </div>
          ),
        },
        {
          key: 'category',
          header: 'Category',
          width: '90px',
          render: (_: any, products: any) => (
            <span>{products?.category?.name}</span>
          ),
        },
        {
          key: 'subCategory',
          header: 'Sub Category',
          width: '90px',
          render: (_: any, products: any) => (
            <span>{products?.subCategory?.name}</span>
          ),
        },
        {
          key: 'basePrice',
          header: 'Price',
          width: '90px',
          render: (_: any, products: any) => (
            <span>Rs. {products?.sellingPrice}</span>
          ),
        },
        {
          key: 'sold',
          header: 'Sold',
          width: '90px',
          render: (_: any, products: any) => (
            <span>{products?.inventoryDetails?.usedStock ?? 0}</span>
          ),
        },
        { key: 'rating', header: 'Rating', width: '90px' },
        {
          key: 'stock',
          header: 'Stock',
          width: '90px',
          render: (_: any, products: any) => (
            <span
              className={`p-1 ${
                products?.inventoryDetails?.totalStock > 0
                  ? 'bg-fade-green text-parrot rounded'
                  : 'bg-grey-extra rounded text-grey-400'
              }`}
            >
              {products?.inventoryDetails?.totalStock}{' '}
              {products?.inventoryDetails?.totalStock > 0 && 'in stock'}
            </span>
          ),
        },
      ];

      return (
        <ProductContext.Provider
          value={{
            // products: productData?.getAllProducts.products,
            // paginationDetails,
            originalProducts:productData?.getAllProducts?.products,
            products,
            setPaginationDetails,
            setNewProductData,
            isFetching,
            isPending,
            column,
            showFilter,
            setShowFilter,
            pageDetails
            // pageDetails
          }}
        >
          {children}
        </ProductContext.Provider>
      );
}

export const useProductListContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error('useProductList must be used within a ProductProvider');
    }
    return context;
};