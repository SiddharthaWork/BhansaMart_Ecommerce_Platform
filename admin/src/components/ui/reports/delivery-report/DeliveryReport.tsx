import { ProductManagementBasicSetup } from "../../../../constants";
import { TitleBreadCrumb } from "../../../shared/Title-Breadcrumb";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownField, Text } from "../../../shared";
import {DeliverySummary} from "./_DeliverySummary";
import {DelTime} from "./_DelTime";
export const DeliveryReport = () => {

  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("summary");
  
  const handleTabChange = useCallback((value: string) => {
    setTab(value)
  }, [])

  const tabOptions = [
    {
      label: 'Delivery Summary', 
      value: 'summary',
      icon: 'iconamoon:delivery-fast-bold',
    },
    {
      label: 'Delivery Time Analysis',
      value: 'analysis',
      icon: 'mingcute:time-line',
    },
  ]

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">

      <TitleBreadCrumb
        breadcrumbData={ProductManagementBasicSetup().productListbreadcrumbData}
        title="Delivery Report"
      />
     
        
     <section className="flex justify-end items-center ">
        <DropdownField
          label=""
          className="border border-grey-200 p-[10px] rounded outline-none "
        />
      </section>


      <section className="bg-white rounded-lg shadow-sm " id="table-search">

      <DynamicTabs tabOptions={tabOptions} value={tab} handleTabChange={handleTabChange} />
      {tab === "summary" && (
        <DeliverySummary/>
      )} 
      {tab === "analysis" && (
        <DelTime/>
      )} 
     
      </section>



    </div>
  )
}


export const DynamicTabs = ({
  tabOptions,
  value,
  handleTabChange,
}: {
  tabOptions?: any
  value?: any
  handleTabChange?: any
}) => {

  return (
    <section className="flex place-items-center  gap-6 border border-grey-cadet-blue bg-white  ">
      {tabOptions?.map((tab: any, idx: number) => {
        return (
                <div
            onClick={() => handleTabChange(tab.value)}
            key={idx}
            className={`flex items-center cursor-pointer  p-4 gap-2  ${
              tab.value === value ? 'border-blue-500 border-b-2' : 'border-none'
            }`}
          >
            <Icon
              fontSize={25}
              icon={tab.icon}
              color={`${tab.value == value ? '#2275FC' : '#454545'}`}
            />
            <Text size="body-sm-lg" variant={`${tab.value == value ? 'primary-blue' : 'grey-600'}`}>
              {tab.label}
            </Text>
          </div>
        )
      })}
    </section>
  )
}
