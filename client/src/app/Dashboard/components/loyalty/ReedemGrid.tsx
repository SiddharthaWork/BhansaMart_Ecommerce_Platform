import { Card, CardContent } from "@mui/material";
import { User } from "lucide-react";

const redeemItems = [
  {
    id: 1,
    title: "FREE WAI WAI FOR 500 POINTS!",
    description: "Redeem 500 points and enjoy your favorite snack for free!",
    points: 500,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "FREE WAI WAI FOR 500 POINTS!",
    description: "Redeem 500 points and enjoy your favorite snack for free!",
    points: 500,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "FREE WAI WAI FOR 500 POINTS!",
    description: "Redeem 500 points and enjoy your favorite snack for free!",
    points: 500,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "FREE WAI WAI FOR 500 POINTS!",
    description: "Redeem 500 points and enjoy your favorite snack for free!",
    points: 500,
    image: "/placeholder.svg",
  },
];

export function RedeemGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold lg:text-2xl">Redeem Points</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {redeemItems.length > 0 ? (
          redeemItems.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-lg shadow-md bg-sky-50">
              <CardContent className="p-0">
                <div className="relative h-40 md:h-48">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title || "Redeemable item"}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow top-2 right-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.points} RP</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500">
            No items available for redemption.
          </p>
        )}
      </div>
    </div>
  );
}
