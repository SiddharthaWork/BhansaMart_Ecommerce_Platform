import React, { useState } from 'react'
import { FilterOptions } from '@/constants'
import { HeaderOptions, Modal, TableSearchHeader, TitleBreadCrumb } from '@/components/shared'
import { FrontendRoutes } from '@/constants';
import { useOutsideClick } from '@/hooks/UseOutsideClick';
import { AddExpenses } from '../../Finance-Expenses/_AddExpenses';

const productListbreadcrumbData = [
    {
        label: "Dashboard",
        path: FrontendRoutes.HOME,
    },
    {
        label: "Delivery Management",
        path: "#",
    },
    {
        label: "Live Overview",
        path: FrontendRoutes.DELIVERY_LIVE_OVERVIEW,
    },
];

const LiveOverview = () => {
    const [_setpoints, _setaddpoints] = useState(false);
    const [_removepoints, _setremovepoints] = useState(false);
    const _assignRef = useOutsideClick(() => _setaddpoints(false));
    const _removeRef = useOutsideClick(() => _setremovepoints(false));
    const osmUrl = "https://www.openstreetmap.org/export/embed.html?bbox=85.2074%2C27.6532%2C85.3481%2C27.7306&layer=mapnik";
    return (
        <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
            <TitleBreadCrumb
                breadcrumbData={productListbreadcrumbData}
                title="Live Overview"
            />

            <HeaderOptions
                filterOptions={FilterOptions}
                filterTitle="Sort By"
                secondButtonIcon="ic:baseline-plus"
                secondButtonTitle="Add Expenses"
                secondButtonBGColor="primary-blue"
                onSecondButtonOnClick={() => _setaddpoints(true)}
                canDownload
                canExportCSV
            />

            <section className="bg-white rounded-lg shadow-sm" id="table-search">
                <TableSearchHeader showfilter={false} showDate={true} />
                <div className='w-full md:h-[40rem] h-full md:p-8 p-4 rounded-lg'>
                    <iframe
                        src={osmUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>

            </section>

            {_setpoints &&
                (<Modal ref={_assignRef} classname="w-[30%]" >
                    <AddExpenses onclose={() => _setaddpoints(false)} />
                </Modal>
                )}
            {_removepoints && (
                <Modal ref={_removeRef}>
                    <div></div>
                </Modal>
            )}





        </div>
    )
}

export default LiveOverview