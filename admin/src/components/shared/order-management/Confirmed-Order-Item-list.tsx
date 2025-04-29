import React from 'react';
import { Text } from '../Text';
import { OrderItemDetails } from '../../../(___types)';

interface confirmedOrderTypes {
  items?: OrderItemDetails[];
}

export const ConfirmedOrderItemList = React.memo(
  ({ items }: confirmedOrderTypes) => {
    return (
      <div className="flex flex-col shadow-sm  rounded-lg bg-white">
        <section className="flex place-items-center gap-2 border-b border-grey-100 py-5 px-6">
          <Text variant="fade-black" size="body-md-lg">
            Order Items
          </Text>
        </section>

        {items?.map((item, index) => (
          <section className="flex flex-col py-4 px-6 gap-3" key={index}>
            <div className="flex justify-between place-items-center">
              <section className="flex place-items-center gap-3">
                <img
                  src={`https://api-bhansa.webstudiomatrix.com/${item?.product?.images?.[0]}`}
                  alt="item"
                  className="w-16 h-16 rounded"
                />
                <div className="flex flex-col gap-1">
                  <Text variant="grey-400" size="body-sm-default">
                    {item?.product?.category?.name}
                  </Text>
                  <section className="flex flex-col ">
                    <Text variant="fade-black" size="body-md-lg">
                      {item?.product?.name}
                    </Text>

                    <div className="flex place-items-center gap-4">
                      <section className="flex place-items-center gap-1">
                        <Text variant="grey-400" size="body-sm-default">
                          Qty:
                        </Text>
                        <Text variant="grey-400" size="body-sm-default">
                          {item?.quantity} {item?.attributes}
                        </Text>
                      </section>

                      <section className="flex place-items-center gap-1">
                        <Text variant="grey-400" size="body-sm-default">
                          Size:
                        </Text>
                        <Text variant="grey-400" size="body-sm-default">
                          {item?.attributes}
                        </Text>
                      </section>
                    </div>
                  </section>
                </div>
              </section>

              <section>
                <Text size="body-md-default" variant="grey-600">
                  {item?.quantity} x Rs. {item?.product?.sellingPrice}
                </Text>
              </section>
            </div>
          </section>
        ))}
      </div>
    );
  }
);
