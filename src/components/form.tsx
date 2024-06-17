import { Animal } from "@/types/animal/animal";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AnimalCard from "./AnimalCard";
import { useState } from "react";

export default function AnimalForm() {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Animal>();

  const species = watch("species", "dog");
  const name = watch("name", "");

  const onSubmit: SubmitHandler<Animal> = async (data: Animal) => {
    try {
      const response = await fetch("/api/animals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          species: data.species,
        }),
      });
      console.log(response);
      setShowSnackbar(true);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box
      p={5}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "white",
        width: { xs: "100vw", md: "35vw" },
        borderRadius: "25px",
      }}
    >
      <Backdrop
        open={isSubmitting}
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
        sx={{
          gap: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100vw", md: "50%" } }}>
          <AnimalCard name={name} species={species} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#FF8500" }}>
            CADASTRO
          </Typography>
          ,{" "}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: { xs: "30vh", sm: "100%", md: "100%" },
              }}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel id="species-label">Espécie do animal</InputLabel>
                <Select
                  {...register("species", { required: true })}
                  label="espécie do animal"
                  labelId="species-label"
                  id="species-select"
                  defaultValue="dog"
                >
                  <MenuItem value="cat">Gato</MenuItem>
                  <MenuItem value="dog">Cachorro</MenuItem>
                </Select>
              </FormControl>
              {errors.species && <span>Campo Obrigatório</span>}
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="name">Nome</InputLabel>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  aria-describedby="Nome"
                />
                {errors.name && <span>Campo Obrigatório</span>}
              </FormControl>
            </Box>
            <Box
              mt={4}
              sx={{ gap: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                aria-label="Cancelar"
                variant="contained"
                sx={{
                  padding: "12px 24px",
                  backgroundColor: "#9c9c9c",
                  "&:hover": {
                    backgroundColor: "#9c9c9c",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                aria-label="Salvar"
                variant="contained"
                sx={{
                  padding: "12px 24px",
                  backgroundColor: "#FF8500",
                  "&:hover": {
                    backgroundColor: "#db790f",
                  },
                }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Animal cadastrado com sucesso!"
      />
    </Box>
  );
}
