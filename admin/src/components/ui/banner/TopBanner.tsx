import {
  DropdownField,
  FileWithPreview,
  InputField,
  Loader,
  Modal,
  Table,
  TableSkeletonLoader,
} from '@/components/shared';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Text } from '@/components/shared';
import { useOutsideClick } from '@/hooks/UseOutsideClick';
import { FieldApi, useForm } from '@tanstack/react-form';
import { UploadSinglePhoto } from '@/components/shared/UploadSingleFile';
import { useProductForPurchaseHistory } from '@/server-action/api/product';
import {
  useGetCategories,
  useGetJustBrands,
} from '@/server-action/api/attribute';
import { BannerSchema } from '@/(___types)/banner/_type-banner';
import {
  useCreateBanner,
  useDeleteBanner,
  useGetBanners,
  useUpdateBanner,
} from '@/server-action/api/banner';
import { IBanner } from '@/(___types)';
import ImageModal from '@/components/shared/ImageModal';

const TopBanner = () => {
  const [addAttribute, setAddAttribute] = useState(false);
  const modalRef = useOutsideClick(() => setAddAttribute(false));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: bannerData, isLoading } = useGetBanners();
  const [bannerDatas, setBannerData] = useState<IBanner[]>([]);
  const [editData, setEditData] = useState<IBanner | null>(null);

  const columns = [
    { key: 'title', header: 'Title', width: '200px' },
    { key: 'description', header: 'Description', width: '200px' },
    {
      key: '',
      header: 'Banner Type',
      render: (_: any, data: any) => {
        const text =
          data?.category?.name ||
          data?.product?.name ||
          data?.brand?.name ||
          '';

        return (
          <span
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              whiteSpace: 'pre-line',
            }}
          >
            {text
              .split(' ')
              .reduce((acc: string[], word: any, index: any) => {
                if (index % 5 === 0) acc.push('');
                acc[acc.length - 1] += (acc[acc.length - 1] ? ' ' : '') + word;
                return acc;
              }, [])
              .join('\n')}
          </span>
        );
      },
    },

    {
      key: 'image',
      header: 'Web Image',
      width: '200px',
      render: (_: any, banner: any) => (
        <div className="flex place-items-center gap-2">
          <img
            src={`https://api-bhansa.webstudiomatrix.com/${banner.image}`}
            className="w-20 h-16"
            alt="banner image"
            onClick={() =>
              setSelectedImage(
                `https://api-bhansa.webstudiomatrix.com/${banner.image}`
              )
            }
          />
        </div>
      ),
    },
    {
      key: 'image',
      header: 'Mobile Image',
      width: '200px',
      render: (_: any, banner: any) => (
        <div className="flex place-items-center gap-2">
          <img
            src={`https://api-bhansa.webstudiomatrix.com/${banner.mobImage}`}
            className="w-20 h-16"
            alt="banner image"
            onClick={() =>
              setSelectedImage(
                `https://api-bhansa.webstudiomatrix.com/${banner.mobImage}`
              )
            }
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (bannerData) {
      const filterData = bannerData?.getAllBanners?.filter((data) =>
        data?.locations?.includes('homepage')
      );
      setBannerData(filterData);
    }
  }, [bannerData]);

  const { mutateAsync: deleteBanner, isPending: deletePending } =
    useDeleteBanner();

  const handleDelete = async (row: any) => {
    await deleteBanner({ id: row?._id });
  };

  if (deletePending) {
    return <Loader titleName="Deleting" />;
  }

  return (
    <div className="bg-white">
      <section
        className="flex place-items-center justify-between p-4 border-b shadow-sm border-grey-100 gap-6"
        id="search-filter"
      >
        <div
          className="flex place-items-center gap-2 border border-border rounded py-3 px-4 w-[100%] shadow-sm"
          id="search"
        >
          <Icon icon="iconamoon:search-light" color="#8695AA" />
          <input
            type="text"
            className="outline-none text-lynch-400 text-sm w-full"
            placeholder="search here..."
          />
        </div>

        <section
          className="flex shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer md:w-[12rem]"
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={28} />
          <Text variant="white" size="body-base-default">
            Add Banner
          </Text>
        </section>
      </section>

      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <Table
          data={bannerDatas ?? []}
          columns={columns}
          showAction={true}
          showEdit
          editRow={(row) => {
            setEditData(row);
            setAddAttribute(true);
          }}
          showDelete
          deleteRow={(row) => handleDelete(row)}
        />
      )}
      {addAttribute && (
        <Modal ref={modalRef} classname="w-[35%]">
          <AddBanner
            editData={editData}
            onClose={() => setAddAttribute(false)}
          />
        </Modal>
      )}
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default TopBanner;

const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  if (field.state.meta.errors.length > 0) {
    return (
      <div className="min-h-[20px]">
        <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
      </div>
    );
  }
};

export const AddBanner = ({
  editData,
  onClose,
}: {
  editData: any;
  onClose: any;
}) => {
  const categoryOptions = [
    { label: 'Products', value: 'product' },
    { label: 'Category', value: 'category' },
    { label: 'Brand', value: 'brand' },
  ];

  const [otherFunction, setOtherFunction] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { data: productData } = useProductForPurchaseHistory(1, 100);
  const { data: categoryData } = useGetCategories();
  const { data: brandData } = useGetJustBrands();
  const { mutateAsync: createBanner } = useCreateBanner();
  const { mutateAsync: updateBanner } = useUpdateBanner();
  const form = useForm({
    defaultValues: {
      title: editData?.title ?? 'dd',
      description: editData?.description ?? '',
      selectBy: editData?.produtc?.name ?? '',
      logo: editData?.image ?? ({} as FileWithPreview),
      mobileLogo: editData?.mobImage ?? ({} as FileWithPreview),
      priority: editData?.priority ?? 0,
      selectedCategory: editData?.category?.name || '',
    },
    validators: {
      onChange: BannerSchema as any,
    },

    onSubmit: async ({ value }) => {
      const location = ['homepage'];
      const formData = new FormData();
      formData.append('title', value.title);
      formData.append('description', value.description);
      if (value.selectBy === 'product') {
        formData.append('product', value.selectedCategory);
      }
      if (value.selectBy === 'category') {
        formData.append('category', value.selectedCategory);
      }
      if (value.selectBy === 'brand') {
        formData.append('brand', value.selectedCategory);
      }
      location.forEach((loc, index) =>
        formData.append(`locations[${index}]`, loc)
      );
      formData.append('priority', value.priority?.toFixed());
      formData.append('mobImage', value.mobileLogo);
      formData.append('image', value.logo);

      try {
        if (editData?._id) {
          const res = await updateBanner({
            id: editData._id,
            bannerData: formData,
          });
          if (res?.data?.success) {
            onClose(false);
            form.reset();
          }
        } else {
          const res = await createBanner(formData);
          if (res?.data?.success) {
            form.reset();
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    },
  });

  useEffect(() => {
    form.reset();
  }, [editData]);

  return (
    <div className="flex flex-col gap-6 w-full h-[40rem] p-8 overflow-scroll">
      <h1 className="text-xl font-semibold">
        {editData ? 'Edit' : 'Add'} Home Page Banner
      </h1>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4 ">
          <form.Field name="title">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  label="Banner Title"
                  placeholder="Enter Title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 ">
          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  label="Banner Description"
                  placeholder="Enter Description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 ">
          <form.Field name="selectBy">
            {(field) => (
              <div className="flex flex-col">
                <DropdownField
                  label="Select By"
                  options={categoryOptions}
                  value={field.state.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(value);
                    if (value === 'product') {
                      setOtherFunction('product');
                      setSelectedOptions(
                        productData?.getAllProducts.products?.map(
                          (product) => ({
                            label: product.name,
                            value: product._id,
                          })
                        ) || []
                      );
                    }
                    if (value === 'category') {
                      setOtherFunction('category');
                      setSelectedOptions(
                        categoryData?.categories?.map((category) => ({
                          label: category.name,
                          value: category._id,
                        })) || []
                      );
                    }
                    if (value === 'brand') {
                      setOtherFunction('brand');
                      setSelectedOptions(
                        brandData?.brand?.map((brand) => ({
                          label: brand.name,
                          value: brand._id,
                        })) || []
                      );
                    }
                  }}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        {otherFunction && (
          <div className="flex flex-col gap-4 ">
            <form.Field name="selectedCategory">
              {(field) => (
                <div className="flex flex-col">
                  <DropdownField
                    label={otherFunction}
                    options={selectedOptions}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          <form.Field name="priority">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  type="number"
                  min={1}
                  max={10}
                  label="Priority"
                  placeholder="Enter Priority (1-10)"
                  value={field.state.value}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(10, Number(e.target.value))
                    );
                    field.handleChange(value);
                  }}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 w-full items-start ">
          <form.Field name="logo">
            {(field) => (
              <section>
                <Text variant="grey-600" size="body-sm-lg">
                  {editData ? 'Edit' : 'Add'} Banner Image
                </Text>
                <UploadSinglePhoto
                  value={field.state.value as any}
                  onChange={(files) => field.handleChange(files as any)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 w-full items-start ">
          <form.Field name="mobileLogo">
            {(field) => (
              <section>
                <Text variant="grey-600" size="body-sm-lg">
                  {!editData ? 'Add' : 'Edit'} Mobile Banner Image
                </Text>
                <UploadSinglePhoto
                  value={field.state.value as any}
                  onChange={(files) => field.handleChange(files as any)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>
        </div>
        <div className="w-fit h-fit">
          <button className="bg-[#2275FC] text-white py-2 px-6 rounded text-center">
            {editData ? 'Edit' : 'Add'} Banner
          </button>
        </div>
      </form>
    </div>
  );
};
