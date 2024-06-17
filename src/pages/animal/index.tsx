"use client";
import AnimalForm from "@/components/form";
import { Animal } from "@/types/animal/animal";
import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function AnimalData() {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const id = params.get("id");

  const fetchAnimalData = async () => {
    try {
      console.log(id);
      const response = await fetch(`/api/animals/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar animais");
      }

      const data: Animal = await response.json();
      setAnimal(data);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAnimalData();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          backgroundColor: "#d6cdcd",
          zIndex: -1,
          minHeight: "100vh",
        }}
      >
        <Box>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d8d7d7",
        zIndex: -1,
        minHeight: "100vh",
        paddingX: { xs: 2, md: 10 },
      }}
    >
      <Box px={5}>
        <AnimalForm
          id={animal?.id || null}
          name={animal?.name || null}
          species={animal?.species || null}
          available={animal?.available || null}
        />
      </Box>
    </Container>
  );
}
