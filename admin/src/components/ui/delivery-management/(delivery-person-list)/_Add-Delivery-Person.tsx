import { Icon } from '@iconify/react/dist/iconify.js';
import { PhoneCode } from '../../../../constants/phone-code';
import {
  FileWithPreview,
  InputField,
  Text,
  UploadPhotos,
} from '../../../shared';
import { FieldApi, useForm } from '@tanstack/react-form';
import { useCreateuser } from '@/server-action/api/user';
import { toast, ToastContainer } from 'react-toastify';
import { UploadSinglePhoto } from '@/components/shared/UploadSingleFile';
import { deliverySchema } from '@/(___types)/delivery/_type-delivery-personlist';

export const _AddDeliveryPerson = () => {
  const genderDetails = [
    {
      id: 'male',
      label: 'Male',
    },
    {
      id: 'female',
      label: 'Female',
    },
    {
      id: 'other',
      label: 'Other',
    },
  ];

  const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
    if (field.state.meta.errors.length > 0) {
      return (
        <div className="min-h-[20px]">
          <span className="text-red text-xs">
            {field.state.meta.errors[0]}
          </span>
        </div>
      );
    }
  }

  const { mutateAsync: createUser } = useCreateuser();

  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      joinDate: '',
      gender: '',
      vehicleNumber: '',
      vehicleModel: '',
      vehicleType: '',
      license: {} as FileWithPreview,
      citizenship: [] as FileWithPreview[],
      password: '',
    },

    validators: {
      onChange: deliverySchema as any,
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append('name', value.firstname + value.lastname);
      formData.append('email', value.email);
      formData.append('phone', value.phone);
      formData.append('address', value.address);
      formData.append('joinDate', value.joinDate);
      formData.append('gender', value.gender);
      formData.append('password', value.password);
      formData.append('role', 'driver');

      formData.append('vehicle[number]', value.vehicleNumber);
      formData.append('vehicle[model]', value.vehicleModel);
      formData.append('vehicle[type]', value.vehicleType);
      // value.license?.((lis) => formData.append(`license`, lis));
      formData.append('license', value.license);

      value.citizenship?.map((lis) => formData.append(`citizenship`, lis));

      const res: any = await createUser(formData);

      console.log(res);

      if (res.data?.success) toast.success(res?.data?.message);
    },
  });

  return (
    <form
      className="flex flex-col p-10 gap-9"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Text size="body-lg-rare" variant="fade-black">
        Add Delivery Person
      </Text>
      <section className="flex flex-col gap-[10px]">
        <div className="flex place-items-start gap-4 w-full mt-4 mb-2">
          <Text size="body-sm-default" variant="grey-500" className="absolute -top-6">
            Full Name
          </Text>

          <section className="w-[50%] flex-1">
            <form.Field name="firstname">
              {(field) => (
                <section className="h-full relative">
                  <Text variant="grey-600" size="body-sm-lg" className='absolute -top-6'>
                    Full Name
                  </Text>
                  <InputField
                    label=""
                    placeholder="First name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </section>

          <section className="w-[50%] flex-1">
            <form.Field name="lastname">
              {(field) => (
                <section className="h-full">
                  <InputField
                    label=""
                    placeholder="Last name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </section>
        </div>

        <div className="flex flex-col gap-2 ">
          <Text size="body-sm-default" variant="grey-500">
            Phone
          </Text>
          <section className="flex place-items-center p-3 gap-3  rounded border border-[#42506666]  shadow-sm ">
            {PhoneCode.map((item) => (
              <div
                className="flex place-items-center gap-2 pr-6 border-r"
                key={item._id}
              >
                <img src={item.url} alt="" />
                <span>{item.code}</span>
              </div>
            ))}
            <form.Field name="phone">
              {(field) => (
                <section className='flex flex-col gap-2 '>
                  <InputField
                    inputClassName="w-[90%] outline-none text-sm text-fade-black border-none -mt-2"
                    label=""
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your phone number"
                    defaultPadding={false}
                  />
                    <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </section>
        </div>

        <div className="flex flex-col gap-2">
          <Text size="body-sm-default" variant="grey-500">
            Address
          </Text>
          <section className="flex  place-items-center border border-[#42506666] shadow-sm rounded p-3 gap-2 ">
            <Icon icon="akar-icons:location" color="#000" fontSize={16} />
            <form.Field name="address">
              {(field) => (
                <section>
                  <InputField
                    defaultPadding={false}
                    label=""
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your address"
                    inputClassName="w-[90%]  text-sm  border-none text-fade-black -mt-2 "
                  />
                  <FieldError field={field} />
                </section>
              )}
            </form.Field>
          </section>
        </div>

        <form.Field name="joinDate">
          {(field) => (
            <section>
              <InputField
                label="Start Date"
                placeholder="Enter your address"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="date"
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>

        <form.Field name="vehicleNumber">
          {(field) => (
            <section>
              <InputField
                label="Vehicle Number"
                placeholder="Enter vehicle number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>

        <form.Field name="vehicleType">
          {(field) => (
            <section>
              <InputField
                label="Vehicle Type"
                placeholder="Enter vehicle type"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>

        <form.Field name="vehicleModel">
          {(field) => (
            <section>
              <InputField
                label="Vehicle Model"
                placeholder="Enter vehicle model"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>
      </section>
      <section className="flex place-items-center gap-8">
        {genderDetails.map((gender) => (
          <div key={gender.id} className="flex place-items-center gap-2 ">
            <form.Field key={gender.id} name="gender">
              {(field) => (
                <input
                  type="radio"
                  name="gender"
                  value={gender.id}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-4 h-4  rounded-full"
                  id={gender.id}
                />
              )}
            </form.Field>
            <span>{gender.label}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-[10px]">
        <form.Field name="email">
          {(field) => (
            <section>
              <InputField
                label="User Email"
                placeholder="Enter User email"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <section>
              <InputField
                label="Password"
                placeholder="*******"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                inputClassName="  text-sm  border border-[#42506666] px-3 py-3 shadow-sm rounded text-fade-black "
              />
              <FieldError field={field} />
            </section>
          )}
        </form.Field>
      </section>
      <section className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-2">
          <Text variant="grey-600" size="body-sm-lg">
            Upload License
          </Text>
          <form.Field name="license">
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

        <div className="flex flex-col gap-2">
          <Text variant="grey-600" size="body-sm-lg">
            Upload Citizenship ID
          </Text>
          <form.Field name="citizenship">
            {(field) => (
              <section>
                <UploadPhotos
                  value={field.state.value}
                  onChange={(files) => field.handleChange(files as any)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>
        </div>
      </section>
      <button className="flex place-items-center gap-2 bg-primary-blue p-3 w-[25%] rounded text-white">
        Submit
        <Icon icon="mingcute:right-line" fontSize={24} />
      </button>
    </form>
  );
};
