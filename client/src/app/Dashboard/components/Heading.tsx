import { Typography } from "@mui/material";
import React from "react";
interface HeadingType {
  text: string;
}
const Heading: React.FC<HeadingType> = ({ text }) => {
  return (
    <Typography variant="h2" fontWeight='bold' fontSize={{ xs: "1.2rem", md: "1.5rem" }}>
      {text}
    </Typography>
  );
};

export default Heading;
