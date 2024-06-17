"use client";
import AnimalForm from "@/components/form";
import { Box, Container } from "@mui/material";

export default function animal() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#F1F1F1",
        zIndex: -1,
        minHeight: "100vh",
      }}
    >
      <Box>
        <AnimalForm />
      </Box>
    </Container>
  );
}
