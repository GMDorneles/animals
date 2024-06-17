import { Animal } from "@/types/animal/animal";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function AnimalCard(props: Animal) {
  const getImageSrc = (species: string) => {
    return species === "dog" ? "/img/dog.webp" : "/img/cat.webp";
  };

  async function deleteAnimal() {
    if (!props?.id) {
      throw new Error("Id não  fornecido");
    }
    try {
      const response = await fetch(`/api/animals/delete/${props?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar animal");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
    }
  }
  async function adopt() {
    try {
      const response = await fetch(`/api/animals/update/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ available: false }),
      });
    } catch (error) {
      console.error("Erro ao adotar:", error);
    }
  }

  return (
    <Card sx={{ boxShadow: 5, width: "100%", position: "relative" }}>
      <CardMedia
        component="img"
        image={getImageSrc(props?.species)}
        alt="espécie"
      />

      <CardContent
        sx={{
          height: "80px",
          overflow: "hidden",
        }}
      >
        {props?.name && (
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {props.name + ","}
              </Typography>
            </Box>
            {props?.available == true || !props?.id ? (
              <Typography variant="body2" color="text.secondary">
                Está a procura de um novo lar.
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Já encontrou um novo lar.
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: 40,
            width: "100%",
          }}
        >
          {props?.available ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => deleteAnimal()}
                startIcon={<DeleteIcon />}
                size="small"
                sx={{
                  backgroundColor: "#ca290c",
                  color: "#fdfdfd",
                  borderColor: "#FF8500",
                  "&:hover": {
                    color: "#ca290c",
                    borderColor: "#ca290c",
                    backgroundColor: "white",
                  },
                }}
              >
                Delete
              </Button>
              <Link
                href={`/animal?id=${props?.id}&name=${props?.name}&species=${props?.species}`}
                passHref
              >
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#FF8500",
                    color: "#fdfdfd",
                    borderColor: "#FF8500",
                    "&:hover": {
                      color: "#FF8500",
                      borderColor: "#FF8500",
                      backgroundColor: "white",
                    },
                  }}
                >
                  Editar
                </Button>
              </Link>
              <Button
                size="small"
                color="primary"
                onClick={() => adopt()}
                sx={{
                  backgroundColor: "#FF8500",
                  color: "#fdfdfd",
                  borderColor: "#FF8500",
                  "&:hover": {
                    color: "#FF8500",
                    borderColor: "#FF8500",
                    backgroundColor: "white",
                  },
                }}
              >
                Adotar
              </Button>
            </Box>
          ) : (
            <Box sx={{ height: 40 }} />
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
