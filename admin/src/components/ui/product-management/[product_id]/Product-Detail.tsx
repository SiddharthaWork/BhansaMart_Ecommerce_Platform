import { Icon } from '@iconify/react/dist/iconify.js';
import { FrontendRoutes } from '../../../../constants';
import { Breadcrumb, ProductDetailsLoader, Text } from '../../../shared';
import { IProduct } from '@/(___types)';
import React from 'react';
import { _PreviewImage } from './_Preview-Image';

const breadcrumbData = [
  {
    label: 'Dashboard',
    path: FrontendRoutes.HOME,
  },
  {
    label: 'Product Management',
    path: '#',
  },
  {
    label: 'Product List',
    path: FrontendRoutes.ORDERLIST,
  },
  {
    label: 'Product Details',
    path: FrontendRoutes.ORDERLIST,
  },
];

interface productListPropTypes {
  product?: IProduct;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const ProductDetail = React.memo(
  ({ product, isLoading, isFetching }: productListPropTypes) => {
    return (
      <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
        <section
          className="flex place-items-center justify-between pt-6 "
          id="header-title-breadcrumb"
        >
          <Text size="heading-lg-rare" variant="fade-black">
            Product Detail
          </Text>
          <Breadcrumb items={breadcrumbData}></Breadcrumb>
        </section>

        {isLoading || isFetching ? (
          <ProductDetailsLoader />
        ) : (
          <section className="flex gap-6">
            <div className="flex flex-col gap-6 w-[30%]">
              <_PreviewImage product={product} />

              <section className="flex flex-col p-6 gap-3 border shadow-sm border-grey-100 rounded-lg bg-white">
                <Text size="body-sm-default" variant="grey-300">
                  Performance Metric
                </Text>

                <div className="flex flex-col gap-4 ">
                  <section className="flex place-items-center justify-between px-8">
                    <div className="flex flex-col gap-1">
                      <Text size="body-sm-default" variant="grey-600">
                        Views
                      </Text>
                      <Text size="body-base-lg" variant="grey-600">
                        500
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text size="body-sm-default" variant="grey-600">
                        Orders
                      </Text>
                      <Text size="body-base-lg" variant="grey-600">
                        120
                      </Text>
                    </div>
                  </section>

                  <section className="flex place-items-center justify-between ">
                    <div className="flex flex-col gap-1 text-center">
                      <Text size="body-sm-default" variant="grey-600">
                        Conversion Rate
                      </Text>
                      <Text size="body-base-lg" variant="grey-600">
                        24%
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1 text-center">
                      <Text size="body-sm-default" variant="grey-600">
                        Return & Refund
                      </Text>
                      <Text size="body-base-lg" variant="grey-600">
                        24%
                      </Text>
                    </div>
                  </section>
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-6 w-[70%]">
              <section className="flex flex-col gap-4 p-6 rounded-lg border border-grey-100 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-grey-200 pb-6">
                  <section className="flex flex-col">
                    <div className="flex place-items-center justify-between">
                      <section className="flex place-items-center gap-3">
                        <Text size="body-lg-lg" variant="fade-black" capitalize>
                          {product?.name}
                        </Text>
                        <div className="flex place-items-center gap-2">
                          {product?.badges?.map((item, index) => (
                            <section
                              className="bg-yellow rounded-3xl py-1 px-3"
                              key={index}
                            >
                              <Text
                                capitalize
                                variant="white"
                                size="body-xs-default"
                              >
                                {item}
                              </Text>
                            </section>
                          ))}
                        </div>
                      </section>
                      <Icon
                        icon="material-symbols:timer-outline"
                        color="#E7A604"
                        fontSize={18}
                      />
                    </div>
                    <Text size="body-sm-default" variant="lynch-400">
                      ID: {product?.sku}
                    </Text>
                  </section>
                  <Text size="body-base-default" variant="grey-600">
                    {product?.description}
                  </Text>
                  <section className="flex place-items-center gap-4">
                    {product?.tags?.map((tag, index) => (
                      <div
                        className="bg-lynch-400 py-1 px-3 rounded"
                        key={index}
                      >
                        <Text variant="white" size="body-sm-mid" capitalize>
                          {tag}
                        </Text>
                      </div>
                    ))}
                  </section>

                  <section className="grid grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Product Cateogry
                      </Text>
                      <Text variant="grey-600" size="body-base-lg">
                        {product?.category?.name}
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Product Sub-Cateogry
                      </Text>
                      <Text variant="grey-600" size="body-base-lg">
                        {product?.subCategory?.name}
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Brand
                      </Text>
                      <Text variant="grey-600" size="body-base-lg">
                        Amul
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Return
                      </Text>
                      <Text variant="grey-600" size="body-base-lg">
                        14 days
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Warrenty
                      </Text>
                      <Text variant="grey-600" size="body-base-lg">
                        Not Available
                      </Text>
                    </div>
                  </section>
                </div>

                <div className="flex flex-col gap-6 pb-6 border-b border-grey-200">
                  <section className="flex flex-col gap-2">
                    <Text variant="grey-600" size="body-sm-default">
                      Variation Sizes
                    </Text>

                    <div className="flex place-items-center gap-4 pl-2">
                      {product?.attributes?.map((item, index) => (
                        <section
                          className="text-center bg-lynch-300 py-1 px-3 rounded-3xl"
                          key={index}
                        >
                          <Text size="body-sm-default" variant="grey-600">
                            {item?.value} {item?.unit}
                          </Text>
                        </section>
                      ))}
                    </div>
                  </section>

                  <section className="flex place-items-center justify-between w-[75%]">
                    {/* <div className="flex flex-col gap-1">
                  <Text variant="grey-600" size="body-sm-default">
                    Supplier Name
                  </Text>
                  <Text variant="fade-black" size="body-base-lg">
                    {product?.supplier?.name}
                  </Text>
                </div> */}

                    {/* <div className="flex flex-col gap-1">
                  <Text variant="grey-600" size="body-sm-default">
                    Stock Quantity
                  </Text>
                  <Text variant="fade-black" size="body-base-lg">
                    {product?.inventoryDetails?.totalStock}
                  </Text>
                </div> */}

                    <div className="flex flex-col gap-1">
                      <Text variant="grey-600" size="body-sm-default">
                        Shell Life
                      </Text>
                      <Text variant="fade-black" size="body-base-lg">
                        12 months
                      </Text>
                    </div>
                  </section>
                </div>

                <div className="flex gap-4 place-items-center pb-6">
                  <section className="flex flex-col">
                    <Text variant="fade-black" size="heading-lg-default">
                      Rs 80
                    </Text>
                    <span className="line-through text-grey-400 text-[20px]">
                      Rs {product?.sellingPrice}
                    </span>
                  </section>

                  <section className="bg-red py-2 px-3 rounded-sm">
                    <Text variant="white" size="body-xs-default">
                      20% Brand Discount
                    </Text>
                  </section>
                </div>
              </section>
            </div>
          </section>
        )}
      </div>
    );
  }
);
