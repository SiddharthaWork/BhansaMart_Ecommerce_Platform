import { Icon } from '@iconify/react/dist/iconify.js';
import {
  DropdownField,
  FileWithPreview,
  InputField,
  Loader,
  Text,
} from '../../../shared';
import { Field, FieldApi, useForm } from '@tanstack/react-form';
import {
  useCreateSupplier,
  useUpdateSupplier,
} from '@/server-action/api/supplier';
import { ISupplier } from '@/(___types)/_type-supplier';
import { UploadSinglePhoto } from '@/components/shared/UploadSingleFile';
import { supplierSchema } from '@/(___types)/supplier/_type-supplier';
import { useEffect } from 'react';

const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  if (field.state.meta.errors.length > 0) {
    return (
      <div className="min-h-[20px]">
        <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
      </div>
    );
  }
};

interface editDataProps {
  editData?: ISupplier;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddSupliers = ({ editData, setIsOpen }: editDataProps) => {
  const { mutateAsync: createSupplier, isPending: createPending } =
    useCreateSupplier();
  const { mutateAsync: updateSupplier, isPending: updatePending } =
    useUpdateSupplier();
  const form = useForm({
    defaultValues: {
      name: editData?.name ?? '',
      email: editData?.email ?? '',
      phone: editData?.phone ?? '',
      // province: editData?.addresses?.province ?? '',
      logo: editData?.logo ?? ({} as FileWithPreview),
      // district: editData?.addresses?.district ?? '',
      address: editData?.addresses?.address ?? '',
      businessType: editData?.businessType ?? '',
      contactEmail: editData?.contactPerson?.email ?? '',
      contactPhone: editData?.contactPerson?.phone ?? '',
      contactName: editData?.contactPerson?.name ?? '',
      company: editData?.businessInfo?.company ?? '',
      pan: editData?.businessInfo?.PAN ?? '',
      bankName: editData?.bankDetails?.bankName ?? '',
      branch: editData?.bankDetails?.branch ?? '',
      accountName: editData?.bankDetails?.accountHolderName ?? '',
      accountNumber: editData?.bankDetails?.accountNumber ?? '',
      paymentTerms: editData?.bankDetails?.paymentTerms ?? '',
    },

    validators: {
      onChange: supplierSchema as any,
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append('name', value.name);
      formData.append('businessType', value.businessType);
      formData.append('phone', value.phone);
      formData.append('email', value.email);
      formData.append('logo', value.logo);
      formData.append('contactPerson[name]', value.contactName);
      formData.append('contactPerson[phone]', value.contactPhone);
      formData.append('contactPerson[email]', value.contactEmail);
      // formData.append('addresses[district]', value.district);
      formData.append('addresses[address]', value.address);
      // formData.append('addresses[province]', value.province);
      // formData.append(
      //   'address',
      //   // `{${value.address},${value.district},${value.province}`
      // );
      formData.append('businessInfo[company]', value.company);
      formData.append('businessInfo[PAN]', value.pan);
      formData.append('bankDetails[bankName]', value.bankName);
      formData.append('bankDetails[branch]', value.branch);
      formData.append('bankDetails[accountHolderName]', value.accountName);
      formData.append('bankDetails[accountNumber]', value.accountNumber);
      formData.append('bankDetails[paymentTerms]', value.paymentTerms);

      if (editData) {
        await updateSupplier({
          supplierData: formData,
          id: editData._id,
        });
      } else {
        await createSupplier(formData);
      }
    },
  });

  useEffect(() => {
    form.reset();
  }, [editData]);

  if (updatePending || createPending) {
    return (
      <Loader
        titleName={updatePending ? 'Updating Supplier' : 'Creating Supplier'}
      />
    );
  }
  return (
    <div className="w-full h-full">
      <section className="flex flex-row items-center gap-8 p-4 border-b-2">
        <Icon
          icon="tabler:arrow-left"
          width="24"
          height="24"
          onClick={() => setIsOpen?.(false)}
        />
        <h1 className="text-2xl">{`${editData ? 'Edit' : 'Add'} Supplier`}</h1>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full h-full flex flex-col gap-6 py-4 px-6"
      >
        <section className="flex flex-col gap-2 w-full h-fit">
          <div className="flex flex-row items-center gap-4">
            <Icon icon="mingcute:headphone-fill" width="24" height="24" />
            <Text size="body-md-lg" variant="fade-black">
              General Information
            </Text>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Business Type
            </Text>
            <section className="w-[64%] shadow-sm ">
              <form.Field name="businessType">
                {(field) => (
                  <section>
                    <InputField
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Business Type"
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Email
            </Text>
            <section className="w-[64%] shadow-sm ">
              <form.Field name="email">
                {(field) => (
                  <section>
                    <InputField
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Business Email"
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Phone
            </Text>
            <section className="w-[64%] shadow-sm ">
              <form.Field name="phone">
                {(field) => (
                  <section>
                    <InputField
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Phone"
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Supplier Name
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="name">
                {(field) => (
                  <section>
                    <InputField
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Supplier Name"
                      label=""
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Address
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="address">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Supplier Address"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      label=""
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>

          <div className="flex flex-col gap-2">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Logo
            </Text>
            <form.Field name="logo">
              {(field) => (
                <section>
                  <UploadSinglePhoto
                    value={field.state.value as any}
                    onChange={(files) => field.handleChange(files as any)}
                  />
                  <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </div>
        </section>

        <section className="flex flex-col gap-2 w-full h-fit border-t-2 py-4">
          <div className="flex flex-row items-center gap-4">
            <Icon icon="mingcute:headphone-fill" width="24" height="24" />
            <Text size="body-md-lg" variant="fade-black">
              Business Information
            </Text>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Company Name
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="company">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Name"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              PAN
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="pan">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Province"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      label=""
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
        </section>

        {/* Contact Person Information Section */}
        <section className="flex flex-col gap-2 w-full h-fit border-t-2 py-4">
          <div className="flex flex-row items-center gap-4">
            <Icon icon="mingcute:headphone-fill" width="24" height="24" />
            <Text size="body-md-lg" variant="fade-black">
              Contact Person Information
            </Text>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Full Name
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="contactName">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Full Name"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Phone Number
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="contactPhone">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Phone Number"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Email Address
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="contactEmail">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Email Address"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
        </section>

        <section className="flex flex-col gap-2 w-full h-fit border-t-2 py-4">
          <div className="flex flex-row items-center gap-4">
            <Icon icon="mingcute:headphone-fill" width="24" height="24" />
            <Text size="body-md-lg" variant="fade-black">
              Payment Information
            </Text>
          </div>

          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Payment Terms
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="paymentTerms">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Payment Terms"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Bank Name
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="bankName">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Bank Name"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Branch
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="branch">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Branch"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Account Name
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="accountName">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Account Name"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Text size="body-base-lg" variant="fade-black" className="w-[36%]">
              Account Number
            </Text>
            <section className="w-[64%] shadow-sm">
              <form.Field name="accountNumber">
                {(field) => (
                  <section>
                    <InputField
                      placeholder="Enter Account Number"
                      label=""
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError field={field} />
                  </section>
                )}
              </form.Field>
            </section>
          </div>
        </section>

        {/* <section className="flex flex-col gap-2 w-full h-fit border-t-2 py-4">
          <div className="flex flex-row items-center gap-4">
            <Icon icon="mingcute:headphone-fill" width="24" height="24" />
            <Text size="body-md-lg" variant="fade-black">
              Items Supplied
            </Text>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <section className="w-full shadow-sm flex justify-between items-center gap-2">
              <div className="w-[90%]">
                <DropdownField label="" />
              </div>
              <Icon icon="flat-color-icons:plus" width="38" height="38" />
            </section>
          </div>
        </section> */}

        <div className="mt-6 pb-6 flex place-items-end gap-4 justify-center">
          <button className="bg-[#6A6A6A] text-white py-2 px-6 rounded text-center">
            Cancel
          </button>
          <button className="bg-[#2275FC] text-white py-2 px-6 rounded text-center">
            {editData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};
