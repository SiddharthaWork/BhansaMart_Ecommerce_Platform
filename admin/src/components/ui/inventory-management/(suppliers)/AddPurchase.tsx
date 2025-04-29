import { Icon } from '@iconify/react/dist/iconify.js';
import { DropdownField, InputField, Loader, Text } from '../../../shared';
import { FieldApi, useForm } from '@tanstack/react-form';

import { useProductForPurchaseHistory } from '@/server-action/api/product';
import { useEffect, useState } from 'react';
import { useGetSupplier } from '@/server-action/api/supplier';
import {
  useCreatePurchase,
  useUpdatePurchase,
} from '@/server-action/api/purchase';
import { IPurchase } from '@/(___types)/_type-purchase';
import { IProduct } from '@/(___types)';

const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  return field.state.meta.errors.length > 0 ? (
    <div className="min-h-[20px]">
      <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
    </div>
  ) : null;
};

interface EditDataProps {
  editData?: IPurchase;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPurchase = ({ editData, setIsOpen }: EditDataProps) => {
  const [refresh, setRefresh] = useState(false);

  // Fetch Products & Suppliers
  const { data: productData } = useProductForPurchaseHistory(1, 100);
  const { data: supplierData } = useGetSupplier();
  const { mutateAsync: createPurchase, isPending: createPending } =
    useCreatePurchase();
  const { mutateAsync: updatePurchase } = useUpdatePurchase();

  // Prepare Select Options
  const supplierOptions =
    supplierData?.getAllSuppliers?.map((sup) => ({
      value: sup?._id,
      label: sup?.name,
    })) || [];

  const nameOptions =
    productData?.getAllProducts?.products?.map((elem) => ({
      value: elem?._id,
      label: elem?.name,
    })) || [];

  // Initial Values for Form
  const initValue = {
    products: editData?.products ?? [
      {
        quantity: 0,
        expiryDate: '',
        price: 0,
        paidAmount: 0,
        attributes: [],
        product: '',
      },
    ],
    billNo: editData?.billNo ?? '',
    supplier: editData?.supplier?._id ?? '',
  };

  // Form Handler
  const form = useForm({
    defaultValues: initValue,
    onSubmit: async ({ value }) => {
      const data = {
        supplier: value.supplier,
        products: value.products,
      };

      // if (editData) {
      //   const res = await updatePurchase({
      //     purchaseData: data,
      //     id: editData._id,
      //   });
      //   if (res?.data?.success) setIsOpen?.(false);
      // } else {
      //   const res = await createPurchase(data);
      //   if (res?.data?.success) setIsOpen?.(false);
      // }
    },
  });

  useEffect(() => {
    form.reset();
  }, [editData]);

  // Add New Product Entry
  const handleAddProduct = () => {
    form.setFieldValue('products', [
      ...form.state.values.products,
      {
        quantity: 0,
        expiryDate: '',
        price: 0,
        paidAmount: 0,
        attributes: [],
        product: '',
      },
    ]);
    setRefresh((prev) => !prev);
  };

  // Remove Product Entry
  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...form.state.values.products];

    if (
      !updatedProducts[index] ||
      typeof updatedProducts[index].product !== 'string'
    ) {
      console.error('Invalid product type detected:', updatedProducts[index]);
      return;
    }

    updatedProducts.splice(index, 1);
    form.setFieldValue('products', updatedProducts);
    setRefresh((prev) => !prev);
  };

  if (createPending) {
    return <Loader titleName="Creating Purchase" />;
  }

  return (
    <div className="w-full h-full">
      {/* Header Section */}
      <section className="flex flex-row items-center gap-8 p-4 border-b-2">
        <Icon
          icon="tabler:arrow-left"
          width="24"
          height="24"
          onClick={() => setIsOpen?.(false)}
        />
        <h1 className="text-2xl">{editData ? 'Edit' : 'Add'} Purchase</h1>
      </section>

      {/* Purchase Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full h-full flex flex-col gap-6 py-4 px-6"
      >
        <section className="flex flex-col gap-2 w-full h-fit">
          <Text size="body-md-lg" variant="fade-black">
            Purchase Details
          </Text>

          <div className="flex place-items-center gap-6 mt-4">
            {/* Bill Number Field */}
            <section className="flex-1">
              <form.Field name="billNo">
                {(field) => (
                  <section>
                    <InputField
                      label="Bill No."
                      placeholder="Enter bill number"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>

            {/* Supplier Dropdown */}
            <section className="flex-1">
              <form.Field name="supplier">
                {(field) => (
                  <section>
                    <DropdownField
                      label="Supplier"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      options={supplierOptions}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          {/* Products Section */}
          <form.Field name="products">
            {(field) => (
              <>
                {field.state.value.map((_, index) => (
                  <div key={index} className="border p-4 mt-4">
                    {/* Product Dropdown */}
                    <form.Field name={`products[${index}].product`}>
                      {(sub) => (
                        <section>
                          <DropdownField
                            label="Product"
                            name="product"
                            options={nameOptions}
                            value={sub.state.value as any}
                            onChange={(e) => {
                              sub.handleChange(e.target.value);
                              const product =
                                productData?.getAllProducts?.products?.find(
                                  (elem) => elem?._id === e.target.value
                                );
                              const attributes = product?.attributes || [];
                              form.setFieldValue(
                                `products[${index}].attributes`,
                                attributes.map((att) => ({
                                  attribute: `${att?.value} ${att?.unit} (${att?.name})`,
                                  price: 0,
                                  quantity: 0,
                                  paidAmount: 0,
                                  expiryDate: '',
                                }))
                              );
                              setRefresh((prev) => !prev);
                            }}
                          />
                          <FieldError field={sub} />
                        </section>
                      )}
                    </form.Field>

                    {Array.isArray(form?.state?.values?.products) &&
                    form?.state?.values?.products?.length ? (
                      <form.Field name={`products[${index}].attributes`}>
                        {(field) => (
                          <>
                            {field.state.value?.map((_, subIndex) => (
                              <div
                                key={index}
                                className="border border-grey-100 flex flex-col gap-2 p-4 mt-4"
                              >
                                <p className="mb-1">{`Variation -  ${index + 1}`}</p>

                                <form.Field
                                  name={`products[${index}].attributes[${subIndex}].attribute`}
                                >
                                  {(sub) => (
                                    <InputField
                                      label="Attribute-Name"
                                      value={sub.state.value}
                                      readOnly
                                    />
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`products[${index}].attributes[${subIndex}].price`}
                                >
                                  {(sub) => (
                                    <InputField
                                      label="Cost-Price"
                                      type="number"
                                      value={sub.state.value}
                                      onChange={(e) =>
                                        sub.handleChange(Number(e.target.value))
                                      }
                                    />
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`products[${index}].attributes[${subIndex}].paidAmount`}
                                >
                                  {(sub) => (
                                    <InputField
                                      label="Paid-Price"
                                      type="number"
                                      value={sub.state.value}
                                      onChange={(e) =>
                                        sub.handleChange(Number(e.target.value))
                                      }
                                    />
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`products[${index}].attributes[${subIndex}].quantity`}
                                >
                                  {(sub) => (
                                    <InputField
                                      label="Bought-Quantity"
                                      type="number"
                                      value={sub.state.value}
                                      onChange={(e) =>
                                        sub.handleChange(Number(e.target.value))
                                      }
                                    />
                                  )}
                                </form.Field>

                                <form.Field
                                  name={`products[${index}].attributes[${subIndex}].expiryDate`}
                                >
                                  {(sub) => (
                                    <InputField
                                      label="Expiry Date"
                                      type="date"
                                      value={sub.state.value as any}
                                      onChange={(e) =>
                                        sub.handleChange(e.target.value)
                                      }
                                    />
                                  )}
                                </form.Field>
                              </div>
                            ))}
                          </>
                        )}
                      </form.Field>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <form.Field name={`products[${index}].price`}>
                          {(field) => (
                            <section>
                              <InputField
                                label="Price"
                                type="number"
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(Number(e.target.value))
                                }
                                placeholder="Enter Price"
                              />
                              <FieldError field={field} />
                            </section>
                          )}
                        </form.Field>

                        <form.Field name={`products[${index}].paidAmount`}>
                          {(field) => (
                            <section>
                              <InputField
                                label="Paid Amount"
                                type="number"
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(Number(e.target.value))
                                }
                                placeholder="Enter Price"
                              />
                              <FieldError field={field} />
                            </section>
                          )}
                        </form.Field>
                        <form.Field name={`products[${index}].quantity`}>
                          {(field) => (
                            <section>
                              <InputField
                                label="Quantity"
                                type="number"
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(Number(e.target.value))
                                }
                                placeholder="Enter Quantity"
                              />
                              <FieldError field={field} />
                            </section>
                          )}
                        </form.Field>

                        <form.Field name={`products[${index}].expiryDate`}>
                          {(field) => (
                            <section>
                              <InputField
                                label="Expiry Date"
                                type="date"
                                value={field.state.value as any}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                              <FieldError field={field} />
                            </section>
                          )}
                        </form.Field>
                      </div>
                    )}

                    {/* Remove Product Button */}
                    <button
                      type="button"
                      className="mt-2 text-red-500"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove Product
                    </button>
                  </div>
                ))}

                {/* Add Product Button */}
                <button
                  type="button"
                  className="mt-4 text-blue-500"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </>
            )}
          </form.Field>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editData ? 'Update' : 'Create'} Purchase
        </button>
      </form>
    </div>
  );
};

export default AddPurchase;
