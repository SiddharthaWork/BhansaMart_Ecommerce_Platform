import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { User, ShoppingCart } from "lucide-react";

export function OfferDetails() {
  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      {/* Offer Details Heading */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Offer details
      </Typography>

      {/* Offer Card */}
      <Card sx={{ overflow: "hidden", boxShadow: 2, borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          {/* Image Placeholder */}
          <Box
            sx={{
              height: 200,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="textSecondary">Image Placeholder</Typography>
          </Box>

          {/* Offer Title and Points */}
          <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                FREE WAI WAI FOR 500 POINTS!
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <User size={16} />
                <Typography variant="body2" fontWeight="medium">
                  500 RP
                </Typography>
              </Box>
            </Box>

            {/* Valid Date */}
            <Typography variant="body2" color="success.main" gutterBottom>
              Valid till: <b>Jul 04, 2025</b>
            </Typography>

            {/* Offer Description */}
            <Typography variant="body2" color="text.secondary" paragraph>
              Redeem 500 points and enjoy your favorite snack for free!
            </Typography>

            {/* Extra Description */}
            <Box
              sx={{
                padding: 1,
                border: "1px dashed #d3d3d3",
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Satisfy your cravings with Wai Wai—absolutely free! Redeem 500 points to enjoy
                this delicious snack that you love. It's our way of saying thank you for being
                a valued customer. Add it to your cart now and let us handle the rest. Don’t
                wait too long—rewards like this don’t last forever. Treat yourself today and
                make your points work for you!
              </Typography>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box sx={{ padding: 2, paddingTop: 0 }}>
            <Typography variant="body2" fontWeight="medium">
              For support, contact us at: <b>015585858</b>
            </Typography>
          </Box>

          {/* Redeem Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Redeem point
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                500.00 points
              </Typography>
            </Box>
            <Button variant="contained" endIcon={<ShoppingCart size={16} />}>
              Redeem Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
