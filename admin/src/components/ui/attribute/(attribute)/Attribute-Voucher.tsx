import { Icon } from '@iconify/react/dist/iconify.js';
import {
  DropdownField,
  InputField,
  Modal,
  Table,
  TableSkeletonLoader,
  Text,
} from '../../../shared';
import { useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';

import { useForm } from '@tanstack/react-form';
import {
  useCreateVoucher,
  useGetVouchers,
} from '@/server-action/api/attribute';
import { toast } from 'react-toastify';
import { _IVoucher } from '@/(___types)/_type-attributes';
import { FieldApi } from '@tanstack/react-form';
import { voucherSchema } from '@/(___types)/voucher/_type_voucher';
import { DateFormatter } from '@/utils/DateFormatter';

export const AttributeVoucher = () => {
  const [addAttribute, setAddAttribute] = useState(false);

  const ref = useOutsideClick(() => setAddAttribute(false));

  const column = [
    {
      key: 'couponCode',
      header: 'Code',
    },
    {
      key: 'couponType',
      header: 'Type',
    },
    {
      key: 'value',
      header: 'Discount',
      render: (_: any, data: any) => {
        return (
          <span>
            {`${data?.couponType === 'percentage' ? data?.value + '%' : 'Rs. ' + data?.value}`}
          </span>
        );
      },
    },

    {
      key: 'startDate',
      header: 'Start Date',
      render: (_: any, data: any) => {
        const date = DateFormatter(data?.createdAt);
        return (
          <span>
            {date && !isNaN(date.getTime())
              ? date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Invalid Date'}
          </span>
        );
      },
    },
    {
      key: 'expiresOn',
      header: 'End Date',
      render: (_: any, data: any) => {
        const date = DateFormatter(data?.expiresOn);
        return (
          <span>
            {date && !isNaN(date.getTime())
              ? date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Invalid Date'}
          </span>
        );
      },
    },
  ];

  const { mutateAsync: createVoucher } = useCreateVoucher();
  const { data: voucherData, isLoading } = useGetVouchers();

  const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
    if (field.state.meta.errors.length > 0) {
      return (
        <div className="min-h-[20px]">
          <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
        </div>
      );
    }
    return <div className="min-h-[20px]" />;
  };

  const form = useForm({
    defaultValues: {
      couponCode: '',
      couponType: '',
      value: '',
      expiresOn: '',
      perUserLimit: 0,
      status: '',
    },
    validators: {
      onChange: voucherSchema as any,
    },
    onSubmit: async ({ value }) => {
      const res = await createVoucher({
        couponCode: value.couponCode,
        couponType: value.couponType,
        perUserLimit: value.perUserLimit,
        status: value.status,
        value: Number(value.value),
        expiresOn: new Date(value.expiresOn),
      });
      toast.success(res?.data?.message);
    },
  });

  return (
    <div className="rounded-xl bg-white">
      <section
        className="flex place-items-center justify-between p-4 border-b shadow-sm  border-grey-100 gap-6"
        id="search-filter"
      >
        <div
          className="flex place-items-center gap-2 border border-border rounded py-3 px-4 w-[73%] shadow-sm"
          id="search"
        >
          <Icon icon="iconamoon:search-light" color="#8695AA" />
          <input
            type="text"
            className="outline-none text-lynch-400 text-sm w-full    "
            placeholder="search here..."
          />
        </div>
        <section
          className="flex border border-grey-200 shadow-sm bg-white place-items-center gap-1 px-4 py-3 rounded cursor-pointer  "
          id="filter"
        >
          <Icon icon="fontisto:export" color="#B0B0B0" fontSize={28} />
          <Text variant="grey-300" size="body-base-default">
            Filter
          </Text>
        </section>
        <section
          className="flex  shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer  "
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={20} />
          <Text variant="white" size="body-base-default">
            Add Coupons
          </Text>
        </section>
      </section>

      <div className="bg-white p-3 rounded-b-3xl">
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            columns={column}
            data={(voucherData?.vouchers as unknown as _IVoucher[]) || []}
            showEdit
            showDelete
            showAction={true}
            showToggle
          />
        )}
      </div>

      {addAttribute && (
        <Modal ref={ref}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="p-16 flex flex-col gap-4 w-[510px]"
          >
            <Text size="body-lg-rare">Add Voucher</Text>

            <section className="flex flex-col gap-4">
              <div className="flex flex-col">
                <form.Field name="couponCode">
                  {(field) => (
                    <div className="flex flex-col">
                      <InputField
                        label="Code"
                        placeholder="eg. Example 20"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                      />
                      {/* {field.state.meta.errors && ( */}
                      <FieldError field={field} />
                      {/* )} */}
                    </div>
                  )}
                </form.Field>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <form.Field name="couponType">
                {(field) => (
                  <div className="flex flex-col">
                    <DropdownField
                      label="Type"
                      options={[
                        { label: 'Percentage', value: 'percentage' },
                        {
                          label: 'Fixed',
                          value: 'fixed',
                        },
                      ]}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                    />
                    <FieldError field={field} />
                  </div>
                )}
              </form.Field>

              <form.Field name="value">
                {(field) => (
                  <div>
                    <InputField
                      label="Discount"
                      placeholder="Enter Discount"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                    />
                    <FieldError field={field} />
                  </div>
                )}
              </form.Field>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <form.Field name="perUserLimit">
                {(field) => (
                  <div className="flex flex-col">
                    <InputField
                      label="Max User Limit"
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value as any)
                      }
                      className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                    />
                    <FieldError field={field} />
                  </div>
                )}
              </form.Field>

              <form.Field name="expiresOn">
                {(field) => (
                  <div className="flex flex-col">
                    <InputField
                      label="Expiry Date"
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                    />
                    <FieldError field={field} />
                  </div>
                )}
              </form.Field>
            </section>

            <button className="bg-primary-blue py-3 px-2 w-[50%] rounded flex place-items-center gap-2">
              <Text size="body-base-default" variant="white">
                Submit
              </Text>
              <Icon icon="iconamoon:arrow-right-2" color="#fff" fontSize={16} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
