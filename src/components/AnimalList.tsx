"use client";
import MainButton from "@/components/MainButton";
import { Animal } from "@/types/animal/animal";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAnimals } from "../pages/api";
import AnimalCard from "./AnimalCard";

function AnimalsList() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimalsData = async () => {
      try {
        const animalsData = await getAnimals();
        console.log("Dados dos animais:", animalsData);
        setAnimals(animalsData);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
      }
    };

    fetchAnimalsData();
  }, []);

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
        {animals.length > 0 ? (
          <List
            sx={{
              display: "flex",
              overflowX: "auto",
              marginY: 2,
              padding: 0,
            }}
          >
            {animals.map((animal) => (
              <ListItem
                key={animal.id}
                sx={{
                  marginX: 1,
                  minWidth: 200,
                }}
              >
                <AnimalCard name={animal.name} species={animal.species} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box>
            <Typography sx={{ color: "black" }}>
              Não existem animais disponíveis
            </Typography>
            <Typography>Gostaria de cadastrar um novo animal?</Typography>
            <MainButton title="cadastrar" url="/animal" />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AnimalsList;
