"use client";
import MainButton from "@/components/MainButton";
import { Animal } from "@/types/animal/animal";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAnimals } from "../pages/api/animals";
import AnimalCard from "./AnimalCard";

function AnimalsList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (searchTerm == " " || searchTerm == "") {
      fetchAnimalsData();
      return;
    }
    try {
      const response = await fetch(
        `/api/animals/search/?name=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar animais");
      }
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      setAnimals([]);
    }
  };
  const fetchAnimalsData = async () => {
    try {
      const animalsData = await getAnimals();
      setAnimals(animalsData);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAnimalsData();
  }, []);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        backgroundColor: "white",
        zIndex: -1,
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Backdrop
        open={loading}
        sx={{
          zIndex: 1,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        mt={6}
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar animal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ marginLeft: 2, backgroundColor: "#FF8500", color: "white" }}
        >
          Buscar
        </Button>
      </Box>
      <Box
        mt={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {animals.length > 0 ? (
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: 0,
            }}
          >
            {animals.map((animal) => (
              <ListItem
                key={animal.id}
                sx={{
                  marginX: 1,
                  minWidth: 200,
                  maxWidth: 300,
                }}
              >
                <AnimalCard
                  id={animal?.id}
                  name={animal?.name}
                  species={animal?.species}
                  available={animal.available}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "black" }}>
              Não existem animais disponíveis
            </Typography>
            <Typography mb={3} sx={{ color: "black" }}>
              Gostaria de cadastrar um novo animal?
            </Typography>
            <MainButton title="Cadastrar" url="/animal" />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default AnimalsList;
