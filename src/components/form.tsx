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
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AnimalCard from "./AnimalCard";
interface AnimalFormProps {
  id: string | null;
  name: string | null;
  species: string | null;
  available: boolean | null;
}

export default function AnimalForm(props?: AnimalFormProps | null) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Animal>();

  const onSubmit: SubmitHandler<Animal> = async (data: Animal) => {
    try {
      const endpoint = props?.id
        ? `/api/animals/update/${props.id}`
        : "/api/animals/create";
      const method = props?.id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          species: data.species,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar/alterar animal");
      }

      setShowSnackbar(true);
      router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar/alterar animal:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    if (props) {
      reset({
        name: props.name || "",
        species: props.species || "dog",
        available: props.available || false,
      });
    }
  }, [props, reset]);

  return (
    <Box
      p={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Box
        p={4}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          backgroundColor: "white",
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
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimalCard
              name={watch("name", props?.name || "")}
              species={watch("species", props?.species || "dog")}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#FF8500" }}
            >
              {props?.id ? "EDITAR ANIMAL" : "CADASTRAR"}
            </Typography>
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
                  height: { xs: "20vh", sm: "100%", md: "100%" },
                }}
              >
                <FormControl fullWidth margin="normal">
                  <InputLabel id="species-label">Espécie do animal</InputLabel>
                  <Select
                    {...register("species", { required: true })}
                    label="espécie do animal"
                    labelId="species-label"
                    id="species-select"
                    defaultValue={props?.species || "dog"}
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
                sx={{
                  gap: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link href="/">
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
                </Link>
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
