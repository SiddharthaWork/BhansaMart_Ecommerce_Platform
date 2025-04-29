import {
    Gift,
    Heart,
    HelpCircle,
    Info,
    LogOut,
    MapPin,
    Share2,
    ShoppingBag,
    User,
    Star
    // Wallet,
} from "lucide-react";
export const sidebarData = {
  "YOUR INFORMATION": [
    { icon: User, label: "My Profile", path: "/dashboard" },
    { icon: ShoppingBag, label: "Your orders", path: "/dashboard/orders" },
    { icon: MapPin, label: "Address Book", path: "/dashboard/address" },
    { icon:Star, label: "My Reviews", path: "/dashboard/reviews"},
  ],
  "PAYMENTS AND COUPONS": [
    { icon: Heart, label: "Loyalty", path: "/dashboard/loyalty" },
    { icon: Gift, label: "Collected coupon", path: "/dashboard/coupons" },
    { icon: Share2, label: "Refer and Earned", path: "/dashboard/referral" },
    // { icon: Wallet, label: "Payment Settings", path: "/dashboard/payment" },
  ],
  "OTHER INFORMATION": [
    { icon: Share2, label: "Share the app", path: "https://play.google.com/store/apps/details?id=com.webstudionepal.nidistudent&hl=en" },
    { icon: HelpCircle, label: "Help and support", path: "/dashboard/support" },
    { icon: Info, label: "About us", path: "/dashboard/about" },
    { icon: LogOut, label: "Logout", path: "/" },
  ],
};
