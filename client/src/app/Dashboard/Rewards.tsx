import {
  Box,
  // Button,
  // Card,
  // CardContent,
  Typography
} from "@mui/material";
import React from "react";
import useFetchUserById from "../../hooks/useFetchUserById";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import Loading from "../../components/shared/Loading";

// interface Reward {
//   title: string;
//   points: string;
//   description: string;
//   image: string;
// }

// const rewards: Reward[] = [
//   {
//     title: "Snickers",
//     points: "100 point / piece",
//     description: "Redeem",
//     image: "https://via.placeholder.com/150?text=Snickers",
//   },
//   {
//     title: "Hand sanitizer",
//     points: "100 point / Kg",
//     description: "Redeem",
//     image: "https://via.placeholder.com/150?text=Sanitizer",
//   },
//   {
//     title: "Upto 50% OFF",
//     points: "100 point / Kg",
//     description: "Redeem",
//     image: "https://via.placeholder.com/150?text=50%+OFF",
//   },
// ];

const Rewards: React.FC = () => {
  const { data: user, isLoading } = useFetchUserById();

  const handleCopy = (referralCode?: string) => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      toast.success("Referral code copied to clipboard!"); // Optional: Show a confirmation message
    }
  };

  return (
    <Box sx={{ padding: "24px" }}>
      {isLoading && (
        <Loading />
      )}
      <h2 className="mt-1 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
        Refer and Earned
      </h2>
      <p className="mt-8 text-xl font-medium text-center md:text-2xl lg:text-3xl">
        You have <span className="text-[#2275FC]">{user?.getUser?.loyaltyPoints} Loyalty Points</span>
      </p>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 1084, mt: 1 }}
        textAlign="center"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </Typography>

      {/* <div className='grid grid-cols-1 gap-4 mt-6 xl:grid-cols-3 sm:grid-cols-2'  >
        {rewards.map((reward, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "16px",
              position: "relative",
              backgroundImage: `url(${reward.image})`,
              backgroundSize: "cover",
              color: "#fff",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {reward.title}
              </Typography>
              <Typography variant="body2" mt={1}>
                {reward.points}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                margin: "16px",
                alignSelf: "flex-start",
                textTransform: "none",
              }}
            >
              {reward.description}
            </Button>
          </Card>
        ))}
      </div> */}
      <div className="flex flex-row items-center gap-6 mt-10">
        <p>Your Referral Code: <span className="text-[#4a9d4c] font-semibold">{user?.getUser?.referralCode}</span></p>
        <Icon icon="fluent:copy-24-regular" width="30" height="30" className="p-1 text-gray-600 rounded-md hover:bg-gray-200" onClick={() => handleCopy(user?.getUser?.referralCode)} />
      </div>
      <div className="flex flex-col w-full gap-10 mt-10 md:flex-row">
        <div className="md:w-[50%] w-full">
          <h2 className="text-base font-medium lg:text-xl md:text-lg">Referred By</h2>
          {user?.getUser?.referredBy ? (
            <div className="flex flex-col flex-wrap w-full px-3 py-3 mt-2 rounded-md shadow-md gap-x-4 gap-y-1">
              <p className="font-semibold">Name: <span className="font-normal">{user?.getUser?.referredBy?.name}</span></p>
              <p className="font-semibold">Email: <span className="font-normal">{user?.getUser?.referredBy?.email}</span></p>
            </div>
          ) : (
            <div>
              <p>No data available</p>
            </div>
          )}
        </div>
        <div className="md:w-[50%] w-full">
          <div>
            <h2 className="text-base font-medium lg:text-xl md:text-lg">Referred Users</h2>
            {user?.getUser?.referredUsers.length > 0 ? (
              <div className="flex flex-row flex-wrap w-full gap-3 mt-2">
                {user?.getUser?.referredUsers.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col flex-wrap w-full px-3 py-3 rounded-md shadow-md gap-x-4 gap-y-1">
                    <p className="font-semibold">Name: <span className="font-normal">{item.name}</span></p>
                    <p className="font-semibold">Email: <span className="font-normal">{item.email}</span></p>

                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>No referred users</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Box>
  );
};

export default Rewards;
