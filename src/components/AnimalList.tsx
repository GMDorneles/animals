"use client";
import React, { useEffect, useState } from "react";
import { getAnimals } from "../api/index";
import { Animal } from "@/types/animal/animal";
import {
  List,
  Box,
  Container,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MainButton from "@/components/Button";

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
          <List>
            {animals.map((animal) => (
              <ListItem key={animal.id}>
                <ListItemText
                  primary={animal.name}
                  primaryTypographyProps={{ style: { color: "black" } }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box>
            <Typography sx={{ color: "black" }}>
              Não existem animais disponíveis
            </Typography>
            <Typography>Gostaria de cadastrar um novo animal?</Typography>
            <MainButton title="cadastrar" />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AnimalsList;
