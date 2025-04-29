import { Icon } from '@iconify/react/dist/iconify.js';
import { InputField, Modal, Table, Text } from '../../../shared';
import { useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { useForm } from '@tanstack/react-form';

export const AttributeGeneral = () => {
  const [addAttribute, setAddAttribute] = useState(false);

  const ref = useOutsideClick(() => setAddAttribute(false));

  const column = [
    {
      key: 'attributeCategory',
      header: 'Attribute Category',
    },
    {
      key: 'value',
      header: 'Value',
      render: (_: any, AttributeListItems: any) => (
        <section className="flex place-items-center gap-1">
          {AttributeListItems.value.map((value: string, index: number) => (
            <span key={index} className="text-sm text-fade-black font-medium">
              {value}
              {index === AttributeListItems[index]?.value.length ? '' : ','}
            </span>
          ))}
        </section>
      ),
    },
  ];

  const form = useForm({
    defaultValues: {
      attributeCategory: '',
      value: [''],
    },
  });

  return (
    <div
      className="rounded-xl bg-white"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
          className="flex  shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer  w-[15%] "
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={28} />
          <Text variant="white" size="body-base-default">
            Add Attribute
          </Text>
        </section>
      </section>

      <div className="bg-white p-3 rounded-b-3xl">
        <Table columns={column} data={[]} showEdit showDelete />
      </div>

      {addAttribute && (
        <Modal ref={ref}>
          <form className="p-16 flex flex-col gap-10 w-[510px] h-[550px] overflow-scroll">
            <Text size="body-lg-rare">Add Attribute</Text>

            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <form.Field name="attributeCategory">
                  {(field) => (
                    <InputField
                      label="Attribute Category Name"
                      placeholder="Enter attribute category name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                    />
                  )}
                </form.Field>
              </div>

              <form.Field name="value">
                {(field) => (
                  <>
                    {field.state.value.map((_, index) => (
                      <div className="flex flex-col gap-2" key={index}>
                        <form.Field name={`value[${index}]`}>
                          {(subField) => (
                            <div className="flex place-items-center gap-2 ">
                              <InputField
                                label="Value"
                                placeholder="Enter value"
                                className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                                value={subField.state.value}
                                onBlur={subField.handleBlur}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                              />
                              <section
                                className="bg-[#FF4D4D1A] rounded p-2 flex h-[50%] place-items-center  place-self-end "
                                onClick={() => {
                                  const newValue = [...field.state.value];
                                  newValue.splice(index, 1);
                                  field.handleChange(newValue);
                                }}
                              >
                                <Icon
                                  icon="fluent:delete-24-regular"
                                  fontSize={18}
                                  color="#FF4D4D"
                                />
                              </section>
                            </div>
                          )}
                        </form.Field>
                      </div>
                    ))}
                    <button
                      className="bg-lynch-400 p-1  text-white rounded w-[25%]"
                      onClick={() => {
                        field.handleChange([...field.state.value, '']);
                      }}
                    >
                      Add More
                    </button>
                  </>
                )}
              </form.Field>
            </section>

            <button className="bg-primary-blue py-3 px-2 w-[25%] rounded flex place-items-center gap-2">
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
