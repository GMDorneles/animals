import { Button, Typography } from "@mui/material";
import Link from "next/link";

interface ButtonProps {
  title: string;
  url: string;
}
export default function MainButton(props: ButtonProps) {
  return (
    <Link href={props.url}>
      <Button
        aria-label="Quero adotar um animal"
        variant="contained"
        sx={{
          backgroundColor: "#FF8500",
          padding: { md: "8px 18px", lg: "12px 24px" },
          color: "#FF8500",
          borderColor: "#FF8500",
          "&:hover": {
            color: "#FF8500",
            borderColor: "#FF8500",
            backgroundColor: "white",
          },
        }}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"1rem"}
          sx={{ color: "white", "&:hover": { color: "#FF8500" } }}
        >
          {props.title}
        </Typography>
      </Button>
    </Link>
  );
}
