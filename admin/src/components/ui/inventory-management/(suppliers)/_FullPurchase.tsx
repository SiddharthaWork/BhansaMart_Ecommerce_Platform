import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "../../../shared"
export const columns = [
    {
        key: "category",
        header: "Category",
        width: "150px",
    },
    {
        key: "item",
        header: "Item",
        width: "150px",
    },
    {
        key: "qty",
        header: "QTY",
        width: "100px",
    },
    {
        key: "unitPrice",
        header: "Unit Price (Rs)",
        width: "150px",
    },
    {
        key: "totalCost",
        header: "Total Cost (Rs)",
        width: "150px",
    },
    {
        key: "categoryTotal",
        header: "Category Total (Rs)",
        width: "150px",
    },
];

export const data = [
    {
        _id: "1",
        category: "Fruits",
        item: "Mango",
        qty: "5 KG",
        unitPrice: "Rs 200 / kg",
        totalCost: "Rs 1000",
        categoryTotal: "", // Only the last item in a category will have a value
    },
    {
        _id: "2",
        category: "Fruits",
        item: "Papaya",
        qty: "10 KG",
        unitPrice: "Rs 120 / kg",
        totalCost: "Rs 1200",
        categoryTotal: "",
    },
    {
        _id: "3",
        category: "Fruits",
        item: "Peach",
        qty: "2 KG",
        unitPrice: "Rs 300 / kg",
        totalCost: "Rs 600",
        categoryTotal: "Rs 2800", // Total for Fruits
    },
    {
        _id: "4",
        category: "Vegetables",
        item: "Potatoes",
        qty: "20 KG",
        unitPrice: "Rs 50 / kg",
        totalCost: "Rs 1000",
        categoryTotal: "",
    },
    {
        _id: "5",
        category: "Vegetables",
        item: "Tomatoes",
        qty: "10 KG",
        unitPrice: "Rs 40 / kg",
        totalCost: "Rs 400",
        categoryTotal: "Rs 1400", // Total for Vegetables
    },
    {
        _id: "6",
        category: "",
        item: "Sub-total",
        qty: "",
        unitPrice: "",
        totalCost: "",
        categoryTotal: "Rs 3200", // Grand total
    },
];


export const _FullPurchase = ({onClose} : {onClose : () => void}) => {
    return (
        <div className="py-4">
            <div className="flex flex-row justify-between p-4 items-end border-b-2">

                <h1 className="text-2xl flex gap-2 items-end">
                    <Icon
                        icon="mingcute:headphone-fill"
                        className="text-black w-6 h-6 md:w-7 md:h-7"
                    />
                    Detail</h1>
                    <div className="flex">
                    <Icon className="absolute top-4 right-4" icon="basil:cross-outline" width="40" height="40" onClick={onClose} />
                    </div>
            </div>
            <div className="flex justify-end w-full">
            <button className=" my-4 mx-4 border-2 border-[#2275FC] text-[#2275FC] py-2 px-4 md:px-2 rounded text-center text-sm md:text-base flex justify-between items-end gap-2">
            <Icon icon="mdi:eye-outline" width="24" height="24" />
              Invoice Photo
            </button>
            </div>
            <Table
                showAction={false}
                showSelectAll={false}
                data={data}
                columns={columns}
            />
        </div>
    )
}
