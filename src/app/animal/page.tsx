import AnimalCard from "@/components/AnimalCard";
import { Box, Container, Typography } from "@mui/material";

export default function animal() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        padding: 0,
        backgroundColor: "white",
        zIndex: -1,
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box>
          <AnimalCard />
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
}
