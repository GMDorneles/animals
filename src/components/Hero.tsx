import { Box } from "@mui/material";
import Image from "next/image";
import MainButton from "./MainButton";

export function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: { xs: "30vh", sm: "40vh", md: "70vh" },
        width: "100%",
        zIndex: 1,
      }}
    >
      <Image
        src="/img/cat_bg.webp"
        alt="Hero cover"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{ zIndex: -1, filter: "blur(5px)" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MainButton title="Divulgar animal" url="/animal" />
      </Box>
    </Box>
  );
}
