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
          padding: "12px 24px",
          backgroundColor: "#FF8500",
          "&:hover": {
            backgroundColor: "#db790f",
          },
        }}
      >
        <Typography fontWeight={"bold"} fontSize={"1rem"}>
          {props.title}
        </Typography>
      </Button>
    </Link>
  );
}
