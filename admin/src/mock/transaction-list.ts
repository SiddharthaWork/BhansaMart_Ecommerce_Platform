export interface TransactionType {
  _id: string;
  transactionId: string;
  orderId: string;
  customername: string;
  customerId: string;
  profileImg: string;
  orderDate: string;
  totalAmount: string;
  paymentMethod: 'cash' | 'digital';
  paymentProof?: string;
  status: 'pending' | 'completed' | 'success';
}

export const transactionList: TransactionType[] = [
  {
    _id: "random1",
    transactionId: "T-1987",
    orderId: "0-1987",
    customername: "John Doe",
    customerId: "ID-8767567",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/10",
    totalAmount: "500",
    paymentMethod: "cash",
    status: "pending",
  },
  {
    _id: "random2",
    transactionId: "T-1988",
    orderId: "0-1988",
    customername: "Jane Smith",
    customerId: "ID-8767568",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/11",
    totalAmount: "600",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",
    status: "completed",
  },
  {
    _id: "random3",
    transactionId: "T-1989",
    orderId: "0-1989",
    customername: "Alice Johnson",
    customerId: "ID-8767569",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/12",
    totalAmount: "750",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "success",
  },
  {
    _id: "random4",
    transactionId: "T-1990",
    orderId: "0-1990",
    customername: "Michael Brown",
    customerId: "ID-8767570",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/13",
    totalAmount: "400",
    paymentMethod: "cash",
    status: "pending",
  },
  {
    _id: "random5",
    transactionId: "T-1991",
    orderId: "0-1991",
    customername: "Emily Davis",
    customerId: "ID-8767571",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/14",
    totalAmount: "300",
    paymentMethod: "cash",
    status: "completed",
  },
  {
    _id: "random6",
    transactionId: "T-1992",
    orderId: "0-1992",
    customername: "David Wilson",
    customerId: "ID-8767572",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/15",
    totalAmount: "850",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "success",
  },
  {
    _id: "random7",
    transactionId: "T-1993",
    orderId: "0-1993",
    customername: "Sarah Moore",
    customerId: "ID-8767573",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/16",
    totalAmount: "200",
    paymentMethod: "cash",
    status: "pending",
  },
  {
    _id: "random8",
    transactionId: "T-1994",
    orderId: "0-1994",
    customername: "Christopher Lee",
    customerId: "ID-8767574",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/17",
    totalAmount: "900",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "completed",
  },
  {
    _id: "random9",
    transactionId: "T-1995",
    orderId: "0-1995",
    customername: "Jessica Taylor",
    customerId: "ID-8767575",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/18",
    totalAmount: "1200",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",
    status: "success",
  },
  {
    _id: "random10",
    transactionId: "T-1996",
    orderId: "0-1996",
    customername: "Joshua Harris",
    customerId: "ID-8767576",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/19",
    totalAmount: "1100",
    paymentMethod: "cash",
    status: "pending",
  },
];

export const pendingTransactionList: TransactionType[] = [
  {
    _id: "random1",
    transactionId: "T-1987",
    orderId: "0-1987",
    customername: "John Doe",
    customerId: "ID-8767567",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/10",
    totalAmount: "500",
    paymentMethod: "cash",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random2",
    transactionId: "T-1988",
    orderId: "0-1988",
    customername: "Jane Smith",
    customerId: "ID-8767568",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/11",
    totalAmount: "600",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",
    status: "pending",
  },
  {
    _id: "random3",
    transactionId: "T-1989",
    orderId: "0-1989",
    customername: "Alice Johnson",
    customerId: "ID-8767569",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/12",
    totalAmount: "750",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random4",
    transactionId: "T-1990",
    orderId: "0-1990",
    customername: "Michael Brown",
    customerId: "ID-8767570",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/13",
    totalAmount: "400",
    paymentMethod: "cash",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random5",
    transactionId: "T-1991",
    orderId: "0-1991",
    customername: "Emily Davis",
    customerId: "ID-8767571",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/14",
    totalAmount: "300",
    paymentMethod: "cash",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random6",
    transactionId: "T-1992",
    orderId: "0-1992",
    customername: "David Wilson",
    customerId: "ID-8767572",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/15",
    totalAmount: "850",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random7",
    transactionId: "T-1993",
    orderId: "0-1993",
    customername: "Sarah Moore",
    customerId: "ID-8767573",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/16",
    totalAmount: "200",
    paymentMethod: "cash",
    status: "pending",
  },
  {
    _id: "random8",
    transactionId: "T-1994",
    orderId: "0-1994",
    customername: "Christopher Lee",
    customerId: "ID-8767574",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/17",
    totalAmount: "900",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    status: "pending",
  },
  {
    _id: "random9",
    transactionId: "T-1995",
    orderId: "0-1995",
    customername: "Jessica Taylor",
    customerId: "ID-8767575",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/18",
    totalAmount: "1200",
    paymentMethod: "digital",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",
    status: "pending",
  },
  {
    _id: "random10",
    transactionId: "T-1996",
    orderId: "0-1996",
    customername: "Joshua Harris",
    customerId: "ID-8767576",
    profileImg:
      "https://res.cloudinary.com/dolqldkim/image/upload/v1737456785/uploads/uploads/profile-1737456782502-edward-cisneros-_H6wpor9mjs-unsplash.jpg.jpg",
    orderDate: "2024/01/19",
    totalAmount: "1100",
    paymentProof: "https://i.ibb.co/NWvp4Vv/screenshot.png",

    paymentMethod: "cash",
    status: "pending",
  },
];
