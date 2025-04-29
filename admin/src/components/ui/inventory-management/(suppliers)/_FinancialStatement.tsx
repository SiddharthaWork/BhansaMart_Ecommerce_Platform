import { Table } from "../../../shared";

const columns = [
    {
        key: "purchaseDate",
        header: "Purchase Date",
        width: "150px",
    },
    {
        key: "description",
        header: "Description",
        width: "200px",
    },
    {
        key: "debit",
        header: "Debit ( DR )",
        width: "150px",
    },
    {
        key: "credit",
        header: "Credit ( CR )",
        width: "150px",
    },
    {
        key: "balance",
        header: "Balance",
        width: "150px",
    }
];

const data = [
    {
        _id: "1",
        purchaseDate: "2024-11-01",
        description: "Opening Balance",
        debit: "",
        credit: "",
        balance: "Rs.15,000"
    },
    {
        _id: "2",
        purchaseDate: "2024-11-01",
        description: "Order #12345",
        debit: "Rs.65,000",
        credit: "",
        balance: "Rs.25,000"
    },
    {
        _id: "3",
        purchaseDate: "2024-11-01",
        description: "Payment Received",
        debit: "",
        credit: "Rs.100000",
        balance: "Rs.20,000"
    },
    {
        _id: "4",
        purchaseDate: "2024-11-01",
        description: "Closing Balance",
        debit: "",
        credit: "",
        balance: "Rs.20,000"
    }
];

export const _FinancialStatement = () => {
    return (
        <div>
            <Table
                showAction={false}
                showView={true}
                data={data}
                columns={columns}
            />
        </div>
    );
};

