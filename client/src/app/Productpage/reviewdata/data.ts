import image from "/images/review.png";

type Review = {
    id: number;
    userName: string;
    userImage: string;
    rating: number; // out of 5
    date: string;
    reviewText: string;
};

const reviews: Review[] = [
    {
        id: 1,
        userName: "Alice Johnson",
        userImage: image,
        rating: 4,
        date: "2024-02-03",
        reviewText: "Great experience! The UI is clean and easy to use.",
    },
    {
        id: 2,
        userName: "Michael Smith",
        userImage: image,
        rating: 5,
        date: "2024-02-01",
        reviewText: "Absolutely love it! Highly recommend to everyone.",
    },
    {
        id: 3,
        userName: "Sophia Martinez",
        userImage: image,
        rating: 3,
        date: "2024-01-30",
        reviewText: "Good overall, but could use some improvements in speed.",
    },
    {
        id: 4,
        userName: "Daniel Brown",
        userImage: image,
        rating: 4,
        date: "2024-01-28",
        reviewText: "Nice features and smooth performance.",
    },
    {
        id: 5,
        userName: "Emily Wilson",
        userImage: image,
        rating: 2,
        date: "2024-01-25",
        reviewText: "Had some issues with loading times. Needs improvement.",
    },
    {
        id: 6,
        userName: "James Anderson",
        userImage: image,
        rating: 4.2,
        date: "2024-01-23",
        reviewText: "Well designed and easy to navigate.",
    },
    {
        id: 7,
        userName: "Olivia Taylor",
        userImage: image,
        rating: 3,
        date: "2024-01-20",
        reviewText: "Decent, but I expected better functionality.",
    },
    {
        id: 8,
        userName: "William Lee",
        userImage: image,
        rating: 5,
        date: "2024-01-18",
        reviewText: "Best service ever! Exceeded my expectations.",
    },
    {
        id: 9,
        userName: "Emma Harris",
        userImage: image,
        rating: 3,
        date: "2024-01-15",
        reviewText: "A good start, but needs some refinements.",
    },
    {
        id: 10,
        userName: "Benjamin Thomas",
        userImage: image,
        rating: 4,
        date: "2024-01-12",
        reviewText: "Very polished and professional experience.",
    },
    {
        id: 11,
        userName: "Charlotte Walker",
        userImage: image,
        rating: 2,
        date: "2024-01-10",
        reviewText: "Not bad, but I faced some technical issues.",
    },
    {
        id: 12,
        userName: "Lucas Hall",
        userImage: image,
        rating: 3,
        date: "2024-01-08",
        reviewText: "Works well, but could use more customization options.",
    },
    {
        id: 13,
        userName: "Amelia Scott",
        userImage: image,
        rating: 5,
        date: "2024-01-05",
        reviewText: "Exceptional! Would use it again.",
    },
    {
        id: 14,
        userName: "Henry Green",
        userImage: image,
        rating: 4,
        date: "2024-01-02",
        reviewText: "Great quality and support. Impressed!",
    },
    {
        id: 15,
        userName: "Isabella Adams",
        userImage: image,
        rating: 3,
        date: "2023-12-30",
        reviewText: "An average experience. Needs more features.",
    },
];

export default reviews;
