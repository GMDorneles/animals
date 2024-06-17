"use client";
import AnimalForm from "@/components/form";
import { Box, Container } from "@mui/material";

export default function animal() {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const name = params.get("name");
  const species = params.get("species");
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
        <AnimalForm id={id} name={name} species={species} />
      </Box>
    </Container>
  );
}
