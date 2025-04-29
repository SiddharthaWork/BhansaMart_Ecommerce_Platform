import { FieldApi, useForm } from '@tanstack/react-form';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  AreaField,
  FileWithPreview,
  InputField,
  Loader,
  Text,
  UploadPhotos,
} from '../../shared';
import { _Category, _inputCategory } from '../../../(___types)/_type-Category';
import {
  useCreateCategory,
  useUpdateCategory,
} from '../../../server-action/api/category';
import React, { useEffect } from 'react';
import { categorySchema } from '@/(___types)/product/_type-product-category';
import { useCategoryList } from '@/contexts/useCategoryList';

const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  if (field.state.meta.errors.length > 0) {
    return (
      <div className="min-h-[20px]">
        <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
      </div>
    );
  }
};

interface _addCategoryPropTypes {
  category: _inputCategory | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryDetails: React.Dispatch<React.SetStateAction<_Category[] | null>>;
}

export const AddCategory = ({
  category,
  setShowModal,
  setCategoryDetails,
}: _addCategoryPropTypes) => {
  const { selectedSubCategoryName } = useCategoryList();
  const { mutateAsync: createCategory, isPending: createPending } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: updatePending } =
    useUpdateCategory();

  useEffect(() => {
    if (category && selectedSubCategoryName) {
      const subIndex = category.subCategories.findIndex(
        (sub) => sub.name === selectedSubCategoryName
      );
      if (subIndex !== -1) {
        const element = document.getElementById(`subcategory-${subIndex}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [category, selectedSubCategoryName]);
  console.log('rendered');

  const form = useForm({
    defaultValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
      priority: category?.priority ?? 0,
      images: category?.images ?? ([] as FileWithPreview[]),
      subCategories: category?.subCategories ?? [
        {
          name: '',
          description: '',
          images: [] as FileWithPreview[],
        },
      ],
    },

    validators: {
      onChange: categorySchema as any,
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData();

      // Add category fields
      formData.append('name', value.name);
      formData.append('description', value.description || '');
      value.images.forEach((image) => {
        formData.append('images', image);
      });
      formData.append('priority', value.priority.toString());

      value.subCategories.forEach((subCategory, subIndex) => {
        formData.append(`subCategories[${subIndex}][name]`, subCategory.name);
        formData.append(
          `subCategories[${subIndex}][description]`,
          subCategory.description
        );

        subCategory.images.forEach((image) => {
          if (image instanceof File) {
            formData.append(`subCategories[${subIndex}][images]`, image);
          } else {
            formData.append(`subCategories[${subIndex}][images]`, image);
          }
        });
      });
      // Optional: Log FormData entries for verification
      for (const [key, val] of formData.entries()) {
        console.log(key, val);
      }

      if (category) {
        const res = await updateCategory({
          categoryData: formData,
          id: category._id,
        });

        if (res?.data?.success) setShowModal(false);
        setCategoryDetails(null);
      } else {
        const res = await createCategory(formData);
        if (res.data?.success) setShowModal(false);
        setCategoryDetails(null);
      }
    },
  });

  useEffect(() => {
    form.reset({
      name: category?.name ?? '',
      description: category?.description ?? '',
      priority: category?.priority ?? 0,
      images: category?.images ?? ([] as FileWithPreview[]),
      subCategories: category?.subCategories ?? [
        { name: '', description: '', images: [] },
      ],
    });
  }, [category]);

  if (updatePending || createPending) {
    return (
      <Loader
        titleName={updatePending ? 'Updating Category' : 'Creating Category'}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="p-10 flex flex-col gap-10"
    >
      <Text size="body-lg-rare" variant="fade-black">
        Add New Category
      </Text>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 border-b pb-6 border-lynch-50">
          <form.Field name="name" validators={{}}>
            {(field) => (
              <section className="flex flex-col gap-2">
                <InputField
                  label="Category Name"
                  placeholder="Enter category name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>

          <form.Field name="priority">
            {(field) => (
              <section className="flex flex-col gap-2">
                <InputField
                  label="Priority Order Number"
                  placeholder="Enter category Order"
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value as any)}
                  // error={field.state.meta.touchedErrors[0]}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <section className="flex flex-col gap-2">
                <AreaField
                  label="Category Description"
                  placeholder="Enter Category description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>

          <section className="flex flex-col gap-2">
            <form.Field name="images">
              {(field) => (
                <section className="flex flex-col gap-2">
                  <Text size="body-xs-default" variant="fade-black">
                    Upload Documents
                  </Text>
                  <UploadPhotos
                    value={field.state.value}
                    onChange={(files) => field.handleChange(files as any)}
                  />
                  <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </section>
        </div>

        <form.Field name="subCategories">
          {(field) => (
            <>
              {field.state.value?.map((sub, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border-lynch-50"
                  id={`subcategory-${index}`}
                >
                  {/* Sub-category Name Field */}
                  <form.Field name={`subCategories[${index}].name`}>
                    {(subField) => (
                      <section className="flex flex-col gap-2">
                        <InputField
                          label="Sub-Category Name"
                          placeholder="Enter sub category name"
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
                        <FieldError field={subField} />
                      </section>
                    )}
                  </form.Field>

                  {/* Sub-category Description Field */}
                  <form.Field name={`subCategories[${index}].description`}>
                    {(subField) => (
                      <section className="flex flex-col gap-2">
                        <AreaField
                          label="Sub-Category Description"
                          placeholder="Describe about the subcategory"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
                        <FieldError field={subField} />
                      </section>
                    )}
                  </form.Field>

                  <section className="flex flex-col gap-2">
                    <form.Field name={`subCategories[${index}].images`}>
                      {(subField: any) => (
                        <section className="flex flex-col gap-2">
                          <Text size="body-xs-default" variant="fade-black">
                            Upload Photo
                          </Text>
                          <UploadPhotos
                            value={subField.state.value}
                            onChange={(files) => {
                              subField.handleChange(files);
                            }}
                          />
                          <FieldError field={subField} />
                        </section>
                      )}
                    </form.Field>
                  </section>

                  {
                    <button
                      type="button"
                      onClick={() => {
                        field.handleChange(
                          field.state.value.filter((_, i) => i !== index)
                        );
                      }}
                      className="py-1 px-2 bg-red-500 rounded w-[20%] text-xs text-black bg-grey-100"
                    >
                      Remove
                    </button>
                  }
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  field.handleChange([
                    ...field.state.value,
                    {
                      name: '',
                      description: '',
                      images: [],
                    },
                  ]);
                }}
                className="py-1 px-2 bg-lynch-400 rounded w-[20%] text-xs text-white"
              >
                Add More
              </button>
            </>
          )}
        </form.Field>

        <button
          type="submit"
          className="flex place-items-center bg-primary-blue py-3 px-2 rounded w-[25%] gap-2"
        >
          <Text variant="white" size="body-base-default">
            {category ? 'Update' : 'Submit'}
          </Text>
          <Icon icon="oui:arrow-right" color="white" fontSize={15} />
        </button>
      </section>
    </form>
  );
};
