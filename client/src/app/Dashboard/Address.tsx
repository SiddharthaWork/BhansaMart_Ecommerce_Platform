import { Button, Card, CardContent } from "@mui/material";
import { Home, Plus, Share } from "lucide-react";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  // const [addAddress, setAddAddress] = useState<boolean>(false);

  const navigate = useNavigate();

  // const handleClick = () => {
  //   setAddAddress(true);
  // };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
          Address Book
        </h2>
        <Button
          sx={{
            backgroundColor: "#539818",
            color: "white",
            textTransform: "none",
          }}
          className="gap-2"
          onClick={() => {
            navigate("../add-address");
          }}
        >
          <Plus className="w-4 h-4" />
          Add new Address
        </Button>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">Your saved addresses</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <Card key={index}>
            <CardContent className="flex items-start justify-between">
              <div className="flex gap-3">
                <Home className="w-5 h-5 mt-1 text-green-600" />
                <div>
                  <h3 className="font-medium">Home</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Floor 5, Building name, land mark, Baneshwor, Kathmandu
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Phone no: 9856666666
                  </p>
                </div>
              </div>
              <Button>
                <Share className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Address;
