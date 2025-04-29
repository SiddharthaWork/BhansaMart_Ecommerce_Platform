import { _User } from '@/(___types)';
import { Text } from '@/components/shared';
import { Icon } from '@iconify/react/dist/iconify.js';

interface _deliveryPersonDetailPropTypes {
  user?: Partial<_User>;
  showAction?: boolean;
  onclose?: () => void;
}

export const DeliveryPersonDetails = ({
  user,
  showAction = false,
  onclose,
}: _deliveryPersonDetailPropTypes) => {
  console.log(user);
  return (
    <div className="flex flex-col ">
      <section className="flex place-items-center justify-between px-10 pt-10 pb-7">
        <Text size="body-lg-rare">Delivery Person Details</Text>
        <Icon icon="basil:cross-solid" fontSize={24} onClick={onclose} />
      </section>

      <section
        className={`flex flex-col gap-6 ${showAction ? 'h-[520px]' : ''} overflow-scroll`}
      >
        <div id="general-details" className="flex flex-col gap-3">
          <section className="flex py-2 px-10 bg-grey-100">
            <Text uppercase size="body-base-lg" variant="grey-400">
              general details
            </Text>
          </section>

          <section className="flex flex-col px-10 gap-3">
            <div className="flex flex-col gap-2  border-b border-grey-100  pb-3">
              <Text size="body-base-lg" variant="grey-400">
                Full Name
              </Text>
              <Text size="body-base-rare" variant="fade-black" capitalize>
                {user?.name}
              </Text>
            </div>

            <div className="flex flex-col gap-2  border-b border-grey-100  pb-3">
              <Text size="body-base-lg" variant="grey-400">
                Phone Number
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.phone}
              </Text>
            </div>

            <div className="flex flex-col gap-2  border-b border-grey-100  pb-3">
              <Text size="body-base-lg" variant="grey-400">
                Email
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.email}
              </Text>
            </div>

            <div className="flex flex-col gap-2   ">
              <Text size="body-base-lg" variant="grey-400">
                Address
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.address}
              </Text>
            </div>

            <div className="flex flex-col gap-2 ">
              <Text size="body-base-lg" variant="grey-400">
                Gender
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.gender}
              </Text>
            </div>
            <div className="flex flex-col gap-2    ">
              <Text size="body-base-lg" variant="grey-400">
                Vehicle Number
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.vehicle?.number}
              </Text>
            </div>

            <div className="flex flex-col gap-2    ">
              <Text size="body-base-lg" variant="grey-400">
                Start Date
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {new Date(user?.joinDate ?? '').toString()}
              </Text>
            </div>
          </section>
        </div>

        <div id="account-details" className="flex flex-col gap-3">
          <section className="flex py-2 px-10 bg-grey-100">
            <Text uppercase size="body-base-lg" variant="grey-400">
              account details
            </Text>
          </section>

          <section className="px-10">
            <div className="flex flex-col gap-2   border-b border-grey-100  pb-3">
              <Text size="body-base-lg" variant="grey-400">
                User account
              </Text>
              <Text size="body-base-rare" variant="fade-black">
                {user?.email}
              </Text>
            </div>
          </section>
        </div>

        <div id="document-details" className="flex flex-col gap-3">
          <section className="flex py-2 px-10 bg-grey-100">
            <Text uppercase size="body-base-lg" variant="grey-400">
              License
            </Text>
          </section>

          <section className="flex gap-2 px-10 ">
            <img
              src={`https://api-bhansa.webstudiomatrix.com${user?.license}`}
              alt="lis"
              className="w-[100px] h-[100px] object-contain"
            />
          </section>
        </div>

        <div id="document-details" className="flex flex-col gap-3">
          <section className="flex py-2 px-10 bg-grey-100">
            <Text uppercase size="body-base-lg" variant="grey-400">
              citizenship
            </Text>
          </section>

          <section className="flex gap-2 px-10 ">
            {user?.citizenship?.map((image, index) => (
              <div key={index}>
                <img
                  src={`https://api-bhansa.webstudiomatrix.com${image}`}
                  alt="citzenship"
                  className="w-[100px] h-[100px] object-contain"
                />
              </div>
            ))}
          </section>
        </div>
      </section>

      {showAction && (
        <section className="flex place-items-center justify-between px-10 py-3 gap-4">
          <button className="border flex place-items-center gap-1 border-red p-2 text-red rounded w-full justify-center">
            Reject
            <Icon icon="basil:cross-solid" color="red" fontSize={24} />
          </button>
          <button className="bg-primary-blue flex place-items-center justify-center gap-1 p-2 rounded text-white w-full">
            Approve
            <Icon icon="mdi:tick" color="white" fontSize={24} />
          </button>
        </section>
      )}
    </div>
  );
};
