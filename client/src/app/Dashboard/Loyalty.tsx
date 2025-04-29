import { OfferDetails } from "./components/loyalty/OfferDetails";
import { PointsCard } from "./components/loyalty/PointsCard";
import { RedeemGrid } from "./components/loyalty/ReedemGrid";

export default function LoyaltyPage() {
  return (
    <div className="container p-6 mx-auto space-y-8">
      <h2 className="mt-1 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
        Loyalty</h2>
      <PointsCard />
      <RedeemGrid />
      <OfferDetails />
    </div>
  );
}
