export const DashboardData = () => {
  const totalOrder = {
    totalOrder: "13k",
    margin: 15.6,
    dateFilteration: "Present Month",
  };

  const totalRevenue = {
    totalRevenue: "14.67k",
    margin: 15.9,
    dateFilteration: "Present Month",
  };

  const transaction = {
    totalSales: "14.67k",
    totalCustomer: "13k",
    totalProduct: "13k",
  };
  const todayOrders = {
    orderSummary: [
      { labelData: "10 ", value: 4 },
      { labelData: "12 ", value: 10 },
      { labelData: "2 ", value: 14 },
      { labelData: "4 ", value: 18 },
      { labelData: "6 ", value: 22 },
    ],
    orderAverage: (4 + 10 + 14 + 18 + 22) / 5,
    margin: 2.45,
  };

  const newlyJoinedCustomers = {
    customerSummary: [
      { labelData: "10", value: 10 },
      { labelData: "12", value: 2 },
      { labelData: "2", value: 24 },
      { labelData: "4", value: 18 },
      { labelData: "6", value: 28 },
    ],
    joinedAverage: (4 + 10 + 14 + 18 + 22) / 5,
    margin: -2.45,
  };

  const salesOverview = {
    sales: [
      {
        labelData: "Groceries",
        value: 1840,
      },
      {
        labelData: "Gifting",
        value: 1840,
      },
      {
        labelData: "Beauty",
        value: 1840,
      },
      {
        labelData: "Kids",
        value: 1840,
      },
    ],
    totalSales: 1840 + 1840 + 1840 + 1840,
  };

  const recentTransactionDetails = [
    {
      _id: "asdfas25",
      transactionId: "T-17955",
      orderId: "o-19856",
      orderDate: "2024-1-5",
      totalAmount: 25.5,
    },
    {
      _id: "asdfas22",
      transactionId: "T-17952",
      orderId: "o-19836",
      orderDate: "2024-1-4",
      totalAmount: 20.5,
    },
    {
      _id: "asdfas21",
      transactionId: "T-17953",
      orderId: "o-19851",
      orderDate: "2024-1-10",
      totalAmount: 35.5,
    },
  ];

  const weeklySales = {
    totalSales: 140,
    sales: [
      { labelData: "S", value: 10 },
      { labelData: "M", value: 2 },
      { labelData: "T", value: 24 },
      { labelData: "W", value: 18 },
      { labelData: "T", value: 28 },
      { labelData: "F", value: 28 },
      { labelData: "S", value: 28 },
    ],
    totalProfit: 50,
  };

  const topSellingProduct = [
    {
      image: "/chocolate.png",
      title: "Amul Dark Chocolate",
      sold: 208,
      quantity: 10,
    },
    {
      image: "/public/waiwai.png",
      title: "Wai Wai Noodles",
      sold: 150,
      quantity: 5,
    },
  ];

  const newOrderDetails = [
    {
      _id: "sdfa",
      orderId: "O-19870",
      customerName: "Erin Press",
      orderDate: "2024-1-20",
      totalAmount: 25.25,
      totalItems: 4,
      deliveryDate: "2024-1-22",
    },
    {
      _id: "safsd",
      orderId: "O-1985",
      customerName: "Ram Press",
      orderDate: "2024-1-20",
      totalAmount: 25.25,
      totalItems: 4,
      deliveryDate: "2024-1-22",
    },
  ];

  const topCustomerDataDetails = [
    {
      _id: "randslls",
      user: {
        name: "Ram Thapa",
        image: "/user.png",
        totalPurchase: 15,
      },
      totalAmount: 2150,
      loyaltyPoints: 550,
    },
    {
      _id: "randsllssx5",
      user: {
        name: "Hari Karki",
        image: "/user.png",
        totalPurchase: 10,
      },
      totalAmount: 1500,
      loyaltyPoints: 250,
    },
  ];

  const topDriverDetails = [
    {
      _id: "rasd",
      user: {
        name: "Driver 1",
        image: "/user.png",
        itemDelivered: 15,
        phoneNumber: "9852226655",
        status: "Active",
      },
      totalAmount: 15000,
    },
    {
      _id: "rasdsss",
      user: {
        name: "Driver 2",
        image: "/user.png",
        itemDelivered: 15,
        phoneNumber: "9852226612",
        status: "Idle",
      },
      totalAmount: 15000,
    },

    {
      _id: "rasdssscsdws",
      user: {
        name: "Driver 3",
        image: "/user.png",
        itemDelivered: 15,
        phoneNumber: "9852226610",
        status: "Unavailble",
      },
      totalAmount: 15000,
    },
  ];

  return {
    totalOrder,
    totalRevenue,
    transaction,
    todayOrders,
    newlyJoinedCustomers,
    salesOverview,
    recentTransactionDetails,
    weeklySales,
    topSellingProduct,
    newOrderDetails,
    topCustomerDataDetails,
    topDriverDetails,
  };
};
