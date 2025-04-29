import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Plus } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const PaymentSettings: React.FC = () => {
  const [expandedCards, setExpandedCards] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleExpandClick = (walletId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [walletId]: !prev[walletId],
    }));
  };

  const walletOptions: WalletOption[] = [
    {
      id: "esewa",
      name: "Esewa",
      description: "Link Your esewa ID",
      icon: "E",
    },
    {
      id: "khalti",
      name: "Khalti",
      description: "Link Your khalti ID",
      icon: "K",
    },
  ];

  return (
    <Box className="max-w-xl p-8 m-0">
      <Typography className="mb-6 text-2xl font-semibold">
        Payment settings
      </Typography>

      <Card className="p-4 mb-6">
        <Typography className="mb-4 text-xl font-semibold">Cards</Typography>
        <List className="p-0">
          <ListItem>
            <ListItemIcon>
              <Plus />
            </ListItemIcon>
            <ListItemText primary="Add Debit or Credit cards" />
            <Button variant="outlined" size="small">
              Add
            </Button>
          </ListItem>
        </List>
      </Card>

      <Card className="p-4 mb-6">
        <Typography className="mb-4 text-xl font-semibold">Wallets</Typography>
        <List className="p-0">
          {walletOptions.map((wallet, index) => (
            <React.Fragment key={wallet.id}>
              {index > 0 && <Divider />}
              <Card>
                <ListItem
                  className="cursor-pointer"
                  onClick={() => handleExpandClick(wallet.id)}
                >
                  <ListItemIcon>
                    <Box
                      className={`w-10 h-10 rounded flex items-center justify-center text-white ${wallet.id === "esewa" ? "bg-green-500" : "bg-purple-700"
                        }`}
                    >
                      {wallet.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={wallet.name}
                    secondary={wallet.description}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle link button click
                    }}
                  >
                    Link
                  </Button>
                </ListItem>
                <Collapse
                  in={expandedCards[wallet.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent
                    onClick={(e) => e.stopPropagation()}
                    className="p-4"
                  >
                    <TextField
                      className="w-full mb-4"
                      name="phone"
                      label="Your phone number"
                      size="small"
                    />
                    <p className="mb-4 text-sm">
                      If you don't have a {wallet.name} wallet, it will be
                      created.
                    </p>
                    <Button variant="outlined">Link Wallet</Button>
                  </CardContent>
                </Collapse>
              </Card>
            </React.Fragment>
          ))}
        </List>
      </Card>

      <Card className="p-4">
        <Typography className="mb-4 text-xl font-semibold">
          Netbanking
        </Typography>
        <List className="p-0">
          <ListItem>
            <ListItemIcon>
              <Plus />
            </ListItemIcon>
            <ListItemText primary="Netbanking" />
            <Button variant="outlined" size="small">
              Add
            </Button>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default PaymentSettings;
