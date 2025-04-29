import { Icon } from '@iconify/react/dist/iconify.js';
import { SideModal } from '../../../..';
import { AddSupliers } from '../AddSupliers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FrontendRoutes } from '../../../../../constants';
import { ISupplier } from '@/(___types)/_type-supplier';

const supplierData = {
  name: 'Fresh Farm',
  image: '/freshfarm.png',
  category: 'Agricultural Produce',
  location: 'Sundahara, Kathmandu',
  contact: {
    person: 'Sundarial Gurung',
    number: '+977-1234567890',
    email: 'SundarialGurung@FreshFarm.com',
  },
  businessInfo: {
    type: 'Agricultural Produce Supplier',
    registrationNumber: '1234567890',
    panNumber: '9876543210',
  },
  paymentInfo: {
    terms: 'Net 30 days',
    bank: 'Agriculture Bank of Nepal',
    accountNumber: '0102192192919219',
  },
  deliveryInfo: {
    frequency: 'Twice a week (Monday and Thursday)',
    time: '9:00 AM to 5:00 PM',
    leadTime: '3-5 Business days',
  },
  suppliedItems: [
    'Apples',
    'Bananas',
    'Carrots',
    'Tomatoes',
    'Onions',
    'Potatoes',
    'Lettuce',
    'Peppers',
  ],
};

interface _supplierDetailsPropTypes {
  data: ISupplier;
}

const SuppliersDetails = ({ data }: _supplierDetailsPropTypes) => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-6">
      <Details data={data} />
      <div className="flex flex-row gap-6">
        <Contact data={data} />
        <BusinessInformation data={data} />
      </div>
      <div className="flex flex-row gap-6">
        <Payment data={data} />
        <Delivery />
      </div>
    </div>
  );
};

export default SuppliersDetails;

export const Details = ({ data }: { data: ISupplier }) => {
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();

  return (
    <div className="w-full h-fit flex flex-col md:flex-row p-4 md:p-6 bg-white gap-4 md:gap-2 border-b-2 shadow-sm rounded-xl">
      <div className="w-full md:w-[20%] flex justify-center md:block">
        <img
          src={`https://api-bhansa.webstudiomatrix.com/${data.logo}`}
          alt={data.name}
          className="w-48 md:w-[12rem] h-48 md:h-[15rem] object-contain"
        />
      </div>

      <div className="flex flex-col w-full md:w-[80%] h-full gap-4 md:gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-2xl md:text-3xl font-medium flex flex-wrap items-end gap-2">
              {data.name}
              <div className="flex gap-2">
                <Icon
                  icon="el:phone-alt"
                  className="w-6 h-6 md:w-7 md:h-7 text-[#51B0AA]"
                />
                <Icon
                  icon="material-symbols:mail"
                  className="w-6 h-6 md:w-7 md:h-7 text-[#51B0AA]"
                />
              </div>
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-end">
              <p className="text-sm md:text-base flex gap-1 items-center">
                <Icon icon="mdi:building" className="w-5 h-5 md:w-6 md:h-6" />
                {supplierData.category}
              </p>
              <p className="text-sm md:text-base flex items-center gap-1">
                <Icon icon="mdi:location" className="w-5 h-5 md:w-6 md:h-6" />
                {data?.addresses?.address},{data?.addresses?.district},
                {data?.addresses?.province}
              </p>
            </div>
          </div>

          <div className="w-full md:w-fit flex flex-col md:flex-row gap-2 md:gap-4">
            <button
              onClick={() => nav(`${FrontendRoutes.PURCHASEDETAILS}/${1}`)}
              className="border-2 border-[#2275FC] text-[#2275FC] py-2 px-4 md:px-6 rounded text-center text-sm md:text-base"
            >
              Purchase Details
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="border-2 border-gray-300 text-gray-500 py-2 px-4 rounded text-center flex items-center justify-center gap-1 text-sm md:text-base"
            >
              <Icon icon="tabler:edit" className="w-5 h-5 md:w-6 md:h-6" />
              Edit
            </button>
            <SideModal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AddSupliers />
            </SideModal>
          </div>
        </div>

        {/* Items Supplied Section */}
        <div className="flex flex-col w-full h-full border-2 border-gray-300 p-3 md:p-4 rounded-lg gap-2 md:gap-3">
          <h1 className="text-lg md:text-xl">Items Supplied</h1>
          <div className="w-full flex flex-wrap gap-2 md:gap-4">
            {data?.products?.map((item, i) => (
              <span
                key={i}
                className="text-sm md:text-base p-1 px-3 md:px-4 rounded-full bg-red/10 text-red/80"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  title,
  icon,
  data,
}: {
  title: string;
  icon: string;
  data?: Record<string, string>; // Make data optional
}) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 lg:p-6 md:p-5">
      <div className="flex items-center gap-2 mb-4 md:gap-3 md:mb-6">
        <Icon icon={icon} className="text-[#51B0AA] w-6 h-6 md:w-7 md:h-7" />
        <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
          {title}
        </h2>
      </div>
      {data ? (
        <div className="space-y-4 md:space-y-5">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500 md:text-sm">
                {key}
              </span>
              <span className="text-sm text-black font-semibold md:text-base">
                {value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p>No Contact info available</p>
      )}
    </div>
  );
};

export const Contact = ({ data }: { data: ISupplier }) => (
  <InfoCard
    title="Contact Information"
    icon="mingcute:headphone-fill"
    data={data.contactPerson}
  />
);
export const BusinessInformation = ({ data }: { data: ISupplier }) => (
  <InfoCard
    title="Business Information"
    icon="mingcute:headphone-fill"
    data={data?.businessInfo}
  />
);
export const Payment = ({ data }: { data: ISupplier }) => (
  <InfoCard
    title="Payment Information"
    icon="mingcute:headphone-fill"
    data={data?.bankDetails}
  />
);
export const Delivery = () => (
  <InfoCard
    title="Delivery Information"
    icon="mingcute:headphone-fill"
    data={supplierData.deliveryInfo}
  />
);
