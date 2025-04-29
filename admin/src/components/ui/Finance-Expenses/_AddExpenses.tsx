import { AreaField, InputField, Text } from '@/components/shared';
import { useCreateExpense } from '@/server-action/api/expense';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Field, useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';
import {z} from 'zod';
import { FieldApi } from '@tanstack/react-form';
import { incomeSchema } from '@/(___types)/financeandexpenses/_type-addexpenses';


export const AddExpenses = ({ onclose }: { onclose: () => void }) => {
  const { mutateAsync: createExpense } = useCreateExpense();

  const form = useForm({
    defaultValues: {
      expenseCategory: '',
      date: '',
      description: '',
      amount: 0,
    },
    validators: {
      onChange: incomeSchema as any 
    },
    onSubmit: async ({ value }) => {
      const res = await createExpense(value);
      if (res.data) {
        toast.success(res?.data?.message);
      }
    },
  });

  const FieldError = ({field} : {field: FieldApi<any, any>}) => {
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


  return (
    <form
      className="w-full h-full p-6 flex flex-col gap-8 rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Text variant="grey" size="body-lg-lg">
        Add New Expenses
      </Text>

      <div className="flex flex-col gap-2">
        <form.Field name="date">
          {(field) => (
            <div className='flex flex-col'>
            <InputField
              label="Date"
              type="date"
              placeholder="Select Start Date"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="expenseCategory">
          {(field) => (
            <div className='flex flex-col'>
            <InputField
              label="Category"
              placeholder="Select Category"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className='flex flex-col'>
            <AreaField
              label="Description"
              placeholder="Description about the expenses"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError field={field} /> 
            </div>
          )}
        </form.Field>

        <form.Field name="amount">
          {(field) => (
            <div className='flex flex-col'>
            <InputField
            label="Amount"
              placeholder="Rs 2000000"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as any)}
            />
            <FieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <button className="items-center gap-1 w-fit py-4 px-2 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center">
        Submit
        <Icon icon="icon-park-outline:right" width="20" height="20" />
      </button>
    </form>
  );
};
