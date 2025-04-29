import { _useSelectSubCategory } from '@/hooks/useSelectSubCategory';
import { FrontendRoutes } from '../../../constants';
import { useCategories } from '../../../server-action/api/category';
import {
  AreaField,
  Breadcrumb,
  DropdownField,
  InputField,
  Loader,
  Text,
  UploadPhotos,
} from '../../shared';
import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  useCreateProduct,
  useUpdateProduct,
} from '@/server-action/api/product';
import { useGetJustBrands } from '@/server-action/api/attribute';
import { IProduct } from '@/(___types)';
import type { FieldApi } from '@tanstack/react-form';
import { productSchema } from '@/(___types)/product/_type_product';

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
    label: 'Add Product',
    path: FrontendRoutes.ADDPRODUCT,
  },
];

const statusFields = [
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'notActive',
    label: 'Not Active',
  },
];

interface _addProductPropTypes {
  product?: IProduct;
}

// Update the FieldError component
const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  if (field.state.meta.errors.length > 0) {
    return (
      <div className="min-h-[20px]">
        {' '}
        {/* Add minimum height container */}
        <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
      </div>
    );
  }
  return <div className="min-h-[20px]" />; // Return empty div with same height to maintain spacing
};

export const AddProduct = ({ product }: _addProductPropTypes) => {
  let categoryOptions: { value: string; label: string }[] = [];
  const [subOptions, setSubOptions] = useState<
    { value: string; label: string }[]
  >([]);

  let sub: { value: string; label: string }[] = [];
  let supplier: { value: string; label: string }[] = [];
  let brandOptions: { value: string; label: string }[] = [];

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(product?.tags ?? []);
  }, [product]);

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      e.preventDefault();
      addTag();
    }

    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleBlur = () => {
    addTag();
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const visibleFields = [
    {
      id: 'featured',
      label: 'Featured',
    },
    {
      id: 'bestSellers',
      label: 'Best Sellers',
    },
    {
      id: 'newArrivals',
      label: 'New Arrivals',
    },
    {
      id: 'hotDeals',
      label: 'Hot Deals',
    },
  ];

  const unitFields = [
    {
      value: 'pcs',
      label: 'Piece',
    },
    {
      value: 'box',
      label: 'Box',
    },
    {
      value: 'dozen',
      label: 'Dozen',
    },
    {
      value: 'gm',
      label: 'Gm',
    },
    {
      value: 'kg',
      label: 'Kg',
    },
    {
      value: 'ltr',
      label: 'Litre',
    },
    {
      value: 'ml',
      label: 'ML',
    },
  ];

  const intitalFormData = {
    name: product?.name ?? '',
    description: product?.description ?? '',
    category: product?.category?._id ?? '',
    subCategory: product?.subCategory?._id ?? '',
    supplierName: product?.supplier?._id ?? '',
    brand: product?.brand?._id ?? '',
    attributeValue: product?.attributeValue ?? '',
    attributeUnit: product?.attributeUnit ?? '',
    sellingPrice: product?.sellingPrice.toString() ?? '',
    discountCategory: product?.discountCategory ?? '',
    attribute: product?.attributes ?? [],
    productSKU: product?.sku ?? '',
    stockQuantity: product?.inventoryDetails?.totalStock?.toString() ?? '',
    reorderLevel: product?.inventoryDetails?.reorderPoint?.toString() ?? '',
    status: product?.status ?? '',
    visibleAs: product?.badges?.[0] ?? ([] as string[]),
    productTags: product?.tags ?? [],
    photos: product?.images ?? ([] as File[]),
  };

  const { data } = useCategories();
  const { data: brandData } = useGetJustBrands();

  brandData?.brand?.map((bran) =>
    brandOptions.push({
      label: bran.name,
      value: bran._id,
    })
  );

  const { mutateAsync: createProduct, isPending: createPending } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: updatePending } =
    useUpdateProduct();

  const form = useForm({
    defaultValues: intitalFormData,
    validators: {
      onChange: productSchema as any,
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData();

      formData.append('name', value.name);
      formData.append('description', value.description);
      formData.append('sellingPrice', value.sellingPrice);
      formData.append('category', value.category);
      formData.append('subCategory', value.subCategory?.toString());
      formData.append('status', value.status);
      formData.append('isFeatured', false.toString());

      if (value.brand) formData.append('brand', value.brand);
      formData.append('attributeValue', value.attributeValue);
      formData.append('attributeUnit', value.attributeUnit.toString());

      // ✅ Handle `visibleAs` array (convert to JSON)

      formData.append(`badges[0]`, value.visibleAs as any);

      tags.forEach((item, index) => {
        formData.append(`tags[${index}]`, item);
      });

      // ✅ Handle images array (append each file)
      value.photos.forEach((file, index) => {
        formData.append(`images`, file);
      });

      // ✅ Handle inventory details (convert to JSON)
      if (value.attribute.length > 0) {
        value.attribute.forEach((variation, index) => {
          formData.append(`attributes[${index}][name]`, variation.name);
          formData.append(`attributes[${index}][unit]`, variation.unit ?? '');

          formData.append(`attributes[${index}][color]`, variation.color ?? '');
          formData.append(
            `attributes[${index}][value]`,
            variation.value.toString() ?? 0
          );
          formData.append(
            `attributes[${index}][price]`,
            variation?.price ?? '0'
          );
        });
        if (value.attribute.length > 0 && !product) {
          formData.append(
            `attributes[${value.attribute.length}][name]`,
            'normal'
          );
          formData.append(
            `attributes[${value.attribute.length}][unit]`,
            value.attributeUnit.toString() ?? ''
          );
          formData.append(
            `attributes[${value.attribute.length}][value]`,
            value.attributeValue ?? ''
          );
          formData.append(
            `attributes[${value.attribute.length}][price]`,
            value.sellingPrice
          );
        }
      }

      if (value.attribute.length === 0) {
        formData.append(`attributes[0][name]`, 'normal');
        formData.append(
          `attributes[0][unit]`,
          value.attributeUnit.toString() ?? ''
        );
        formData.append(`attributes[0][value]`, value.attributeValue ?? '');
        formData.append(`attributes[0][price]`, value.sellingPrice);
      }

      console.log(formData);

      if (product) {
        await updateProduct({
          id: product._id,
          productData: formData,
        });
      } else {
        await createProduct(formData);
      }
    },
  });

  data?.categories?.map((item) =>
    categoryOptions.push({
      value: item?._id,
      label: item?.name,
    })
  );

  useEffect(() => {
    if (product?.subCategory) {
      console.log(product);

      const sub = [
        {
          value: product?.subCategory._id,
          label: product?.subCategory.name,
        },
      ];

      setSubOptions(sub || []);
    }
  }, [product, data]);

  data?.getAllSuppliers?.map((item) =>
    supplier.push({
      value: item?._id,
      label: item?.name,
    })
  );

  return (
    <form
      className="flex flex-col pl-7 pr-8 gap-6"
      id="parent"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {(createPending || updatePending) && (
        <Loader
          titleName={updatePending ? 'Updating Product' : 'Creating Product'}
        />
      )}
      <section
        className="flex place-items-center justify-between pt-6 "
        id="header-title-breadcrumb"
      >
        <Text size="heading-lg-rare" variant="fade-black">
          Add Product
        </Text>
        <Breadcrumb items={breadcrumbData}></Breadcrumb>
      </section>

      <section className="flex gap-6">
        <div
          className="flex flex-col gap-6 border border-grey-100 bg-white rounded-lg p-6 w-[80%]"
          id="left-panel"
        >
          <section id="general-information" className="flex flex-col gap-4">
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                General Information
              </Text>
            </div>

            <form.Field name="name">
              {(field) => (
                <div className="flex flex-col">
                  <InputField
                    label="Product Name"
                    required
                    placeholder="Enter your product name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <div className="flex flex-col">
                  <AreaField
                    label="Description"
                    placeholder="Enter your product description"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            <div
              className="flex place-items-start w-full gap-4 "
              id="category-subcategory "
            >
              <form.Field name="category">
                {(field) => {
                  return (
                    <section
                      className="flex w-full flex-col gap-2"
                      id="category"
                    >
                      <DropdownField
                        name="category"
                        options={categoryOptions}
                        label="Product Category"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          const subCat = _useSelectSubCategory({
                            category: data?.categories ?? [],
                            selectedCategroyId: e.target.value,
                          });
                          subCat?.map((item) => {
                            sub.push({
                              value: item._id,
                              label: item.name,
                            });
                          });
                          setSubOptions(sub);
                        }}
                      />
                      <FieldError field={field} />
                    </section>
                  );
                }}
              </form.Field>

              <section className="flex w-full flex-col gap-4" id="sub-category">
                <form.Field name="subCategory">
                  {(field) => (
                    <div className="flex flex-col">
                      <DropdownField
                        label="Sub-Category"
                        name="subCategory"
                        options={subOptions}
                        value={field.state.value as any}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError field={field} />
                    </div>
                  )}
                </form.Field>
              </section>
            </div>

            <div className="flex w-[49%] flex-col gap-2" id="brand">
              <form.Field name="brand">
                {(field) => (
                  <div className="flex flex-col">
                    <DropdownField
                      label="Brand"
                      options={brandOptions}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </div>
                )}
              </form.Field>
            </div>
          </section>

          <section id="pricing" className="flex flex-col gap-4 w-full">
            <div className="border-b  border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Pricing
              </Text>
            </div>

            <div className="flex gap-4 w-full">
              <section className="flex flex-1 flex-col gap-2" id="price">
                <div className="flex gap-1">
                  <Text variant="grey-600" size="body-sm-lg">
                    Selling Price
                  </Text>
                  <span className="text-red">*</span>
                </div>

                <div
                  className="border border-grey-200 w-full rounded text-black flex flex-col gap-2 outline-none"
                  id="price-input"
                >
                  <div className="flex place-items-center">
                    <label htmlFor="" className="border-r py-3 px-4 ">
                      Rs.
                    </label>
                    <form.Field name="sellingPrice">
                      {(field) => (
                        <div className="flex flex-col relative ">
                          <input
                            type="text"
                            placeholder="Enter your product price"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="outline-none"
                          />
                          <div className="absolute -bottom-8 -left-14">
                            <FieldError field={field} />
                          </div>
                        </div>
                      )}
                    </form.Field>
                  </div>
                </div>
              </section>

              <section className="flex flex-col flex-1 gap-2 ">
                <div className="flex gap-1">
                  <Text variant="grey-600" size="body-sm-lg">
                    Product Weight
                  </Text>
                  <span className="text-red">*</span>
                </div>
                <div
                  className="border border-grey-200 w-full rounded text-black flex  gap-2 outline-none"
                  id="price-input"
                >
                  <form.Field name={`attributeUnit`}>
                    {(field) => (
                      <DropdownField
                        label=""
                        options={unitFields}
                        className="border-r border-none py-2 px-4 outline-none h-full "
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>

                  <form.Field name={`attributeValue`}>
                    {(field) => (
                      <input
                        type="text"
                        placeholder="Enter your product weight"
                        className="outline-none w-[50%]"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                </div>
              </section>
            </div>
          </section>

          <section id="Variation" className="flex flex-col gap-4 w-full">
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Variation
              </Text>
            </div>
            <form.Field name="attribute">
              {(field) => (
                <>
                  {field.state.value?.map((_, index) => (
                    <div
                      className="flex gap-4 w-full items-start"
                      id="variation-weight-color-parent"
                      key={index}
                    >
                      <section
                        className="flex flex-col w-full gap-2"
                        id="variation"
                      >
                        <form.Field name={`attribute[${index}].name`}>
                          {(field) => (
                            <div className="flex flex-col gap-1">
                              <InputField
                                label="Variation Type"
                                placeholder="Enter the variation type"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                              <FieldError field={field} />
                            </div>
                          )}
                        </form.Field>
                      </section>

                      <section
                        className="flex w-full flex-col gap-2"
                        id="weight"
                      >
                        <div className="flex gap-1">
                          <Text variant="grey-600" size="body-sm-lg">
                            Weight
                          </Text>
                          <span className="text-red">*</span>
                        </div>

                        <div className="border border-grey-200  rounded text-black flex place-items-center gap-2 outline-none">
                          <form.Field name={`attribute[${index}].unit`}>
                            {(field) => (
                              <DropdownField
                                label=""
                                options={unitFields}
                                className="border-r border-none py-2 px-4 outline-none h-full "
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            )}
                          </form.Field>

                          <form.Field name={`attribute[${index}].value`}>
                            {(field) => (
                              <input
                                type="text"
                                placeholder="Enter your product weight"
                                className="outline-none w-[50%]"
                                value={
                                  typeof field.state.value === 'boolean'
                                    ? field.state.value.toString()
                                    : (field.state.value ?? '')
                                }
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            )}
                          </form.Field>
                        </div>
                      </section>

                      <form.Field name={`attribute[${index}].price`}>
                        {(field) => (
                          <InputField
                            type="text"
                            label="Selling Price"
                            placeholder="Enter your selling Price"
                            value={field.state.value as any}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value as any)
                            }
                          />
                        )}
                      </form.Field>

                      <section
                        className="flex w-full flex-col gap-2"
                        id="color"
                      >
                        <form.Field name={`attribute[${index}].color`}>
                          {(field) => (
                            <InputField
                              label="Color"
                              placeholder="Enter the variation type"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          )}
                        </form.Field>
                      </section>

                      <section
                        className="bg-[#FF4D4D1A] rounded p-3 flex h-[65%] place-items-center  place-self-center "
                        onClick={() => {
                          const newValue = [...field.state.value];
                          newValue.splice(index, 1);
                          field.handleChange(newValue);
                        }}
                      >
                        <Icon
                          icon="fluent:delete-24-regular"
                          fontSize={52}
                          color="#FF4D4D"
                        />
                      </section>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      field.handleChange([
                        ...field.state.value,
                        { color: '', name: '', value: '', unit: '' },
                      ]);
                    }}
                    className="p-2 bg-[#3A4252] rounded w-[15%] text-xs text-white flex place-items-center justify-center "
                  >
                    + Add Variant
                  </button>
                </>
              )}
            </form.Field>
          </section>

          <button
            className="w-[20%] rounded py-3 px-2  bg-primary-blue text-white"
            type="submit"
          >
            {product ? 'Update' : 'Submit'}
          </button>
        </div>

        <div className="flex flex-col w-[30%] gap-6" id="right-panel">
          <section
            className="flex flex-col gap-4 shadow-sm bg-white border rounded-lg  border-grey-100 p-4"
            id="status"
          >
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Status
              </Text>
            </div>

            {statusFields.map((status, index) => (
              <form.Field key={index} name="status">
                {(field) => (
                  <div className="flex place-items-center gap-2">
                    <input
                      type="radio"
                      className="h-4 w-4  shadow-sm outline-none "
                      name="status"
                      value={status.label}
                      onBlur={field.handleBlur}
                      checked={(field?.state?.value as any) === status.label}
                      onChange={(e) => {
                        field.handleChange((e.target as any)?.value);
                      }}
                    />
                    <Text variant="grey-600" size="body-sm-default">
                      {status.label}
                    </Text>
                  </div>
                )}
              </form.Field>
            ))}
          </section>
          {/* visible as */}

          <section
            className="flex flex-col gap-4 shadow-sm bg-white border rounded-lg border-grey-100 p-4"
            id="visible"
          >
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Visible as
              </Text>
            </div>

            {visibleFields.map((status, index) => (
              <form.Field key={index} name="visibleAs">
                {(field) => (
                  <div className="flex place-items-center gap-2">
                    <input
                      type="radio"
                      className="h-4 w-4 shadow-sm outline-none"
                      name="visibleAs"
                      value={status.label}
                      onBlur={field.handleBlur}
                      checked={(field?.state?.value as any) === status.label}
                      onChange={(e) => {
                        field.handleChange((e.target as any)?.value);
                        console.log(e.target.value);
                      }}
                    />
                    <Text variant="grey-600" size="body-sm-default">
                      {status.label}
                    </Text>
                  </div>
                )}
              </form.Field>
            ))}

            {/* <button className="text-primary-blue text-start">
              Add new visibility
            </button> */}
          </section>

          <section
            className="flex flex-col gap-4 shadow-sm bg-white border rounded-lg  border-grey-100 p-4"
            id="status"
          >
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Product Tags
              </Text>
            </div>

            <section className="flex flex-col gap-4 shadow-sm bg-white border rounded-lg border-grey-100 p-4">
              <div className="border-b border-grey-100 pb-2">
                <Text variant="fade-black" size="body-md-lg">
                  Product Tags
                </Text>
              </div>

              <div className="relative">
                <div className="flex flex-wrap gap-2 border border-grey-200 rounded p-2 min-h-[40px]">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-[#E2E8F0] rounded text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        className="hover:text-gray-700"
                        onClick={() => removeTag(tag)}
                      >
                        <Icon
                          icon="material-symbols:close"
                          className="h-3 w-3"
                        />
                      </button>
                    </div>
                  ))}

                  {/* Input Field Stays Inline */}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur} // Automatically submit when input loses focus
                    className="outline-none flex-1 min-w-[100px] text-sm"
                    placeholder="Enter tags..."
                  />
                </div>
              </div>
            </section>
          </section>

          <section
            className="flex flex-col gap-4 shadow-sm bg-white border rounded-lg  border-grey-100 p-4"
            id="upload"
          >
            <div className="border-b border-grey-100 pb-2">
              <Text variant="fade-black" size="body-md-lg">
                Upload Photos
              </Text>
            </div>

            <form.Field name="photos">
              {(field) => (
                <UploadPhotos
                  value={field.state.value}
                  onChange={(files: any) => field.handleChange(files as any)}
                />
              )}
            </form.Field>
            {/* <UploadPhotos /> */}
          </section>
        </div>
      </section>
    </form>
  );
};
