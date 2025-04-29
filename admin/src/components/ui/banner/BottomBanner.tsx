import { Loader, Modal, Table } from '@/components/shared';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Text } from '@/components/shared';
import { useOutsideClick } from '@/hooks/UseOutsideClick';
import { AddFlashSaleBanner } from './AddFlashSaleBanner';
import { useDeleteBanner, useGetBanners } from '@/server-action/api/banner';
import { IBanner } from '@/(___types)';
import ImageModal from '@/components/shared/ImageModal';
import { set } from 'zod';

const BottomBanner = () => {
  const [addAttribute, setAddAttribute] = useState(false);
  const modalRef = useOutsideClick(() => setAddAttribute(false));
  const [bannerDatas, setBannerData] = useState<IBanner[]>([]);
  const { data: bannerData } = useGetBanners();
  const [editData, setEditData] = useState<IBanner | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const columns = [
    { key: 'title', header: 'Title', width: '200px' },
    { key: 'description', header: 'Description', width: '200px' },
    {
      key: '',
      header: 'Banner Type',
      render: (_: any, data: any) => {
        return (
          <span>
            {data?.category
              ? data?.category?.name
              : data?.product
                ? data?.product?.name
                : data?.brand?.name}
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
      const data = bannerData.getAllBanners.filter(
        (bann) => !bann.locations.includes('homepage')
      );
      setBannerData(data);
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
      <Table
        data={bannerDatas ?? []}
        columns={columns}
        showAction={true}
        editRow={(row) => {
          setEditData(row);
          setAddAttribute(true);
        }}
        showEdit
        showDelete
        deleteRow={(row) => handleDelete(row)}
      />

      {addAttribute && (
        <Modal ref={modalRef} classname="w-[35%]">
          <AddFlashSaleBanner
            editData={editData}
            onClose={() => setAddAttribute(false)}
          />
        </Modal>
      )}
      {selectedImage && (
        <ImageModal
          onClose={() => setSelectedImage(null)}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};

export default BottomBanner;
