import { Table } from '@/components/shared'
import { Icon } from '@iconify/react/dist/iconify.js'

const columns = [
    {
        key: "orderId",
        header: "Order ID",
        width: "150px",
    },
    {
        key: "amount",
        header: "Amount (Rs)",
        width: "150px",
    },
    {
        key: "status",
        header: "Status",
        width: "150px",
        render: (_: any, OrdersListItem: any) => (
            <div
                className={`p-2 w-fit rounded-lg text-center bg-red-400 ${OrdersListItem.status === "success"
                        ? "bg-fade-green text-parrot rounded"
                        : OrdersListItem.status === "pending"
                            ? "bg-grey-extra rounded text-grey-400"
                            : "bg-fade-orange rounded text-orange "
                    }`}
            >
                {OrdersListItem.status}
            </div>
        ),
    },
];

const data = [
    {
        orderId: "O-98765",
        amount: 8000,
        status: "Success",
        _id: "1",
    },
    {
        orderId: "O-70912",
        amount: 5000,
        status: "Success",
        _id: "2",
    },
    {
        orderId: "O-23987",
        amount: 500,
        status: "Pending",
        _id: "3",

    },
];


const _SettleView = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="py-4 p-6">
            <div className="flex flex-row justify-between p-4 items-end ">

                <h1 className="text-2xl flex gap-2 items-end font-semibold">
                    Settlement Details</h1>
                <div className="flex w-fit h-full justify-end items-end bg-black">
                    <Icon className="absolute top-4 right-4" icon="basil:cross-outline" width="40" height="40" onClick={onClose} />
                </div>
            </div>
            <div className='flex flex-col p-6 gap-4'>
                <div className="flex place-items-center gap-2">
                    <img
                        src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995e13_66236537d4f46682e079b6ce_Casual%2520Portrait.webp"
                        className="w-12 h-12 rounded-full"
                        alt="Customer"
                    />
                    <section className="flex flex-col">
                        <span className="text-fade-black text-base">Customer</span>
                        <span className="text-lynch-400 text-base">ID: 1000</span>
                    </section>
                </div>
                <div className='-p-2 border-b'>
                    <Table
                        showAction={false}
                        showSelectAll={false}
                        data={data}
                        columns={columns}
                    />
                </div>

                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="cash-collected" className="font-medium">
                                Cash Collected:
                            </label>
                            <span className="text-gray-500">Rs. 8000</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="cash-handedover" className="font-medium">
                                Cash Handedover:
                            </label>
                            <span className="text-gray-500">Rs. 7500</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default _SettleView