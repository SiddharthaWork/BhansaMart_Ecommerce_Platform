import React from "react";
import {
  Box,
  Container,
  Link,
  Stack,
  useTheme,
  styled,
} from "@mui/material";

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  cursor: "pointer",
}));

const AboutPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      className='flex flex-col h-full gap-12'
    >
      <Container maxWidth="lg" sx={{ flex: 1, paddingTop: 3, paddingBottom: 4 }}>
        <h2 className="mt-1 ml-1 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
          About us
        </h2>

        <div className="flex flex-col gap-5 pt-5 tracking-normal md:pt-7 md:gap-6">
          <p className="md:text-[16px] ">
            Welcome to Bhansa Mart, your one-stop solution for all your grocery
            needs. We are committed to making grocery shopping easier, faster,
            and more convenient for everyone. With a vast selection of fresh
            produce, pantry staples, household essentials, and more, we aim to
            bring the market to your doorstep with just a few taps on your
            mobile device.
          </p>

          <p>
            At Bhansa Mart, we believe that grocery shopping should never be a
            hassle. Our mission is to save you time, effort, and stress by
            providing a seamless shopping experience. We're dedicated to
            offering high-quality products, unbeatable convenience, and
            exceptional service that you can rely on every day.
          </p>

          <p>
            We bring together a curated selection of products, ranging from
            locally sourced fruits and vegetables to international brands, all
            in one place. Whether you're planning a family dinner, restocking
            your pantry, or looking for a last-minute snack, we've got you
            covered. Our easy-to-use app is designed to simplify your shopping
            journey with features like personalized recommendations, quick
            reordering, and secure payment options.
          </p>
        </div>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          mt: "auto",
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms & Condition</FooterLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
