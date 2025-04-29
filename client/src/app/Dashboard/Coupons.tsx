import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AvailableCouponCard from "./components/AvailableCouponCard";
import { useGetCouponsQuery } from "../../redux/api/graphqlBaseApi";
import useFetchUserById from "../../hooks/useFetchUserById";
import CollectedCouponCard from "./components/CollectedCouponCard";
import Loading from "../../components/shared/Loading";

export interface Coupon {
  _id: string;
  couponCode: string;
  couponType: string;
  value: number;
  minPurchase: number;
  maxUsage: number;
  perUserLimit: number;
  expiresOn: string;
  status: "active" | "used" | "expired";
}

const CouponTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useGetCouponsQuery(undefined);
  const { data: user } = useFetchUserById();

  console.log(user);

  const collectedCoupons = user?.getUser?.collectedCoupons;
  const collectedCouponIds = new Set(
    collectedCoupons?.map((coupon: any) => coupon._id)
  );

  const usedCoupons = user?.getUser?.usedCoupons;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const availableCoupons = data?.getCoupons?.filter(
    (coupon: Coupon) =>
      coupon.status === "active" && !collectedCouponIds.has(coupon._id)
  );

  return (
    <Box sx={{ padding: "16px" }}>
      {isLoading && <Loading />}
      <h2 className="mt-3 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
        Collected Coupons
      </h2>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="coupon tabs"
        sx={{
          marginBottom: "16px",
          marginTop: "15px",
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab
          label="Available"
          sx={{
            border: "1px solid",
            borderColor: activeTab === 0 ? "#4CAF50" : "#BDBDBD",
            color: activeTab === 0 ? "#4CAF50 !important" : "#757575",
            backgroundColor: activeTab === 0 ? "#f3fff4" : "transparent",
            borderRadius: "10px",
            padding: "5px 15px",
            textTransform: "none",
            fontWeight: "bold",
            marginRight: "10px",
            minWidth: "auto",
            minHeight: "40px",
            height: "40px",
          }}
        />
        <Tab
          label="Collected"
          sx={{
            border: "1px solid",
            borderColor: activeTab === 1 ? "#4CAF50" : "#BDBDBD",
            color: activeTab === 1 ? "#4CAF50 !important" : "#757575",
            backgroundColor: activeTab === 1 ? "#f3fff4" : "transparent",
            borderRadius: "10px",
            padding: "5px 15px",
            textTransform: "none",
            fontWeight: "bold",
            marginRight: "10px",
            minWidth: "auto",
            minHeight: "40px",
            height: "40px",
          }}
        />
        <Tab
          label="Used"
          sx={{
            border: "1px solid",
            borderColor: activeTab === 2 ? "#4CAF50" : "#BDBDBD",
            color: activeTab === 2 ? "#4CAF50 !important" : "#757575",
            backgroundColor: activeTab === 2 ? "#f3fff4" : "transparent",
            borderRadius: "10px",
            padding: "5px 15px",
            textTransform: "none",
            fontWeight: "bold",
            marginRight: "10px",
            minWidth: "auto",
            minHeight: "40px",
            height: "40px",
          }}
        />
      </Tabs>
      {isLoading && (
        <div>
          <Loading />
          {/* <p>Loading Coupons</p> */}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {activeTab === 0 ? (
          availableCoupons && availableCoupons.length > 0 ? (
            availableCoupons.map((coupon: Coupon) => (
              <AvailableCouponCard key={coupon._id} {...coupon} />
            ))
          ) : (
            <p>No available coupons.</p>
          )
        ) : activeTab === 1 ? (
          collectedCoupons && collectedCoupons.length > 0 ? (
            collectedCoupons.map((coupon: Coupon) => (
              <CollectedCouponCard key={coupon._id} {...coupon} />
            ))
          ) : (
            <p>No coupons collected.</p>
          )
        ) : usedCoupons && usedCoupons.length > 0 ? (
          usedCoupons.map((coupon: Coupon) => (
            <CollectedCouponCard
              key={coupon._id}
              {...coupon}
              buttonDisable={true}
            />
          ))
        ) : (
          <p>No coupons used.</p>
        )}
      </div>
    </Box>
  );
};

export default CouponTabs;
