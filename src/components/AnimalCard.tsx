import { Animal } from "@/types/animal/animal";
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
  async function adopt() {
    try {
      const response = await fetch(`/api/animals/update/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ available: false }),
      });
      console.log(response);
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
            <Typography gutterBottom variant="h5" component="div">
              {props.name + ","}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Está a procura de um novo lar.
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Box>
          {props?.available && (
            <Box>
              <Link
                href={`/animal?id=${props?.id}&name=${props?.name}&species=${props?.species}`}
                passHref
              >
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary" onClick={() => adopt()}>
                  Adotar
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
