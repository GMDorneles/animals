import { Button, Typography } from "@mui/material";

interface ButtonProps {
  title: string;
}
export default function MainButton(props: ButtonProps) {
  return (
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
  );
}
