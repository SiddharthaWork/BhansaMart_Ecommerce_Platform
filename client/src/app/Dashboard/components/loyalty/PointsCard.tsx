import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, CardContent, LinearProgress } from "@mui/material";
import { ArrowRight } from "lucide-react";
// import { useGetUserQuery } from "../../../../redux/api/graphqlBaseApi";
import useFetchUserById from "../../../../hooks/useFetchUserById";
import Loading from "../../../../components/shared/Loading";

export function PointsCard() {

  // const userString = localStorage.getItem("user");
  // const userData = userString ? JSON.parse(userString) : null;
  // const userId = userData?._id;

  const { data: user, isLoading } = useFetchUserById();

  const loyaltyPoint = user?.getUser?.loyaltyPoints || "0"

  return (
    <Card className="w-full max-w-3xl">
      {isLoading && (
        <Loading />
      )}
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="md:text-lg text-base font-medium text-[#2275FC]">Your Points</h2>
          <div className="flex items-center justify-center bg-[#2275FC] rounded-full size-10">
            <Icon
              icon="simple-line-icons:badge"
              width="24"
              height="24"
              className="text-white"
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold lg:text-4xl md:text-3xl">{loyaltyPoint}</h3>
          <LinearProgress
            sx={{ color: "#2275FC" }}
            variant="determinate"
            value={70}
            className="h-2"
          />
          <p className="text-[13px] md:text-sm text-muted-foreground">
            Earn points on every purchase
          </p>
        </div>
        <Button
          sx={{ textTransform: "none", marginLeft: "-5px", fontWeight: "bold" }}
          className="h-auto p-0 font-bold text-[#2275FC] "
        >
          View points history
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
